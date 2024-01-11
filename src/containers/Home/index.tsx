import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { shuffle } from 'lodash';
import { useRouter } from 'next/router';
import { poppins } from '@/components/font';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

let total = 0;
let flag = false;

const Home = () => {
  //const searchParams = useSearchParams();

  const router = useRouter();
  const [search, setSearch] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [totalVideo, setTotalVideo] = useState([]);
  const [initial, setInitial] = useState(false);



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


  const removeQuery = () => {
    router.push({ ...router, query: {} }, undefined, { shallow: true });
  };


  useEffect(() => {
    const { query } = router;
    if (!initial) {
      if (query.w) {
        searchBox(query.w, Number(query.v)); 
      }
    }
  }, [router.query]);

  //test
  useEffect(()=>{
    console.log("Home totalVideo "+ totalVideo);
    console.log("Home total "+ total);
  },[]);

  return (
    <React.Fragment>
      <div className={poppins.className}>
        <div className="overflow-hidden min-h-screen">
          <main className="flex flex-col md:flex-row md:px-[100px] py-[80px] md:m-auto md:max-w-[1400px] px-4 min-h-screen overflow-hidden">
            <LeftSection {...{ search, setSearch, searchBox, word, totalVideo, flag, total }} />
            <RightSection meanings={meanings} word={word} />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
