const audio = document.getElementById("audio1");

class Player {
	constructor() {
		// Set up all of the player variables
		this.isOpen = false;
		this.playButton = {
			playing: '<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 86.4 864 864" width="36" fill="#FFF"><path d="M537.415 734.4V302.4h60.924v432h-60.924Zm-271.615 0V302.4h60.924v432h-60.924Z"/></svg>',
			paused: '<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 86.4 864 864" width="36" fill="#FFF"><path d="M324 704.446V330.6l293.539 186.924L324 704.446Z"/></svg>'
		}
		this.album = "";
		this.track = 0;
		this.lastTrack = 0;
		this.format = 0;
	}
	// Function that opens the player
	open() {
		document.getElementById("footer").style = "padding-bottom: 20mm;";
		document.getElementById("musicPlayer").style.display = "block";
		this.isOpen = true;
	}
	// Function that closes the player
	close() {
		audio.pause();
		document.getElementById("info").className = "";
		document.getElementById("musicPlayer").style.display = "none";
		document.getElementById("footer").style = "padding-bottom: 0mm;";
		this.isOpen = false;
	}
	// Function that pauses or plays the song
	pause() {
		if(!audio.paused) { // If the song is playing...
			audio.pause(); // We pause it
			document.getElementById("play").innerHTML = this.playButton.paused;
		} else audio.play(); // Else, we play it
	}
	// Function that plays a song based on the album
	play(album, format, track = 1) {
		this.open(); // Make sure player is open
		document.getElementById("play").innerHTML = this.playButton.playing;
		document.getElementById("albumCover").src = `audio/${album}/${album}.png`;
		audio.src = `audio/${album}/track-${track}.${format}`; // Set the audio to the track we want
		audio.load();
		audio.play(); // Play it
		// Set the variables accordingly to the arguments
		this.album = album;
		this.track = track;
		this.lastTrack = albums[this.album].length - 1;
		this.format = format;
		let _album = albums[this.album];
		// Show the song name and the album name
		document.getElementById("musicName").innerHTML = _album[track];
		document.getElementById("musicAlbum").innerHTML = _album[0].title;
	}
	playNext() {
		this.open(); // Make sure player is open
		if(this.track >= this.lastTrack) this.play(this.album, this.format); // If the current track is the last track, play the 1st track
		else this.play(this.album, this.format, this.track + 1); // Else, play the next track
	}
	playPrevious() {
		this.open(); // Make sure player is open
		if(this.track - 1 == 0) this.play(this.album, this.format, this.lastTrack); // If the current track is the first, play the last track
		else this.play(this.album, this.format, this.track - 1); // Else, play the previous
	}
}

Object.keys(albums).forEach((item) => { // Creates an entry on the discografy based on the albums constant(js/albums.js)
	let albumElement = document.createElement("div");
	albumElement.className = "card music";
	albumElement.id = item;
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
	let releaseDate;
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
	albumElement.appendChild(image.element);
	albumElement.appendChild(container);
	document.getElementById("discography").appendChild(albumElement); // Add it to the discography
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
document.getElementById("bandcamp").addEventListener("click", () => window.open("https://gorla.bandcamp.com"));
document.getElementById("bandlab").addEventListener("click", () => window.open("https://www.bandlab.com/gorla_993"));
// Create a new player
let player = new Player();
audio.addEventListener("playing", () => { // If a song is playing, show the play icon(player.playButton.playing)
	document.getElementById("info").className = "goto";
	document.getElementById("play").innerHTML = player.playButton.playing;
});
document.querySelectorAll(".music").forEach((item) => {
	// When we click on it, start playing the audio from the album
	item.addEventListener("click", () => player.play(item.id, albums[item.id][0].fileFormat));
});
document.getElementById("play").addEventListener("click", () => player.pause());
document.getElementById("previous").addEventListener("click", () => player.playPrevious());
document.getElementById("next").addEventListener("click", () => player.playNext());
document.getElementById("close").addEventListener("click", () => player.close());
audio.addEventListener("ended", () => player.playNext()); // When the song ends, play the next