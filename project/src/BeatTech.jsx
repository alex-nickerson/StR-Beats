import React, { useState, useEffect, useRef } from 'react'
import {supabase} from './supabaseClient'
import Waveform from './Waveform'

// Format the time of the beat
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Format the date of the beat
const formatDate = (date) => {
  const utcDate = new Date(date);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return localDate.toLocaleDateString(undefined, options);
};

const BeatList = () => {

  const [beats, setBeats] = useState([])
  const [sortOrder, setSortOrder] = useState('date-desc');

  const fetchBeats = async () => {
    const {error, data} = await supabase.from("Beats").select("*");
    if (error) {
              console.error("Error fetching beat: ", error.message);
              return;
          }
      console.log("Fetched beats:", data);
    const sortedData = sortBeats(data, sortOrder);
    setBeats(sortedData);
  }

  useEffect(() => {
    fetchBeats()
  }, [])

  useEffect(() => {
    setBeats(sortBeats(beats, sortOrder));
  }, [sortOrder]);

  const sortBeats = (unsortedBeats, order) => {
    const sorted = [...unsortedBeats];
    switch (order) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'bpm-asc':
        sorted.sort((a, b) => a.bpm - b.bpm);
        break;
      case 'bpm-desc':
        sorted.sort((a, b) => b.bpm - a.bpm);
        break;
    }
    return sorted;
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

// The main function for each beat
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

  // If the beat finishes playing, set its time to 0 and stop it
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


// Handles the function of playing and pausing a beat
const handlePlayPause = async () => {
  const currentAudio = audioRef.current;

  // Stop all other audio elements if an audio is playing
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
            <div className="download-div">
              <a href={beat.audio} download={`${beat.name}`}>
                <img src="images/download-button.png" alt="Download" />
              </a>
            </div>
          </div>
          <div className="middle">
            <div className="waveform">
             <Waveform audioUrl={beat.audio} audioRef={audioRef} />
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
        <p>BPM: {beat.bpm} | Key: {beat.key} | Date: {formatDate(beat.date)}</p>
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