import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [emptyBar, setEmptyBar] = useState(Boolean);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    if (search !== '') {
      if (emptyBar) {
        toast.success('Great Job.');
      }
      router.push({
        pathname: '/Search',
        query: { w: search },
      });
    } else {
      toast.error('Whoops! You need to type something to search. Try again!');
      setEmptyBar(true);
    }
  };
  return (
    <React.Fragment>
      <div className="pt-20 md:py-32">
        <div className="border rounded-none md:rounded-3xl mx-0 md:mx-20 p-5 md:p-20 bg-[#20C997] text-white">
          <p id="heading" className="md:text-center text-xl md:text-4xl font-bold">
            Learn Words Through Movie Dialogues!
          </p>

          <p id="sub-heading" className="text-center mt-5 md:mt-10 text-lg md:text-xl">
            Enhance your vocabulary with real-life examples from your favorite films.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center md:pt-10">
            <input
              className="xs:my-5 md:w-[60%] p-5 border rounded-l-lg md:rounded-r-none rounded-r-lg md:my-0 my-5 border-none text-slate-500 "
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button
              className="py-2 px-5 md:py-5 md:px-10 border border-none  md:rounded-r-lg  bg-[#FF6F61] active:bg-[#FF483D] transition-colors duration-10"
              onClick={handleClick}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
