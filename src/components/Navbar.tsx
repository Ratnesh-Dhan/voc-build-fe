import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div className="z-20">
      <div
        id="navbar"
        className="bg-white py-4 md:px-10 px-4 flex items-center justify-between w-screen fixed top-0 border border-b-200"
      >
        <div className="flex items-center md:max-w-[1400px] md:w-full md:m-auto ">
          <a className="flex items-center cursor-pointer" href={origin}>
            <Image src="/newIkon.png" width={40} height={45} alt="logo" />
            <h1 className="text-black text-xl font-bold md:ml-3 ml-1 ">voc-build</h1>
          </a>
        </div>
        <div>
          <a href={'/Search'}>
            <span className="text-sm md:text-base">Search</span>
          </a>
          <a href={'/'} className="ml-2 md:ml-10">
            <span className="text-sm md:text-base">Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
