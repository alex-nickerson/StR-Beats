/*import {createClient} from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.SUPABASE_API_KEY
);*/

const beats = [
    {title: "Blessed", src: "audio/Blessed [130bpm] [G].mp3", waveform: "images/waveforms/blessed-waveform.png", bpm: "130", key: "G", date: "2025-01-03"},
    {title: "Wrath", src: "audio/Wrath [140bpm] [Cm].mp3", waveform: "images/waveforms/wrath-waveform.png", bpm: "140", key: "Cm", date: "2024-12-15"},
    {title: "Red Light", src: "audio/Red Light [146bpm] [NA].mp3", waveform: "images/waveforms/redlight-waveform.png", bpm: "146", key: "N/A", date: "2024-03-12"},
    {title: "Travis", src: "audio/Travis [146bpm] [Dm].mp3", waveform: "images/waveforms/travis-waveform.png", bpm: "146", key: "Dm", date: "2024-03-01"}
];

function formatTime(seconds) { 
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString(undefined, options);
}

function renderBeats() {
  const hero = document.getElementById('hero');
  hero.innerHTML = ''; //clear beats
  beats.forEach(beat => addBeat(beat));
}

function sortBeats(order) {
  switch (order) {
    case "date-asc":
      beats.sort((a,b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      beats.sort((a,b) => new Date(b.date) - new Date(a.date));
      break;
    case "bpm-asc":
      beats.sort((a,b) => a.bpm - b.bpm);
      break;
    case "bpm-desc":
      beats.sort((a,b) => b.bpm - a.bpm);
      break;
  }
  renderBeats();
}

function addBeat(beat) {
    const hero = document.getElementById("hero");
    const beatDiv = document.createElement('div');
    beatDiv.classList.add('beat-container')
    beatDiv.innerHTML = `
        <div class="beat">
      <audio src="${beat.src}"></audio>
      <div class="container">
        <div class="top">
          <div></div><div><h1>${beat.title}</h1></div><div><a href="${beat.src}" download="${beat.title}"><img src="images/download-button.png" alt=""></a></div>
        </div>
        <div class="middle">
          <div class="waveform"><img src="${beat.waveform}" alt=""></div>
        </div>
        <div class="bottom">
          <div class="filler"></div>
          <div>
            <div class="rewind"><button class="rewind-button"><p>⏪︎</p></button></div>
            <div><button class="play-button"><img class="play-icon" src="images/play-button.png" alt=""></button></div>
            <div class="fastforward"><button class="fastforward-button"><p>⏩︎</p></button></div>
          </div>
          <div><h2 class="beat-duration">0:00/9:99</h2></div>
          <div class="audio-icon"><img src="images/audio-icon.png" alt=""><input type="range" class="volume-slider" min="0" max="1" step="0.01" value="0.5"></div>
          <div class="filler"></div>
        </div>
      </div>
    </div>
    <div class="beat-info">
      <p>BPM: ${beat.bpm}, Key: ${beat.key}, Date: ${formatDate(beat.date)}</p>
      <div><img src="images/tag-icon.png" alt="">${beat.bpm}bpm&nbsp;<img src="images/tag-icon.png" alt="">${beat.key}</div>
      <div class="tag-three"><img src="images/date-icon.png" alt="">${formatDate(beat.date)}</div>
    </div>
    `;
    hero.appendChild(beatDiv);

    const audio = beatDiv.querySelector('audio');
    const playButton = beatDiv.querySelector('.play-button');
    const playIcon = beatDiv.querySelector('.play-icon');
    const rewindButton = beatDiv.querySelector('.rewind-button');
    const fastforwardButton = beatDiv.querySelector('.fastforward-button');
    const volumeSlider = beatDiv.querySelector('.volume-slider');
    const beatDuration = beatDiv.querySelector('.beat-duration');

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
    });

    playButton.addEventListener("click", () => {
        document.querySelectorAll("audio").forEach(otherAudio => {
        if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
            const otherPlayIcon = otherAudio.closest('.beat').querySelector('.play-icon');
            if (otherPlayIcon) {
                otherPlayIcon.src = "images/play-button.png";
            }
        }
        });

        if (audio.paused) {
        audio.volume = volumeSlider.value;
        audio.play();
        playIcon.src = "images/pause-button.png";
        }
        else {
            audio.pause()
            playIcon.src = "images/play-button.png";
        }
    });

    rewindButton.addEventListener("click", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    });

    fastforwardButton.addEventListener("click", () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    });

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
    });

}

beats.forEach(beat => addBeat(beat));
sortBeats("desc");

document.getElementById('sort-select').addEventListener('change', (e) => {
  sortBeats(e.target.value);
})