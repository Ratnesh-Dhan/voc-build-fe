import { InstagramFill, TwitterFill, YoutubeFill } from 'akar-icons';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <footer
        id="footer"
        className="bg-slate-600 flex flex-col items-center justify-center px-4 py-4 md:px-10 bottom-0"
      >
        {/* bg-slate-600 */}
        <div>
          <h1 className=" text-white font-bold flex justify-center">
            <Link href="/About">About</Link>
          </h1>
        </div>
        <div>
          <p className=" text-white text-sm md:text-base text-center">
            &copy; 2023 vocBuild. All Rights Reserved. Educational use only.
          </p>
        </div>
        <div>
          <p className="text-white text-sm md:text-base text-center">
            This website is educational and nonprofitable. And aims to provide valuable learning
            resources.
          </p>
        </div>
        <div className="flex flex-row justify-center mt-3">
          <a href="https://www.instagram.com/vocbuild" target="blank" className="md:pr-8 pr-4">
            <InstagramFill strokeWidth={2} size={25} color="white" />
          </a>
          <a href="https://www.youtube.com/@VocBuild" target="blank" className="md:pr-8 pr-4">
            <YoutubeFill strokeWidth={2} size={25} color="white" />
          </a>
          <a href="https://twitter.com/VocBuild1" target="blank" className="">
            <TwitterFill strokeWidth={2} size={25} color="white" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
