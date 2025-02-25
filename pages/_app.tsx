import '@/styles/home.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Eid Mubarak</title>
        <meta
          name='description'
          content='Celebrate Eid with a magical touch!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/moon.ico' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
