import If from '@/components/If';
import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
import Controller from './Controller';
import toast from 'react-hot-toast';

const VideoPlayer = ({
  flag,
  videoSource,
  total,
  word,
  currentVideo,
  setCurrentVideo,
  setVideoSource,
  totalVideo,
  createUrl,
}) => {
  const [play, setPlay] = useState(true);

  const videoRef = useRef(null);

  const setVideo = () => {
    if (currentVideo < total && currentVideo >= 0)
      setVideoSource(`${process.env.NEXT_PUBLIC_VIDEO_API}${word}/${totalVideo[currentVideo]}`);
  };

  useEffect(() => {
    setVideo();
  }, [totalVideo]);

  useEffect(() => {
    if (play) videoRef.current?.play();
    else videoRef?.current?.pause();
  }, [play]);

  useEffect(() => {
    setPlay(true);
  }, [word]);

  useEffect(() => {
    const videoElement = videoRef?.current;
    console.log({ videoElement });
    if (videoElement !== null) {
      videoElement?.load();
    }

    if (videoSource) createUrl(word, totalVideo[currentVideo]);

    return () => {
      // running cleanup function to handle component unmounting
      if (videoElement) {
        //videoRef.current.load();
        // videoElement.abort();
        //videoRef.current = null;
        // videoElement.pause();
        // videoElement.removeAttribute('src');
        // videoElement.load();
      }
    };
  }, [videoSource]);

  return (
    <React.Fragment>
      <If condition={flag} then={<Video {...{ total, videoSource, videoRef }} />} />
      <If
        condition={videoSource}
        then={
          <Controller
            {...{ currentVideo, setCurrentVideo, setVideo, videoSource, total, play, setPlay }}
          />
        }
      />
    </React.Fragment>
  );
};

export default VideoPlayer;
