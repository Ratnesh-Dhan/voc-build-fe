import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import { TriangleLeftFill, Search, TriangleRightFill } from 'akar-icons';
import axios from 'axios';
import Meaning from './Meaning';

let count = 0;
let total = 0;

const index = () => {
  const videoRef = useRef();
  const [search, setSearch] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [videoSource, setVideoSource] = useState("");
  const [word, setWord] = useState("");
  const [play, setPlay] = useState(true);

  const setVideo = () => {
    if(count < total && count >= 0)
      setVideoSource(`${process.env.NEXT_PUBLIC_VIDEO_API}${search}/${count}`);
  }
  
  const searchBox = async() => {
    console.log("inside search");
    setWord(search);

    
    
    const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_MEANING_API}${search}`
    };

    try {
      //Searching word meanings
      const response = await axios.request(options);
      console.log(response);
      setMeanings(response.data.definition);

      //Searching no of videos
      await axios.get(`${process.env.NEXT_PUBLIC_TOTAL_API}${search}`).then((response)=> {
        total = response.data;
        setVideo();
      });


    } catch (error) {
      if( error.message === 'Request failed with status code 404')
        setMeanings(["no word found"]);
      else {
        console.error(error);
        setMeanings([]); 
      }
      setWord("");
      console.log("failed")
      
    }
    console.log("exiting search")
  } 

  const previousVideo = () => {
    if (count >0) {
    count--;
    setVideo();
    }
    console.log(count);
  }

  const nextVideo = () => {
    if(count < total-1) {
    count++;
    setVideo();
    }
    console.log(count);
  }

  const handlePlay = () => {
    if(videoSource.length !==0) {
      setPlay(!play);
    }
  }

  const handlePouse = () => {
    if(videoSource.length !==0)
      videoRef.current.pause();
  }

  useEffect(()=>{
    videoRef.current?.load();
    console.log(videoSource);
    console.log({count});
    console.log({total});
  },[videoSource]);

  useEffect(()=>{
    count = 0;
    total = 0;
    setVideoSource("");
    setPlay(true);
  },[word]);

  useEffect(()=>{
    if(play)
      videoRef.current?.play();
    else
      videoRef.current?.pause();
    console.log({play});
  },[play]);

  return (
    <>
    <Head>
      <title>{"VocBuild"}</title>
    </Head>

    <div className="overflow-hidden max-h-screen">
      <div id="navbar" className="bg-black py-4 px-10 flex items-center w-screen">
      <Image src="suvid.svg" width={51.7} height={57.7} alt="logo"/>
      <h1 className="text-white text-4xl font-bold ml-3">{"VocBuild"}</h1>
      </div>
      <main className="flex flex-row px-[100px] max-h-screen overflow-hidden">

      {/* <div id="left-screen" className="px-[60px] h-full max-h-screen overflow-hidden flex flex-col flex-grow"> */}
      <div id="left-screen" className="px-[60px] flex flex-col items-center h-full max-h-screen overflow-hidden">

        {/* SEARCH BOX */}
        <div className="text-slate-800 mt-8 flex border border-slate-300 rounded-full pl-4 w-1/2 items-center ">
          <input type="text" placeholder="search" value={search} onChange={(event)=>{setSearch(event.target.value)}} className="flex-1 outline-none"/>

          <div className="flex items-center px-4 border-l border-l-slate-300 cursor-pointer h-[100%]" onClick={searchBox}>
            <Search strokeWidth={2} size={16} />
          </div>
        </div>

        {/* VIDEO AREA */}
        <div className="mt-8 w-[640px] h-[360px] border border-red-500 mb-6 flex bg-black">
        {videoSource && <video loop width="100%" autoPlay ref={videoRef}>
          <source src={videoSource} />  
        </video>}
        </div>

        {/* VIDEO CONTROLS */}
        <div className="flex flex-row w-full justify-center items-center ">
          <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 mr-2' onClick={handlePlay}>play/pause</button>
          <TriangleLeftFill className="cursor-pointer hover:bg-slate-200" strokeWidth={2} size={36} color="black" onClick={previousVideo}/>
          <p>{videoSource.length === 0 ?count: count+1}/{total}</p>
          <TriangleRightFill className="cursor-pointer hover:bg-slate-200" strokeWidth={2} size={36} color="black" onClick={nextVideo}/>
          {/* <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 ml-2' onClick={handlePouse}>pause</button> */}
        </div>
      </div>

      {/* MEANING SECTION */}
      <div id="right-screen" className="text-slate-800 mr-[60px] flex-1 bg-gray-200 max-h-full overflow-auto px-2 pb-24 my-2">
      {/* <div id="right-screen" className="text-slate-800 mr-[60px] bg-gray-200 px-2 flex-1 max-h-40 overflow-y-auto"> */}
      <div className="mt-4">
        <h3> 
          { meanings.length === 0 ? null: meanings.map((meaning, index)=>(<Meaning meaning={meaning} index={index} key={index} />)) }
        </h3>
      </div>
      </div>
      </main>
    </div>
    </>
  )
}

export default index