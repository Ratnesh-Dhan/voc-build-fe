import React, { useEffect, useRef, useState } from 'react'
import { TriangleLeftFill, Search, TriangleRightFill } from 'akar-icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import Moviesources from '@/containers/Home/LeftSection/Moviesources';
import SearchBar from './SearchBar';

let count = 0;


const LeftSection = ({search, setSearch, searchBox, word, totalVideo, flag, total}) => {
  const [videoSource, setVideoSource] = useState("");
  const [play, setPlay] = useState(true);

  const router = useRouter();

  const inputRef = useRef(null);
  const videoRef = useRef(null);






      const setVideo = () => {
        if (count < total && count >= 0)
          setVideoSource(
            `${process.env.NEXT_PUBLIC_VIDEO_API}${word}/${totalVideo[count]}`
          );
      };

      const previousVideo = () => {
        if (count > 0) {
          count--;
          setVideo();
        }
      };
    
      const nextVideo = () => {
        if (count < total - 1) {
          count++;
          setVideo();
        }
      };
    
      const handlePlay = () => {
        if (videoSource.length !== 0) {
          setPlay(!play);
        }
      };



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
        count = 0;
        total = 0;
        setVideoSource('');
        setPlay(true);
      }, [word]);



      useEffect(() => {
        videoRef?.current?.load();
        if (videoSource) createUrl(word, totalVideo[count]);
      }, [videoSource]);

      useEffect(() => {
        console.log({ play });
    
        if (play) videoRef.current?.play();
        else videoRef?.current?.pause();
      }, [play]);
    
      useEffect(() => {
        setVideo();
      }, [totalVideo]);

  return (
    <div
    id="left-screen"
    className="md:px-[60px] flex flex-col items-center h-full  min-w-3/5 md:w-3/5"
  >
    {/* "max-h-screen"  if encounter any error*/}

    {/* SEARCH BOX */}
    <SearchBar {...{inputRef, search, word, setSearch, searchBox}} />

    {/* VIDEO AREA */}
    {/* <div className="mt-8 w-[640px] h-[360px] border border-red-500 mb-6 flex bg-black"> */}
    {flag && (
      <div className="mt-8 md:w-[640px] w-9/10 aspect-video border border-red-500 mb-6 flex items-center justify-center bg-black">
        {total === 0 ? (
          <p className="text-white font-semibold text-center">
            Sorry! No videos found.
          </p>
        ) : (
          <video loop width="100%" autoPlay ref={videoRef}>
            <source src={videoSource} type="video/mp4" />
            {/* <source src="sample1.webm" type="video/webM" /> */}
          </video>
        )}
      </div>
    )}

    {/* VIDEO CONTROLS */}
    {videoSource && (
      <div className="flex flex-row w-full justify-center items-center ">
        <button
          className="text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 mr-2"
          onClick={handlePlay}
        >
          play/pause
        </button>
        <TriangleLeftFill
          className="cursor-pointer hover:bg-slate-200"
          strokeWidth={2}
          size={36}
          color="black"
          onClick={previousVideo}
        />
        <p>
          {videoSource.length === 0 ? count : count + 1}/{total}
        </p>
        <TriangleRightFill
          className="cursor-pointer hover:bg-slate-200"
          strokeWidth={2}
          size={36}
          color="black"
          onClick={nextVideo}
        />
        {/* <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 ml-2' onClick={handlePouse}>pause</button> */}
      </div>
    )}
    {/* MOVIE SOURCE BOX */}
    {videoSource && (
      <div className="border border-slate-300 rounded-md overflow-hidden my-3">
        <Moviesources word={word} number={totalVideo[count]} />
      </div>
    )}
  </div>
  )
}

export default LeftSection