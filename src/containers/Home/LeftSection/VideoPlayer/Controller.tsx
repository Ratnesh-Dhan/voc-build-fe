import { TriangleLeftFill, TriangleRightFill } from 'akar-icons';
import React, { useEffect } from 'react';

const Controller = ({
  currentVideo,
  setCurrentVideo,
  setVideo,
  videoSource,
  total,
  play,
  setPlay,
}) => {
  const previousVideo = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  const nextVideo = () => {
    if (currentVideo < total - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  const handlePlay = () => {
    if (videoSource.length !== 0) {
      setPlay(!play);
    }
  };

  useEffect(() => {
    setVideo();
  }, [currentVideo]);

  return (
    <div className="flex flex-row w-full justify-center items-center ">
      <button
        className="text-white font-semibold text-sm bg-[#20C997] transition duration-200 ease-out hover:scale-125 rounded-full px-3 py-1 mr-2"
        onClick={handlePlay}
      >
        {/* bg-cyan-500x  hover:bg-cyan-600 */}
        play/pause
      </button>
      <TriangleLeftFill
        className="cursor-pointer hover:bg-slate-200 hover:scale-125 transition duration-200 ease-out"
        strokeWidth={2}
        size={36}
        color="black"
        onClick={previousVideo}
      />
      <p>
        {videoSource.length === 0 ? currentVideo : currentVideo + 1}/{total}
      </p>
      <TriangleRightFill
        className="cursor-pointer hover:bg-slate-200 hover:scale-125 transition duration-200 ease-out"
        strokeWidth={2}
        size={36}
        color="black"
        onClick={nextVideo}
      />
      {/* <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 ml-2' onClick={handlePouse}>pause</button> */}
    </div>
  );
};

export default Controller;
