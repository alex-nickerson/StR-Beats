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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playingBeatId, setPlayingBeatId] = useState(null);

  const beatsPerPage = 5;

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

  const filteredBeats = beats.filter((beat) => {
    const query = searchQuery.toLowerCase();
    return (
        beat.name.toLowerCase().includes(query) ||
        beat.key.toLowerCase().includes(query) ||
        String(beat.bpm).includes(query) ||
        formatDate(beat.date).toLowerCase().includes(query)
    );
  });

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

  const indexOfLastBeat = currentPage * beatsPerPage;
  const indexOfFirstBeat = indexOfLastBeat - beatsPerPage;
  const currentBeats = filteredBeats.slice(indexOfFirstBeat, indexOfLastBeat);
  const totalPages = Math.ceil(filteredBeats.length / beatsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <div className="search-container">
      <label htmlFor="">Search:</label>
      <input
        type="text"
        placeholder="Search beats..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>

      <div id="hero">
        {currentBeats.length > 0 ? (
          currentBeats.map((beat, index) => <BeatCard key={index} beat={beat} isPlaying={playingBeatId === beat.id} 
          onPlay={() => setPlayingBeatId(beat.id)} onPause={() => setPlayingBeatId(null)}/>)
        ) : (
          <h3>No beats found.</h3>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// The main function for each beat
const BeatCard = ({ beat, isPlaying, onPlay, onPause }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const waveformRef = useRef();

useEffect(() => {
  const ws = waveformRef.current?.getWaveSurfer?.();
  if (!ws) return;

  const updateTime = () => {
    setCurrentTime(ws.getCurrentTime());
    setDuration(ws.getDuration());
  };

  const handleFinish = () => {
    setCurrentTime(0);
    onPause();
    ws.stop() // Notify parent that it's no longer playing
  };

  ws.on('audioprocess', updateTime);
  ws.on('seek', updateTime);
  ws.on('ready', updateTime);
  ws.on('finish', handleFinish);

  ws.setVolume(volume);

  return () => {
    ws.un('audioprocess', updateTime);
    ws.un('seek', updateTime);
    ws.un('ready', updateTime);
    ws.un('finish', handleFinish);
  };
}, [volume, onPause]);

// Handles the function of playing and pausing a beat
const handlePlayPause = () => {
  const ws = waveformRef.current?.getWaveSurfer?.();
  if (!ws) return;

  if (!isPlaying) {
    onPlay(); // This tells BeatList to update `playingBeatId`
    ws.play();
  } else {
    onPause();
    ws.pause();
  }
};
  const handleRewind = () => {
    const ws = waveformRef.current?.getWaveSurfer?.();
    if (!ws) return;
    const newTime = Math.max(0, ws.getCurrentTime() - 5);
    ws.seekTo(newTime / ws.getDuration());
  };

  const handleFastForward = () => {
    const ws = waveformRef.current?.getWaveSurfer?.();
    if (!ws) return;
    const newTime = Math.min(ws.getDuration(), ws.getCurrentTime() + 5);
    ws.seekTo(newTime / ws.getDuration());
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const ws = waveformRef.current?.getWaveSurfer?.();
    if (ws) ws.setVolume(newVolume);
  };

  useEffect(() => {
    if (!isPlaying) {
      const ws = waveformRef.current?.getWaveSurfer?.();
      if (ws && ws.isPlaying()) {
        ws.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="beat-container">
      <div className="beat">
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
             <Waveform ref={waveformRef} audioUrl={beat.audio} />
            </div>
          </div>
          <div className="bottom">
            <div className="filler"></div>
            <div className="controls">
              <div className="rewind">
                <button onClick={handleRewind} className="rewind-button">
                  <span>⏪︎</span>
                </button>
              </div>
              <div className="play">
                <button onClick={handlePlayPause} className="play-button">
                  <span>{isPlaying ? '❚❚' : '▶'}</span>
                </button>
              </div>
              <div className="fastforward">
                <button onClick={handleFastForward} className="fastforward-button">
                  <span>⏩︎</span>
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