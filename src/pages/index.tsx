import React from 'react';
import Head from 'next/head';
import Home from '@/containers/Home';

const HomePage = () => {
  return (
    <React.Fragment>
      <Head>
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link rel="icon" href="/k.jpg"></link>
        <title>{'VocBuild'}</title>
      </Head>
      <Home />
    </React.Fragment>
  );
};

export default HomePage;
