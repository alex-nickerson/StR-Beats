/*const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const rewindButton = document.getElementById("rewind-button");
const fastforwardButton = document.getElementById("fastforward-button");
const volumeSlider = document.getElementById("volume-slider");
const beatDuration = document.getElementById("beat-duration");*/

const beats = [
    {title: "Blessed", src: "audio/Blessed [130bpm] [G].mp3", waveform: "images/blessed-waveform.png", bpm: "130", key: "G", date: "2025-01-17"},
    {title: "Wrath", src: "audio/Wrath [140bpm] [Cm].mp3", waveform: "images/wrath-waveform.png", bpm: "140", key: "Cm", date: "2025-01-15"}
]

function addBeat(beat) {
    const hero = document.getElementById("hero");
    const beatDiv = document.createElement('div');
    beatDiv.classList.add('beat-container')
    beatDiv.innerHTML = `
        <div class="beat">
      <audio src="${src}"></audio>
      <div class="container">
        <div class="top">
          <div></div><div><h1>${title}</h1></div><div><a href="${src}" download="${title}"><img src="images/download-button.png" alt=""></a></div>
        </div>
        <div class="middle">
          <div class="waveform"><img src="${waveform}" alt=""></div>
        </div>
        <div class="bottom">
          <div class="filler"></div>
          <div>
            <div class="rewind"><button id="rewind-button" onclick="Rewind()"><img src="images/rewind-button.png" alt=""></button></div>
            <div><button id="play-button" onclick="PlayPause()"><img id="play-icon" src="images/play-button.png" alt=""></button></div>
            <div class="fastforward"><button id="fastforward-button" onclick="FastForward()"><img src="images/fastforward-button.png" alt=""></button></div>
          </div>
          <div><h2 id="beat-duration">0:00/9:99</h2></div>
          <div class="audio-icon"><img src="images/audio-icon.png" alt=""><input type="range" id="volume-slider" min="0" max="1" step="0.01" value="0.5" oninput="Volume()"></div>
          <div class="filler"></div>
        </div>
      </div>
    </div>
    <div class="beat-info">
      <div class="tags">
      <div><img src="images/tag-icon.png" alt=""><span>${bpm}bpm</span></div>
      <div><img src="images/tag-icon.png" alt=""><span>${key}</span></div>
      </div>
      <div class="tag-three"><img src="images/date-icon.png" alt=""><span>${date}</span></div>
    </div>
    `;
    hero.appendChild(beatDiv);

}

beats.forEach(addBeat)

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