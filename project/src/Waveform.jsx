import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = forwardRef(({ audioUrl }, ref) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useImperativeHandle(ref, () => ({
    playPause: () => waveSurferRef.current?.playPause(),
    isPlaying: () => waveSurferRef.current?.isPlaying() ?? false,
    stop: () => waveSurferRef.current?.stop(),
    getCurrentTime: () => waveSurferRef.current?.getCurrentTime() ?? 0,
    getDuration: () => waveSurferRef.current?.getDuration() ?? 0,
    seekTo: (progress) => waveSurferRef.current?.seekTo(progress),
    setVolume: (vol) => waveSurferRef.current?.setVolume(vol),
    play: () => waveSurferRef.current?.play(),
    pause: () => waveSurferRef.current?.pause(),
    isReady: () => waveSurferRef.current !== null,
    getWaveSurfer: () => waveSurferRef.current,
  }));

  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    // Destroy old wavesurfer instance if exists
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    setIsLoading(true);

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#97A6BA',
      progressColor: '#3B82F6',
      height: 80,
      responsive: true,
      barWidth: 2,
      normalize: true,
    });

    waveSurferRef.current = ws;
    ws.load(audioUrl);

    ws.on('ready', () => {
      setIsLoading(false);
    });

    return () => {
      ws.destroy();
      waveSurferRef.current = null;
    };
  }, [audioUrl]);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#888',
            position: 'absolute',
            width: '100%',
            height: '80px',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <span>Loading audio...</span>
        </div>
      )}
      <div ref={waveformRef} />
    </div>
  );
});

export default Waveform;
