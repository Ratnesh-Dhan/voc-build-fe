import React, { useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import { TriangleLeftFill, Search, TriangleRightFill } from 'akar-icons';
import axios from 'axios';
import Meaning from './Meaning';


const index = () => {
  const [search, setSearch] = useState("");
  const [meanings, setMeaings] = useState([]);


  const searchBox = async() => {

    const options = {
      method: 'GET',
      url: `http://ec2-65-0-179-88.ap-south-1.compute.amazonaws.com:8080/word?word=${search}`
    };

    console.log(search);
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setMeaings(response.data.definition);
    } catch (error) {
      console.error(error);
    }
  }

  const previousVideo = () => {

  }

  const nextVideo = () => {
    
  }

  return (
    <>
    <Head>
      <title>{"subid's app"}</title>
    </Head>
    <div>
      <div id="navbar" className="bg-black py-4 px-10 flex items-center">
      <Image src="suvid.svg" width={51.7} height={57.7} alt="logo"/>
      <h1 className="text-white text-4xl font-bold ml-3">{"VocBuild"}</h1>
      </div>

      <main className="flex px-[100px]">
      <div id="left-screen" className="px-[60px] flex flex-col items-center">

        <div className="text-slate-800 mt-8 flex border border-slate-300 rounded-full pl-4 w-1/2 items-center ">
          <input type="text" placeholder="search" value={search} onChange={(event)=>{setSearch(event.target.value)}} className="flex-1 outline-none"/>

          <div className="flex items-center px-4 border-l border-l-slate-300 cursor-pointer h-[100%]" onClick={searchBox}>
            <Search strokeWidth={2} size={16} />
          </div>
        </div>

        <div className="mt-8 w-[640px] h-[360px] border border-red-500 mb-6">
        <video controls width="100%">
          <source src={"sample_video.mp4"} type="video/mp4" />    
        </video>
        </div>


        <div className="flex flex-row w-full justify-center items-center">
          <TriangleLeftFill strokeWidth={2} size={36} color="black" onClick={previousVideo}/>
          <p>i/n</p>
          <TriangleRightFill strokeWidth={2} size={36} color="black" onClick={nextVideo}/>
        </div>
      </div>

      <div id="right-screen" className="text-slate-800 mr-[60px] flex-1 bg-gray-200 min-h-screen px-2">textarea
      <div className="mt-4">
        <h3> 
          { meanings.length === 0? null: meanings.map((meaning, index)=>(<Meaning meaning={meaning} index={index} key={index} />)) }
        </h3>
      </div>
      </div>
      </main>
    </div>
    </>
  )
}

export default index






















{/* <video controls width="560" height="315">
          <source src={src} type="video/mp4" />    
        </video> */}
{/* <iframe width="560" height="315" src={src} frameBorder="0" allowFullScreen/> */}