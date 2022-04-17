import { useRef, useState } from 'react';
import NextIcon from '../../assets/next.svg';
import PauseIcon from '../../assets/pause.svg';
import PlayIcon from '../../assets/play.svg';
import PreviousIcon from '../../assets/previous.svg';
import StopIcon from '../../assets/stop.svg';
import './style.css';

export default function Controls({
  audioRef,
  currentMusic,
  iconBtn,
  setIconBtn,
  handleChangeMusic
}) {
  let intervalProgress = null;

  const progresRef = useRef(null);
  function playPause() {

    intervalProgress = setInterval(() => {
      if (audioRef.current.paused) {
        clearInterval(intervalProgress);
      }

      const duration = audioRef.current.duration / 60;

      const currentProgres = ((audioRef.current.currentTime / 60) * 100) / duration;

      progresRef.current.style.width = `${currentProgres}%`;

    }, 1000);

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIconBtn('pause');
      return;
    }

    audioRef.current.pause();
    setIconBtn('play');
  }

  function stop() {
    setIconBtn('play');
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }


  return (
    <div className='container-controls'>
      <div className='preview-names'>
        <h2>{currentMusic.title}</h2>
        <strong>{currentMusic.artist}</strong>
      </div>

      <div className='container-player'>
        <div className='container-buttons'>
          <img
            src={StopIcon}
            alt=""
            className='btn-control'
            onClick={() => stop()}
          />
          <img
            src={PreviousIcon}
            alt=""
            className='btn-control'
            onClick={() => handleChangeMusic('previous')}
          />
          <img
            src={iconBtn === 'pause' ? PauseIcon : PlayIcon}
            alt=""
            className='btn-play-pause'
            onClick={() => playPause()}
          />
          <img
            src={NextIcon}
            alt=""
            className='btn-control'
            onClick={() => handleChangeMusic('next')}
          />
        </div>
        <div className='container-progress'>
          <strong className='start'>0</strong>
          <div className='container-line'>
            <div className='progress-line'></div>
            <div
              className='progress-line-color'
              ref={progresRef}
            >
            </div>
          </div>
          <strong className='end'>3:34</strong>
        </div>
      </div>

      <div className='empty'>

      </div>
    </div >
  )
}