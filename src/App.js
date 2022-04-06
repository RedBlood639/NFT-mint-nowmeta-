import React, { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from './config/getLibrary';
import MintBox from './components/mint-box';
import './App.css';
import DigitalFrame from './components/digital-frame';
import RobotVideo from './assets/images/flame-particle.mp4';

import CameraVideo1 from './assets/images/Intro.mp4';
import CameraVideo2 from './assets/images/robot.mp4';
import CameraVideo3 from './assets/images/robot1.mp4';



function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <div className='flex center container'>
          <video className='background-robot-video' autoPlay muted loop src={RobotVideo} />
          <div className='flex row inner-wrapper'>
            <div className='flex col center mint-container'>
              <MintBox />
            </div>
            <div className='flex col camera-slide'>
              <DigitalFrame video={CameraVideo1} />
              <DigitalFrame video={CameraVideo2} />
              <DigitalFrame video={CameraVideo3} />
            </div>
          </div>
        </div>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
