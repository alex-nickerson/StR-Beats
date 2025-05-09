const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const rewindButton = document.getElementById("rewind-button");
const fastforwardButton = document.getElementById("fastforward-button");
const volumeSlider = document.getElementById("volume-slider");
const beatDuration = document.getElementById("beat-duration");

function formatTime(seconds) { 
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  beatDuration.textContent = `0:00/${formatTime(audio.duration)}`;
});
audio.addEventListener("timeupdate", () => {
    beatDuration.textContent = `${formatTime(audio.currentTime)}/${formatTime(audio.duration)}`;
    if (audio.currentTime == audio.duration) {
        audio.pause()
        playIcon.src = "images/play-button.png";
        audio.currentTime = 0;
    }
})

function PlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.src = "images/pause-button.png";
    }
    else {
        audio.pause()
        playIcon.src = "images/play-button.png";
    }
}

function Rewind() {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function FastForward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
}

function Volume() {
    audio.volume = volumeSlider.value;
}