import '@/styles/home.css';
import '@/styles/message.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const themeKey = 'theme';
    const availableThemes = [
      'theme-purple',
      'theme-teal',
      'theme-gold',
      'theme-rose',
    ];

    let theme = window.sessionStorage.getItem(themeKey);

    if (!theme || !availableThemes.includes(theme)) {
      const randomIndex = Math.floor(Math.random() * availableThemes.length);
      theme = availableThemes[randomIndex];
      window.sessionStorage.setItem(themeKey, theme);
    }

    document.body.classList.remove(...availableThemes);
    if (theme) {
      document.body.classList.add(theme);
    }
  }, []);

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
      <Component {...pageProps} />
    </>
  );
}
