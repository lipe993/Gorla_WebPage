const audio1 = document.getElementById("audio1");
const mus_button_icons = [
	`<svg id="play-pause" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
]
var mus_info = {
	album: 0,
	track: 0,
	lastTrack: 0,
	format: 0,
	path: 0
};
const musNames = {
	"chillbeats": [
		["Chill Beats", 1, 7, "wav"],
		"Chill Beats", 
		"keys to chill out",
		"Night Eletro", 
		"Night Eletro Pt. 2",
		"Just Pong It!", 
		"New Start"
	],
	"chilllofi": [
		["Chill Lo-Fi", 1, 7, "mp3"],
		"Time Save", 
		"Good Day",
		"Walking", 
		"Lo-Fi + Hip-Hop",
		"Calm",
		"Lo-Fi + Hip-Hop II",
		"Hard Day"
	],
	"foreverchill": [
		["Forever Chill", 1, 7, "wav"],
		"Time to go",
		"chill out",
		"in a calm place.",
		"Night of Joy",
		"Chilling Sleep",
		"Going Down",
		"forever chill."
	],
	"justchill": [
		["Just Chill", 1, 5, "wav"],
		"chill out",
		"in a calm place.",
		"Night of Joy",
		"Chilling Sleep",
		"forever chill."
	]
}

function showHide(id) {
	let findId = document.getElementById(id);
	if(findId.style.display == "none") findId.style.display = "block"; 
	else findId.style.display = "none";
}
function typeWriter(message, speed, id, i = 0) {
	let findId = document.getElementById(id);
	if(i < message.length) {
		findId.innerHTML += message.charAt(i);
		setTimeout(typeWriter, speed, message, speed, id, i + 1);
	}
}
typeWriter("Gorla Music", 70, "headerText");
typeWriter("I'm a chill guy that do songs I like it.", 20, "desc")
audio1.addEventListener("playing", () => {
	document.getElementById("info").className = "goto";
	document.getElementById("play-pause").innerHTML = mus_button_icons[1];
});
document.getElementById("play-pause").addEventListener("click", () => {
	if(!audio1.paused) {
		audio1.pause();
		document.getElementById("play-pause").innerHTML = mus_button_icons[0];
		document.getElementById("info").className = "";
	} else audio1.play();
});
document.getElementById("bandcamp").addEventListener("click", () => {
	window.open("https://gorla.bandcamp.com");
});
document.getElementById("bandlab").addEventListener("click", () => {
	window.open("https://www.bandlab.com/gorla_993");
});
document.getElementById("youtube").addEventListener("click", () => {
	window.open("https://www.youtube.com/channel/UCds8sX73xHVC2XrJs9xsdaA");
});
function musWork(album, track, lastTrack, tracksFileFormat) {
	document.getElementById("musplayer").style.display = "block";
	document.getElementById("footer").style = "padding-bottom: 20mm;";
	audio1.src = `audio/${album}/track-${track}.${tracksFileFormat}`;
	mus_info.path = audio1.src;
	audio1.load();
	audio1.play();
	mus_info.album = album;
	mus_info.track = track;
	mus_info.lastTrack = lastTrack;
	mus_info.format = tracksFileFormat;
	var albumToCall = musNames[mus_info.album];
	var albumPatch = albumToCall[0][0];
	document.getElementById("musName").innerHTML = "";
	typeWriter(albumToCall[track], 70, "musName");
	document.getElementById("musAlbum").innerHTML = albumPatch;
}
let musButtons = document.querySelectorAll(".music");
musButtons.forEach((item) => {
	item.addEventListener("click", () => {
		musWork(item.id, musNames[item.id][0][1], musNames[item.id][0][2], musNames[item.id][0][3]);
	});
})
document.getElementById("go-back").addEventListener("click", () => {
	if(mus_info.track - 1 == 0) {
		musWork(mus_info.album, mus_info.lastTrack, mus_info.lastTrack, mus_info.format);
	} else {
		musWork(mus_info.album, mus_info.track - 1, mus_info.lastTrack, mus_info.format);
	}
});
document.getElementById("go-on").addEventListener("click", () => {
	if(mus_info.track >= mus_info.lastTrack) {
		musWork(mus_info.album, 1, mus_info.lastTrack, mus_info.format);
	} else {
		musWork(mus_info.album, mus_info.track + 1, mus_info.lastTrack, mus_info.format);
	}
});
document.getElementById("close").addEventListener("click", () => {
	audio1.pause();
	document.getElementById("info").className = "";
	document.getElementById("musplayer").style.display = "none";
	document.getElementById("footer").style = "padding-bottom: 0mm;";
});
audio1.addEventListener("ended", () => {
	if(mus_info.track < mus_info.lastTrack) {
		musWork(mus_info.album, mus_info.track + 1, mus_info.lastTrack, mus_info.format);
	}
});