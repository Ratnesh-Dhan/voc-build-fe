import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TriangleLeftFill, Search, TriangleRightFill } from 'akar-icons';
import axios from 'axios';
import { shuffle } from 'lodash';
import { useRouter } from 'next/router';
import Moviesources from '@/components/Moviesources';
import { poppins } from '@/components/font';
import Meaning from '@/components/Meaning';
import Rightscreen from './Rightscreen';

let count = 0;
let total = 0;
let flag = false;
let click_suggest_flag = false;

const Home = () => {
  //const searchParams = useSearchParams();

  const router = useRouter();
  const suggestionRef = useRef(null);
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [videoSource, setVideoSource] = useState('');
  const [word, setWord] = useState('');
  const [play, setPlay] = useState(true);
  const [totalVideo, setTotalVideo] = useState([]);
  const [initial, setInitial] = useState(false);

  // Calling Suggestions remover function.
  useOutsideAlerter(suggestionRef);

  const setVideo = () => {
    if (count < total && count >= 0)
      setVideoSource(
        `${process.env.NEXT_PUBLIC_VIDEO_API}${word}/${totalVideo[count]}`
      );
  };

  const searchBox = async (val, videoNumber = 0) => {
    //setSuggested([]);
    setWord(val);
    flag = false;

    console.log({ val });
    console.log({ word });
    console.log({ search });

    const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_MEANING_API}${val}`,
    };

    try {
      //Searching word meanings
      const response = await axios.request(options);
      setMeanings(response.data.definition);

      //Searching no of videos
      await axios
        .get(`${process.env.NEXT_PUBLIC_TOTAL_API}${val}`)
        .then((response) => {
          total = response.data;
          flag = true;
          const vids = shuffle(Array.from(Array(total).keys()));
          const trimmedList = vids.slice(0, 20);
          console.log({ vids });

          //Setting video which is shared in URL.
          if (videoNumber) {
            trimmedList.pop(videoNumber);
            trimmedList[0] = videoNumber;
            setTotalVideo(trimmedList);
            console.log('setting video which was shared in url');
          } else {
            setTotalVideo(trimmedList);
          }
          if (total > 20) total = 20;
        });
    } catch (error) {
      if (error.message === 'Request failed with status code 404')
        setMeanings(['-1']);
      else {
        console.error(error);
        setMeanings([]);
      }
      setWord('');
      removeQuery();
    }
    setInitial(true);
  };

  const suggest = async () => {
    if (search !== '') {
      await axios
        .get(`${process.env.NEXT_PUBLIC_WORD_SUGGESTIONS_API}${search}`)
        .then((response) => {
          setSuggested(response.data.slice(0, 10));
        });
    }
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
          click_suggest_flag = false;
          setSuggested([]);
        }
      }

      // Adding click event listener
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [ref]);
  }

  const suggestionClicked = (val) => {
    setSearch(val);
    searchBox(val);
    click_suggest_flag = false;
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

  const removeQuery = () => {
    router.push({ ...router, query: {} }, undefined, { shallow: true });
  };

  // // handle what happens on key press
  // const handleKeyPress = useCallback((event) => {
  //   console.log(`Key pressed: ${event.key}`);
  //   if(event.key === '/') 
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

  useEffect(() => {
    //removeQuery();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    videoRef?.current?.load();
    if (videoSource) createUrl(word, totalVideo[count]);
  }, [videoSource]);

  useEffect(() => {
    inputRef.current.focus();
    setSuggested([]);
    count = 0;
    total = 0;
    setVideoSource('');
    setPlay(true);
  }, [word]);

  // useEffect(() => {
  //   // The counter changed!
  // }, [router.query.counter])

  useEffect(() => {
    console.log({ play });

    if (play) videoRef.current?.play();
    else videoRef?.current?.pause();
  }, [play]);

  useEffect(() => {
    setVideo();
  }, [totalVideo]);

  useEffect(() => {
    click_suggest_flag = true;
    if (search === '') setSuggested([]);

    const timer = setTimeout(() => {
      suggest();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    
    const { query } = router;
    if (!initial) {
      if (query.w) {
        searchBox(query.w, Number(query.v));
      }
    }
    //   if(query.v){
    //     console.log("this query function is hitting search box"+ typeof query.v);
    //     const word = query.w;
    //     searchBox(`${word}`, Number(query.v));
    // }
  }, [router.query]);

  return (
    <React.Fragment>
      <div className={poppins.className}>
        <div className="overflow-hidden min-h-screen">
          
          <main className="flex flex-col md:flex-row md:px-[100px] py-[80px] md:m-auto md:max-w-[1400px] px-4 min-h-screen overflow-hidden">
            {/* <div id="left-screen" className="px-[60px] h-full max-h-screen overflow-hidden flex flex-col flex-grow"> */}
            <div
              id="left-screen"
              className="md:px-[60px] flex flex-col items-center h-full  min-w-3/5 md:w-3/5"
            >
              {/* "max-h-screen"  if encounter any error*/}

              {/* SEARCH BOX */}
              <div className="relative w-full h-[50px] mt-8 flex flex-row justify-center">
                {/* absolute top-0  left-[50%] translate-x-[-50%] */}
                <div
                  className="absolute top-0 md:w-2/3 w-full z-10"
                  ref={suggestionRef}
                >
                  <div className="flex-col text-slate-800 flex border border-slate-300 rounded-[28px] pl-4 md:w-full w-full py-3 bg-white">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="search"
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                        ref={inputRef}
                        className="flex-1 outline-none w-full bg-transparent"
                        onKeyDown={handleKeyEnter}
                      />
                      <div
                        className="flex items-center px-4 border-l border-l-slate-300 cursor-pointer h-[100%]"
                        onClick={() => {
                          searchBox(search);
                        }}
                      >
                        <Search strokeWidth={2} size={16} />
                      </div>
                    </div>
                    <div className="pr-4">
                      {click_suggest_flag && suggested.length !== 0 && (
                        <div className="border-t border-t-slate-300 w-full">
                          {suggested.map((wordSuggestion, index) => (
                            <div
                              className="hover:bg-gray-100"
                              onClick={() => {
                                suggestionClicked(
                                  wordSuggestion.substring(
                                    0,
                                    wordSuggestion.length - 1
                                  )
                                );
                              }}
                              key={index}
                            >
                              {' '}
                              {wordSuggestion.substring(
                                0,
                                wordSuggestion.length - 1
                              )}{' '}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

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

            {/* MEANING SECTION */}
            <Rightscreen meanings={meanings} word={word}/>
          </main>

          
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;