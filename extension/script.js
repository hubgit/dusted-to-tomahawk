// wishlist: hAudio or RDFa markup

findTracks({
	album: "table table tr",
	artist: "td:nth-of-type(2)",
	title: "td:nth-of-type(3)",
})

function findTracks(selector) {
	var nodes = document.querySelectorAll(selector.album);

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];

		// as the table doesn't have a distinctive selector, check for "chart position" column
		var position = node.querySelectorAll("td:nth-of-type(1)");
		if (!position.length || !position.item(0).textContent.match(/^\d+$/)) continue;

		var artist = node.querySelectorAll(selector.artist).item(0).textContent.trim();
		var title = node.querySelectorAll(selector.title).item(0).textContent.trim();

		addTomahawkAlbumLink(node.appendChild(document.createElement("td")), artist, title);
	}
}

function addTomahawkAlbumLink(node, artist, title) {
	var link = document.createElement("a");
	link.href = "tomahawk://view/album" + buildQueryString({ artist: artist, name: title });
	link.innerHTML = "▶";
	link.style.background = "url(http://www.tomahawk-player.org/sites/default/files/favicon.ico) no-repeat right center";
	link.style.paddingRight = "20px";

	node.appendChild(link);
}

function buildQueryString(items) {
	var parts = [];

	var add = function(key, value) {
		parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
	}

	for (var key in items) {
		if (!items.hasOwnProperty(key)) continue;

   		var obj = items[key];

   		if (Array.isArray(obj)) {
   			obj.forEach(function(value) {
   				add(key, value);
   			});
   		}
   		else {
   			add(key, obj);
   		}
	}

	return parts.length ? "?" + parts.join("&") : "";
}
