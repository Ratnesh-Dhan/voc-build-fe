import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="vocbuild"
        description="VocBuild offers a comprehensive online dictionary where each word is accompanied by its
      definition and most distinctively, references from popular movies. These references
      include: Movie Clips: Short snippets from films showing the word in use, helping to
      understand its context and usage. Quotes: Iconic lines from movies where the word is
      featured, enhancing memorability. This approach not only helps in understanding the
      meaning of the word but also in appreciating its nuance and power in storytelling."
        openGraph={{
          url: 'https://www.vocbuild.com',
          title: 'vocbuild',
          description:
            'VocBuild offers a comprehensive online dictionary where each word is accompanied by its definition and references from popular movies by movie clips',
          images: [
            {
              url: 'https://vocbuild.com/vocBuild.jpg',
              width: 800,
              height: 600,
              alt: 'vocbuild',
            },
          ],
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
