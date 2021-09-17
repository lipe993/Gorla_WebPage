const audio1 = document.getElementById("audio1");
const mus_button_icons = [
	`<svg id="play-pause" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
]
var mus_info = {
	album: 0,
	track: 0,
	format: 0,
	path: 0
};
const musNames = {
	chillbeats: [
		"Chill Beats", 
		"keys to chill out",
		"Night Eletro", 
		"Night Eletro Pt. 2",
		"Just Pong It!", 
		"New Start"
	],
	chilllofi: [
		"Time Save", 
		"Good Day",
		"Walking", 
		"Lo-Fi + Hip-Hop",
		"Calm",
		"Lo-Fi + Hip-Hop II",
		"Hard Day"
	],
	goingdown: ["Going Down"],
}

function showHide(id) {
	let findId = document.getElementById(id);
	if(findId.style.display == "none") findId.style.display = "block"; 
	else findId.style.display = "none";
}
function typeWriter(message, speed, id, i) {
	let findId = document.getElementById(id);
	if(i < message.length) {
		findId.innerHTML += message.charAt(i);
		setTimeout(typeWriter, speed, message, speed, id, i + 1);
	}
}
audio1.addEventListener("playing", () => {
	document.getElementById("info").className = "goto";
	document.getElementById("play-pause").innerHTML = mus_button_icons[1];
});
document.getElementById("play-pause").addEventListener("click", () => {
	if(!audio1.paused) {
		audio1.pause();
		document.getElementById("play-pause").innerHTML = mus_button_icons[0];
		document.getElementById("info").className = "";
	}
	else audio1.play();
});
document.getElementById("gorla-card").addEventListener("click", () => {
	showHide("media");
});
document.getElementById("bandcamp").addEventListener("click", () => {
	window.open("https://gorla.bandcamp.com");
});
document.getElementById("bandlab").addEventListener("click", () => {
	window.open("https://www.bandlab.com/gorla_993");
});
document.getElementById("soundcloud").addEventListener("click", () => {
	window.open("https://soundcloud.com/gorla-993");
});
document.getElementById("youtube").addEventListener("click", () => {
	window.open("https://www.youtube.com/channel/UCds8sX73xHVC2XrJs9xsdaA");
});
function musWork(album, track, tracksFileFormat) {
	var currentTrack = track;
    document.getElementById("musplayer").style.display = "block";
	audio1.src = `audio/${album}/track-${currentTrack}.${tracksFileFormat}`;
	mus_info.path = audio1.src;
	audio1.load();
	audio1.play();
	mus_info.album = album;
	mus_info.track = currentTrack;
	mus_info.format = tracksFileFormat;
	var albumPatch;
	var albumToCall;
	switch(mus_info.album) {
		case "chilllofi":
			albumToCall = musNames.chilllofi;
			albumPatch = "Chill Lo-Fi";
			break;
		case "chillbeats":
			albumToCall = musNames.chillbeats;
			albumPatch = "Chill Beats";
			break;
		case "goingdown":
			albumToCall = musNames.goingdown;
			albumPatch = "Going Down - Single";
			break;
	}
	document.getElementById("musName").innerHTML = "\0";
	typeWriter(albumToCall[currentTrack - 1], 70, "musName", 0);
	document.getElementById("musAlbum").innerHTML = albumPatch;
}
document.getElementById("chillbeats").addEventListener("click", () => {
    musWork("chillbeats", 1, "wav");
});
document.getElementById("chilllofi").addEventListener("click", () => {
	musWork("chilllofi", 1, "mp3");
});
document.getElementById("goingdown").addEventListener("click", () => {
	musWork("goingdown", 1, "ogg");
});
document.getElementById("go-back").addEventListener("click", () => {
	musWork(mus_info.album, mus_info.track - 1, mus_info.format);
});
document.getElementById("go-on").addEventListener("click", () => {
	musWork(mus_info.album, mus_info.track + 1, mus_info.format);
});
document.getElementById("close").addEventListener("click", () => {
	audio1.pause();
	document.getElementById("musplayer").style.display = "none";
});
typeWriter("Gorla Music", 70, "headerText", 0);