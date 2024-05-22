import React from 'react';
import Search from '../Search';

const Home = () => {
  return (
    <React.Fragment>
      <div className="py-32">
        <div className="border rounded-3xl mx-5 md:mx-20 p-10 md:p-20 bg-[#20C997]">
          <p id="heading" className="md:text-center text-xl md:text-4xl font-bold">
            Learn Words Through Movie Dialogues!
          </p>

          <p id="sub-heading" className="text-center mt-5 md:mt-10">
            Enhance your vocabulary with real-life examples from your favorite films.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
