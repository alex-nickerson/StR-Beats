import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl, audioRef, setWaveform }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    setIsLoading(true); // Start loading when a new audio is loaded

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#97A6BA',
      progressColor: '#3B82F6',
      height: 80,
      responsive: true,
      barWidth: 2,
      normalize: true,
      backend: 'MediaElement',
      mediaControls: false,
      media: audioRef.current,
    });

    waveSurferRef.current = ws

    ws.load(audioRef.current);

    // When waveform is ready, stop showing loading
    ws.on('ready', () => {
      setIsLoading(false);
    });

    ws.on('seek', (progress) => {
    if (audioRef.current) {
      audioRef.current.currentTime = progress * audioRef.current.duration;
    }
    });

    if (setWaveform) {
      setWaveform(ws);
    }

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  return (
    <div>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', color: '#888', position: 'absolute', left: 0,}}>
          <span>Loading audio...</span>
        </div>
      )}
      <div ref={waveformRef} />
    </div>
  );
};

export default Waveform;