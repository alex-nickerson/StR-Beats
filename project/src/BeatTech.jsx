import React, { useState, useEffect, useRef } from 'react'
import {supabase} from './supabaseClient'

// Utility functions
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const BeatList = () => {

  const [beats, setBeats] = useState([])

  const fetchBeats = async () => {
    const {error, data} = await supabase.from("Beats").select("*");
    if (error) {
              console.error("Error fetching beat: ", error.message);
              return;
          }
      console.log("Fetched beats:", data);
    setBeats(data)
  }

  useEffect(() => {
    fetchBeats()
  }, [])

  /*const [beats, setBeats] = useState([
    { title: 'Blessed', src: 'audio/Blessed [130bpm] [G].mp3', waveform: 'images/waveforms/blessed-waveform.png', bpm: '130', key: 'G', date: '2025-01-03' },
    { title: 'Wrath', src: 'audio/Wrath [140bpm] [Cm].mp3', waveform: 'images/waveforms/wrath-waveform.png', bpm: '140', key: 'Cm', date: '2024-12-15' },
    { title: 'Red Light', src: 'audio/Red Light [146bpm] [NA].mp3', waveform: 'images/waveforms/redlight-waveform.png', bpm: '146', key: 'N/A', date: '2024-03-12' },
    { title: 'Travis', src: 'audio/Travis [146bpm] [Dm].mp3', waveform: 'images/waveforms/travis-waveform.png', bpm: '146', key: 'Dm', date: '2024-03-01' },
  ]);*/

  const [sortOrder, setSortOrder] = useState('date-desc');

  useEffect(() => {
    sortBeats(sortOrder);
  }, [sortOrder]);

  const sortBeats = (order) => {
    const sortedBeats = [...beats];
    switch (order) {
      case 'date-asc':
        sortedBeats.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sortedBeats.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'bpm-asc':
        sortedBeats.sort((a, b) => a.bpm - b.bpm);
        break;
      case 'bpm-desc':
        sortedBeats.sort((a, b) => b.bpm - a.bpm);
        break;
      default:
        break;
    }
    setBeats(sortedBeats);
  };

  return (
    <div>
      <div className="sort-container">
      <div className="sorting">
        <label htmlFor="sort-select">Sort:</label> 
        <select id="sort-select" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="date-desc">Date Descending</option>
          <option value="date-asc">Date Ascending</option>
          <option value="bpm-desc">BPM Descending</option>
          <option value="bpm-asc">BPM Ascending</option>
        </select>
      </div>
      </div>

      <div id="hero">
        {beats.map((beat, index) => (
          <BeatCard key={index} beat={beat} />
        ))}
      </div>
    </div>
  );
};

const BeatCard = ({ beat }) => {
  const audioRef = useRef(null);
  const playIconRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

useEffect(() => {
  const audio = audioRef.current;

  const updateTime = () => {
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
    audio.currentTime = 0;
  };

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);

  audio.volume = volume;
  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateTime);
  audio.addEventListener('ended', handleEnded);
  audio.addEventListener('play', handlePlay);
  audio.addEventListener('pause', handlePause);

  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateTime);
    audio.removeEventListener('ended', handleEnded);
    audio.removeEventListener('play', handlePlay);
    audio.removeEventListener('pause', handlePause);
  };
}, [volume]);


const handlePlayPause = async () => {
  const currentAudio = audioRef.current;

  // Pause all other audio elements
  document.querySelectorAll("audio").forEach((otherAudio) => {
    if (otherAudio !== currentAudio) {
      otherAudio.pause();
      otherAudio.currentTime = 0;
      const otherPlayIcon = otherAudio.closest(".beat")?.querySelector(".play-icon");
      if (otherPlayIcon) {
        otherPlayIcon.src = "images/play-button.png";
      }
    }
  });

  if (currentAudio.paused) {
    try {
      await currentAudio.play();
    } catch (error) {
      console.warn("Play failed:", error);
    }
  } else {
    currentAudio.pause();
  }
  };

  const handleRewind = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  };

  const handleFastForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };
  return (
    <div className="beat-container">
      <div className="beat">
        <audio ref={audioRef} src={beat.audio}></audio>
        <div className="container">
          <div className="top">
            <div></div>
            <div><h1>{beat.name}</h1></div>
            <div>
              <a href={beat.audio} download={`${beat.name}`}>
                <img src="images/download-button.png" alt="Download" />
              </a>
            </div>
          </div>
          <div className="middle">
            <div className="waveform">
              <img src={beat.waveform} alt="Waveform" />
            </div>
          </div>
          <div className="bottom">
            <div className="filler"></div>
            <div>
              <div className="rewind">
                <button onClick={handleRewind} className="rewind-button">
                  <p>⏪︎</p>
                </button>
              </div>
              <div>
                <button onClick={handlePlayPause} className="play-button">
                  <img
                    ref={playIconRef}
                    className="play-icon"
                    src={playing ? "images/pause-button.png" : "images/play-button.png"}
                    alt="Play/Pause"
                  />
                </button>
              </div>
              <div className="fastforward">
                <button onClick={handleFastForward} className="fastforward-button">
                  <p>⏩︎</p>
                </button>
              </div>
            </div>
            <div>
              <h2 className="beat-duration">{`${formatTime(currentTime)}/${formatTime(duration)}`}</h2>
            </div>
            <div className="audio-icon">
              <img src="images/audio-icon.png" alt="Audio" />
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <div className="filler"></div>
          </div>
        </div>
      </div>
      <div className="beat-info">
        <p>BPM: {beat.bpm}, Key: {beat.key}, Date: {formatDate(beat.date)}</p>
        <div>
          <img src="images/tag-icon.png" alt="BPM" />
          {beat.bpm}bpm&nbsp;
          <img src="images/tag-icon.png" alt="Key" />
          {beat.key}
        </div>
        <div className="tag-three">
          <img src="images/date-icon.png" alt="Date" />
          {formatDate(beat.date)}
        </div>
      </div>
    </div>
  );
};

export default BeatList;