import Meaning from '@/containers/Home/RightSection/Meaning';
import React from 'react';

const RightSection = ({ meanings, word }) => {
  return (
    <div id="right-screen" className="min-h-full md:mx-4 md:border-l md:border-l-gray-200 md:pl-4">
      <h1 className="text-2xl md:text-4xl font-bold md:mt-8 my-4 md:text-start text-center">
        Dictionary
      </h1>
      <div className="text-slate-800 self-center md:self-start bg-gray-200 max-h-[30vh] md:max-h-[65vh] overflow-auto px-2 py-1 md:my-5 border border-gray-300 rounded-md">
        {/* <div id="right-screen" className="text-slate-800 mr-[60px] bg-gray-200 px-2 flex-1 max-h-40 overflow-y-auto"> */}
        <div className="">
          <h2 className="text-center">{word.toUpperCase()}</h2>
          <h3>
            {meanings.length === 0 ? (
              <div className="text-center text-gray-400">Nothing searched yet.</div>
            ) : meanings[0] === '-1' ? (
              'no word found'
            ) : (
              meanings.map((meaning, index) => (
                <Meaning meaning={meaning} index={index} key={index} />
              ))
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
