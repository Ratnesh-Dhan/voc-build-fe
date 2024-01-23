import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface IMetadata {
  id: String;
  movieName: string;
  startTime: number;
  endTime: number;
  text: string;
  seq: number;
}

const Moviesources = ({ word, number, videoSource }) => {
  const [metadata, setMetadata] = useState<{ data: IMetadata; error: boolean }>({
    data: null,
    error: false,
  });

  const movieInfo = async (word, number) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_MOVIE_INFO}${word}/${number}`)
      .then((response) => {
        setMetadata({ data: response.data, error: false });
      })
      .catch(() => {
        setMetadata({ data: null, error: true });
      });
  };

  useEffect(() => {
    movieInfo(word, number);
    console.log('work');
  }, [number]);

  if (videoSource) {
    return (
      <div className="border border-slate-300 rounded-md overflow-hidden my-3">
        <div className="bg-blue-200 p-3">
          <h3 className="font-semibold text-xl">Movie : {metadata?.data?.movieName}</h3>
          <p>Text : {metadata?.data?.text}</p>
          <a href={`https://imdb.com/title/${metadata?.data?.id}`} target="_blank">
            <p className="text-sm mt-2">
              IMDB :{' '}
              <span className="text-blue-900 hover:underline">{`https://imdb.com/title/${metadata?.data?.id}`}</span>
            </p>
          </a>
        </div>
      </div>
    );
  }
};

export default Moviesources;
