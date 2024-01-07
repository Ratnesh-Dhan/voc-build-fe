import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer
        id="footer"
        className="bg-slate-600 flex flex-col items-center justify-center px-4 py-4 md:px-10"
      >
        <div>
          <h1 className=" text-white font-bold">About</h1>
        </div>
        <div>
          <p className=" text-white text-sm md:text-base text-center">
            &copy; 2023 vocBuild. All Rights Reserved. Educational use only.
          </p>
        </div>
        <div>
          <p className="text-white text-sm md:text-base text-center">
            This website is educational and nonprofitable. And aims to provide
            valuable learning resources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
