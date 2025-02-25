import Image from 'next/image';
import imgSrc from '../assets/images/mountain.png';
import { Cinzel_Decorative } from 'next/font/google';
import Parallax from 'parallax-js';
import { KeyboardEvent, useEffect } from 'react';

const cinzelDecorative = Cinzel_Decorative({
  weight: '400',
  variable: '--font-cinzel-decorative',
  subsets: ['latin'],
});

export default function Home() {
  const openMessage = () => {
    const name = document.getElementById('name') as HTMLInputElement;
    if (name?.value) {
      sessionStorage.setItem('nama', name?.value);
      window.location.href = 'message';
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document?.getElementById('btn')?.click();
    }
  };

  useEffect(() => {
    const scene = document?.getElementById('scene');
    if (scene) new Parallax(scene);
  }, []);

  return (
    <main className={cinzelDecorative.variable}>
      <section>
        <div className='container'>
          <div id='scene'>
            <div className='layer'>
              <div id='stars'></div>
            </div>
            <div className='layer' data-depth-x='-0.15' data-depth-y='0.25'>
              <div className='moon'></div>
            </div>
            <div className='layer' data-depth-x='0.15'>
              <Image
                className='mountain'
                src={imgSrc}
                alt='mountain'
                priority
              />
            </div>
          </div>
        </div>
        <div className='login'>
          <h2>Eid Mubarak</h2>
          <p>May your Eid will be full of love, laughter, and light</p>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Your name'
              id='name'
              onKeyUp={(e) => handleEnter(e)}
            />
          </div>
          <div className='input-box'>
            <input
              type='submit'
              id='btn'
              value='Open Special Message'
              onClick={openMessage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
