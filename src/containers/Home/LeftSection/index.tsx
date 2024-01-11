import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Moviesources from '@/containers/Home/LeftSection/Moviesources';
import SearchBar from './SearchBar';
import VideoPlayer from './VideoPlayer';
import If from '@/components/If';

const LeftSection = ({ search, setSearch, searchBox, word, totalVideo, flag, total }) => {
  const [videoSource, setVideoSource] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);

  const router = useRouter();

  const inputRef = useRef(null);

  //URL change function
  const createUrl = (word: string, videoNumber: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          w: word,
          v: videoNumber,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    setCurrentVideo(0);
    total = 0;
    setVideoSource('');
  }, [word]);

  //test
  useEffect(() => {
    console.log('leftSection toalVideo ' + totalVideo);
    console.log('leftSection total ' + total);
    console.log('leftSection videoSouce' + videoSource);
    console.log('leftSection currentVideo' + currentVideo);
  }, [currentVideo]);

  return (
    <div
      id="left-screen"
      className="md:px-[60px] flex flex-col items-center h-full  min-w-3/5 md:w-3/5"
    >
      {/* SEARCH BOX */}
      <SearchBar {...{ inputRef, search, word, setSearch, searchBox }} />

      <VideoPlayer
        {...{
          flag,
          videoSource,
          total,
          word,
          setVideoSource,
          currentVideo,
          setCurrentVideo,
          totalVideo,
          createUrl,
        }}
      />

      <If
        condition={videoSource !== void 0}
        then={<Moviesources number={totalVideo[currentVideo]} {...{ word, videoSource }} />}
      />
    </div>
  );
};

export default LeftSection;
