const audio = document.getElementById("audio1");
var musicInfo = {
	album: "",
	track: 0,
	lastTrack: 0,
	format: ""
};
var player = {
	isOpen: false,
	playButton: [
		`<svg id="play-pause" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
	]
};

Object.keys(albums).forEach((item) => {
	let mainElement = document.createElement("div");
	mainElement.className = "card music";
	mainElement.id = item;
	let image = {
		element: document.createElement("img"),
		attributes: [document.createAttribute("src"), document.createAttribute("alt")]
	};
	image.attributes[0].value = `audio/${item}/${item}.png`;
	image.attributes[1].value = albums[item][0].title;
	image.element.setAttributeNode(image.attributes[0]);
	image.element.setAttributeNode(image.attributes[1]);
	let container = document.createElement("div");
	container.className = "container";
	var releaseDate;
	if(typeof albums[item][0].releaseDate == "object") {
		let months = [
			"January",
			"Febuary",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		releaseDate = `Released ${months[albums[item][0].releaseDate[1] - 1]} ${albums[item][0].releaseDate[0]}, ${albums[item][0].releaseDate[2]}`;
	} else releaseDate = "Not Released"
	container.innerHTML = `<h4>${albums[item][0].title}</h4><p>${releaseDate}</p>`
	mainElement.appendChild(image.element);
	mainElement.appendChild(container);
	document.getElementById("discography").appendChild(mainElement);
});

function typewriter(message, delay, id, i = 0) {
	let findId = document.getElementById(id);
	if(i < message.length) {
		findId.innerHTML += message.charAt(i);
		setTimeout(typewriter, delay, message, delay, id, i + 1);
	}
}
typewriter("Gorla", 80, "headerText");
typewriter("I'm a chill guy that makes songs because I like it.", 10, "desc");
audio.addEventListener("playing", () => {
	document.getElementById("info").className = "goto";
	document.getElementById("play-pause").innerHTML = player.playButton[1];
});
document.getElementById("play-pause").addEventListener("click", () => {
	if(!audio.paused) {
		audio.pause();
		document.getElementById("play-pause").innerHTML = player.playButton[0];
		document.getElementById("info").className = "";
	} else audio.play();
});
document.getElementById("bandcamp").addEventListener("click", () => {
	window.open("https://gorla.bandcamp.com");
});
document.getElementById("bandlab").addEventListener("click", () => {
	window.open("https://www.bandlab.com/gorla_993");
});
function playAudio(album, format, track = 1) {
	document.getElementById("musicPlayer").style.display = "block";
	document.getElementById("albumCover").src = `audio/${album}/${album}.png`;
	document.getElementById("footer").style = "padding-bottom: 20mm;";
	audio.src = `audio/${album}/track-${track}.${format}`;
	audio.load();
	audio.play();
	musicInfo.album = album;
	musicInfo.track = track;
	musicInfo.lastTrack = albums[musicInfo.album].length - 1;
	musicInfo.format = format;
	var _album = albums[musicInfo.album];
	document.getElementById("musName").innerHTML = "";
	player.isOpen ? document.getElementById("musName").innerHTML = _album[track] : typewriter(_album[track], 70, "musName");
	document.getElementById("musAlbum").innerHTML = _album[0].title;
}
document.querySelectorAll(".music").forEach((item) => {
	item.addEventListener("click", () => {
		if(document.getElementById("musicPlayer").style.display == "block") player.isOpen = true;
		playAudio(item.id, albums[item.id][0].fileFormat);
	});
})
document.getElementById("go-back").addEventListener("click", () => {
	player.isOpen = true;
	if(musicInfo.track - 1 == 0) playAudio(musicInfo.album, musicInfo.format, musicInfo.lastTrack);
	else playAudio(musicInfo.album, musicInfo.format, musicInfo.track - 1,);
});
document.getElementById("go-on").addEventListener("click", () => {
	player.isOpen = true;
	if(musicInfo.track >= musicInfo.lastTrack) playAudio(musicInfo.album, musicInfo.format);
	else playAudio(musicInfo.album, musicInfo.format, musicInfo.track + 1);
});
document.getElementById("close").addEventListener("click", () => {
	audio.pause();
	player.isOpen = false;
	document.getElementById("info").className = "";
	document.getElementById("musicPlayer").style.display = "none";
	document.getElementById("footer").style = "padding-bottom: 0mm;";
});
audio.addEventListener("ended", () => {
	player.isOpen = false;
	if(musicInfo.track < musicInfo.lastTrack) playAudio(musicInfo.album, musicInfo.format, musicInfo.track + 1);
});