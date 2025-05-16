// Waveform.jsx
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl, audioRef }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#97A6BA',
      progressColor: '#3B82F6',
      height: 80,
      responsive: true,
      barWidth: 2,
      normalize: true,
      backend: 'MediaElement', //use external audio element
      mediaControls: false,
      media: audioRef.current, //tie it to existing audio element
    });

    waveSurferRef.current.load(audioUrl);

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default Waveform;
