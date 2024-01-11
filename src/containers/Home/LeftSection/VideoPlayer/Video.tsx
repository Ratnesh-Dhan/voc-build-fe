import React from 'react';

const Video = ({ total, videoSource, videoRef }) => {
  return (
    <div className="mt-8 md:w-[640px] w-9/10 aspect-video border border-red-500 mb-6 flex items-center justify-center bg-black">
      {total === 0 ? (
        <p className="text-white font-semibold text-center">Sorry! No videos found.</p>
      ) : (
        <video loop width="100%" autoPlay ref={videoRef}>
          <source src={videoSource} type="video/mp4" />
          {/* <source src="sample1.webm" type="video/webM" /> */}
        </video>
      )}
    </div>
  );
};

export default Video;
