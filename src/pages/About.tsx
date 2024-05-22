import { poppins } from '@/components/font';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className={poppins.className}>
      <div className="my-20 md:mx-20 mx-5 md:p-20 pt-5 text-center">
        <h1 className="text-2xl mb-10 font-bold text-lime-700 hover:underline">
          <Link href="/">Vocbuild</Link>
        </h1>
        <p>
          Welcome to vocbuild.com – Your Ultimate Destination for Word Mastery through Cinematic
          Expression!
        </p>
        <p>
          At vocbuild.com, we believe in the transformative power of words and the art of
          expression. Our mission is to redefine the way you engage with language by providing a
          dynamic online dictionary experience that transcends traditional boundaries. Say hello to
          a world where words come alive, and learning is an immersive journey.
        </p>
        <h3 className="font-semibold mt-5">Our Mission:</h3>
        <p>Elevating Language Learning through Cinematic Context.</p>

        <h3 className="font-semibold mt-5">Who We Are:</h3>
        <p>
          We are a passionate team of language enthusiasts, educators, and cinephiles committed to
          making language acquisition a thrilling adventure. vocbuild.com isn't just an online
          dictionary; it's a portal where you can explore the depth of language through the lens of
          iconic movie dialogues.
        </p>
        <h3 className="font-semibold mt-5">We offer</h3>
        <p>
          VocBuild offers a comprehensive online dictionary where each word is accompanied by its
          definition and most distinctively, references from popular movies. These references
          include: Movie Clips: Short snippets from films showing the word in use, helping to
          understand its context and usage. Quotes: Iconic lines from movies where the word is
          featured, enhancing memorability. This approach not only helps in understanding the
          meaning of the word but also in appreciating its nuance and power in storytelling.
        </p>
      </div>
    </div>
  );
};

export default About;
