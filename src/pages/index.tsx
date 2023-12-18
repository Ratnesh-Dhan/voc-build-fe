import React, {  useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import { TriangleLeftFill, Search, TriangleRightFill } from 'akar-icons';
import axios from 'axios';
import Meaning from '../components/Meaning';
import {shuffle} from 'lodash';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

import { poppins } from '../components/font';

let count = 0;
let total = 0;
let flag = false;
let click_suggest_flag=false;

const Home = () => {

  const searchParams = useSearchParams();

  const router = useRouter();
  const suggestionRef = useRef(null);
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [videoSource, setVideoSource] = useState("");
  const [word, setWord] = useState("");
  const [play, setPlay] = useState(true);
  const [totalVideo, setTotalVideo] = useState([]);

  // Calling Suggestions remover function.
  useOutsideAlerter(suggestionRef);

  //URL creation
  const gotUrl = (term: string) => {
    const params = new URLSearchParams("?q=ello");
    if(term) 
      params.set('query', term);
    else
      params.delete('query');
  }

  const setVideo = () => {
    if(count < total && count >= 0)
      setVideoSource(`${process.env.NEXT_PUBLIC_VIDEO_API}${word}/${totalVideo[count]}`);
  }
  
  const searchBox = async(val) => {

    //setSuggested([]);
    setWord(val);
    flag = false;

    console.log({val});
    console.log({word});
    console.log({search});

    const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_MEANING_API}${val}`
    };

    try {
      //Searching word meanings
      const response = await axios.request(options);
      setMeanings(response.data.definition);

      //Searching no of videos
      await axios.get(`${process.env.NEXT_PUBLIC_TOTAL_API}${val}`).then((response)=> {
        total = response.data;
        flag = true;
        const vids = shuffle(Array.from(Array(total).keys()))
        console.log(vids.slice(0,20));
        setTotalVideo(vids.slice(0,20));
        if (total > 20)
          total = 20;
      });
    

    } catch (error) {
      if( error.message === 'Request failed with status code 404')
        setMeanings(["-1"]);
      else {
        console.error(error);
        setMeanings([]); 
      }
      setWord("");
      removeQuery();
    }
  } 

  const suggest = async() => {
    if(search !== "") {
      await axios.get(`${process.env.NEXT_PUBLIC_WORD_SUGGESTIONS_API}${search}`).then((response)=>{
        setSuggested(response.data.slice(0,10));

      });
    }
  }

  const previousVideo = () => {
    if (count >0) {
    count--;
    setVideo();
    }
  }

  const nextVideo = () => {
    if(count < total-1) {
    count++;
    setVideo();
    }
  }

  const handlePlay = () => {
    if(videoSource.length !==0) {
      setPlay(!play);
    }
  }

  const handleKeyEnter = (event) => {
    if (event.key == 'Enter') {
      searchBox(search);
    }
  };

  // Function for removing suggestion box when clicked outsite suggestion box.
  function useOutsideAlerter(ref) {
    useEffect(() => {
   
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          click_suggest_flag=false;
          setSuggested([]);
        }
      }
   
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }

  const suggestionClicked = (val) => {
    setSearch(val);
    searchBox(val);
    click_suggest_flag=false;
  }

  //URL change function
  const createUrl =(word: string)=> {
    router.push({
      ...router, 
      query: {
        ...router.query,
        word: word
      }},
      undefined,
      {shallow: true}
    )
  }

  const removeQuery = () => {
    router.push({...router,query:{}}, undefined, {shallow: true});
  }

  // // handle what happens on key press
  // const handleKeyPress = useCallback((event) => {
  //   console.log(`Key pressed: ${event.key}`);
  //   if(event.key === '/') {
  //     inputRef.current.focus();
  //   }
  // }, []);

  // useEffect(() => {
  //   // attach the event listener
  //   document.addEventListener('keydown', handleKeyPress);

  //   // remove the event listener
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  useEffect(()=>{
    inputRef.current.focus();
  },[])

  useEffect(()=>{
    videoRef?.current?.load();
    console.log(videoSource);
  },[videoSource]);

  useEffect(()=>{
    inputRef.current.focus();
    setSuggested([]);
    count = 0;
    total = 0;
    setVideoSource("");
    setPlay(true);

    //test
    console.log(word);
    if(word)
      createUrl(word);
  },[word]);

  // useEffect(() => {
  //   // The counter changed!
  // }, [router.query.counter])

  useEffect(()=>{
    if(play)
      videoRef.current?.play();
    else
      videoRef?.current?.pause();
  },[play]);

  useEffect(()=>{
    setVideo();
  },[totalVideo]);

  useEffect(()=>{
    click_suggest_flag=true;
    if(search === "")
      setSuggested([]);

    const timer = setTimeout(() => {
      suggest();
    },500);

    return () => clearTimeout(timer);
  },[search]);

  useEffect(()=>{
    const { query } = router;
    console.log({query});
    if(query.word){
      const word = query.word;
      searchBox(`${word}`);
    }
  },[router]);

  return (
    <>
    <Head>
      {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      <link rel="icon" href="/k.jpg"></link>
      <title>{"VocBuild"}</title>
    </Head>
    <div className={poppins.className} >
    <div className="overflow-hidden min-h-screen">
      <div id="navbar" className="bg-white py-4 md:px-10 px-4 flex items-center w-screen fixed border border-b-200">
      <div className="flex items-center md:max-w-[1400px] md:w-full md:m-auto">
          <Image src="/newIkon.png" width={40} height={45} alt="logo"/>
          <h1 className="text-black text-2xl font-bold md:ml-3 ml-1 cursor-pointer"  onClick={()=>{window.location.reload()}}>{"voc-build"}</h1>
      </div>
      </div>
      <main className="flex flex-col md:flex-row md:px-[100px] py-[80px] md:m-auto md:max-w-[1400px] px-4 min-h-screen overflow-hidden">

      {/* <div id="left-screen" className="px-[60px] h-full max-h-screen overflow-hidden flex flex-col flex-grow"> */}
      <div id="left-screen" className="md:px-[60px] flex flex-col items-center h-full max-h-screen min-w-3/5 md:w-3/5">

        {/* SEARCH BOX */}
        <div className='relative w-full h-[50px] mt-8 flex flex-row justify-center'>
        {/* absolute top-0  left-[50%] translate-x-[-50%] */}
          <div className='absolute top-0 md:w-2/3 w-full z-10' ref={suggestionRef}>
          <div className="flex-col text-slate-800 flex border border-slate-300 rounded-[28px] pl-4 md:w-full w-full py-3 bg-white">
            <div className="flex items-center">
              <input type="text" placeholder="search" value={search} onChange={(event)=>{setSearch(event.target.value)}} ref={inputRef} className="flex-1 outline-none w-full bg-transparent" onKeyPress={handleKeyEnter} />
              <div className="flex items-center px-4 border-l border-l-slate-300 cursor-pointer h-[100%]" onClick={()=>{searchBox(search)}}>
                <Search strokeWidth={2} size={16} />
              </div>
            </div>
            <div className="pr-4">
              {click_suggest_flag && suggested.length!==0 && <div className="border-t border-t-slate-300 w-full">
                {suggested.map((wordSuggestion, index)=><div className='hover:bg-gray-100' onClick={()=>{suggestionClicked(wordSuggestion.substring(0,wordSuggestion.length - 1))}} key={index}> {wordSuggestion.substring(0,wordSuggestion.length - 1) }  </div>)}
                </div>}
            </div>
          </div>

          </div>
        </div>

        {/* VIDEO AREA */}
        {/* <div className="mt-8 w-[640px] h-[360px] border border-red-500 mb-6 flex bg-black"> */}
        { flag && <div className="mt-8 md:w-[640px] w-9/10 aspect-video border border-red-500 mb-6 flex items-center justify-center bg-black">
         {total===0 ? <p className="text-white font-semibold text-center">Sorry! No videos found.</p>:<video loop width="100%" autoPlay ref={videoRef}>
          <source src={videoSource} type="video/mp4"/>  
          {/* <source src="sample1.webm" type="video/webM" /> */}
        </video>}
        </div>}

        {/* VIDEO CONTROLS */}
        {videoSource && <div className="flex flex-row w-full justify-center items-center ">
          <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 mr-2' onClick={handlePlay}>play/pause</button>
          <TriangleLeftFill className="cursor-pointer hover:bg-slate-200" strokeWidth={2} size={36} color="black" onClick={previousVideo}/>
          <p>{videoSource.length === 0 ?count: count+1}/{total}</p>
          <TriangleRightFill className="cursor-pointer hover:bg-slate-200" strokeWidth={2} size={36} color="black" onClick={nextVideo}/>
          {/* <button className='text-white font-semibold text-sm bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-1 ml-2' onClick={handlePouse}>pause</button> */}
        </div>}
      </div>

      {/* MEANING SECTION */}
      <div id="right-screen" className="min-h-full md:mx-4 md:border-l md:border-l-gray-200 md:pl-4" >
        <h1 className="text-2xl md:text-4xl font-bold md:mt-8 my-4 md:text-start text-center">Dictionary</h1>
      <div  className="text-slate-800 self-center md:self-start bg-gray-200 max-h-[30vh] md:max-h-[65vh] overflow-auto px-2 py-1 md:my-5 border border-gray-300 rounded-md">
      {/* <div id="right-screen" className="text-slate-800 mr-[60px] bg-gray-200 px-2 flex-1 max-h-40 overflow-y-auto"> */}
      <div className="">
        <h1 className="text-center">{word.toUpperCase()}</h1>
        <h3>  
          { meanings.length === 0 ? <div className="text-center text-gray-400">Nothing searched yet.</div>: meanings[0] === "-1"? "no word found" : meanings.map((meaning, index)=>(<Meaning meaning={meaning} index={index} key={index} />)) }
        </h3>
      </div>
      </div>
      </div>
      </main> 
      
      <footer id="footer" className="bg-slate-600 flex flex-col items-center justify-center px-4 py-4 md:px-10">
        <div>
        <h1 className=" text-white font-bold">About</h1>
        </div>
        <div>
          <p className=" text-white text-sm md:text-base text-center">&copy; 2023 vocBuild. All Rights Reserved. Educational use only.</p>
        </div>
        <div>
          <p className="text-white text-sm md:text-base text-center">This website is educational and nonprofitable. And aims to provide valuable learning resources.</p>
        </div>
      </footer>
      </div>
    </div>
    </>
  )
}

export default Home