import React, { useEffect, useRef, useState } from 'react';
import {  Caveat } from 'next/font/google';

const caveat = Caveat({
  weight: '400',
  variable: '--font-caveat',
  subsets: ['latin'],
});

const Message = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWidth = 500;
  const degIncrement = 3;

  const [messageData, setMessageData] = useState({
    destination: '',
    nama: '',
    message: '',
    note: '',
  });

  const getRotateDeg = (input: number) => {
    if (input < cardWidth * 0.33) {
      return `-${degIncrement * 3}deg`;
    } else if (input < cardWidth * 0.5) {
      return `-${degIncrement}deg`;
    } else if (input < cardWidth * 0.66) {
      return `${degIncrement}deg`;
    } else {
      return `${degIncrement * 3}deg`;
    }
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = getRotateDeg(event.clientY - rect.top);
    const rotateY = getRotateDeg(event.clientX - rect.left);

    cardRef.current.style.transform = `rotateX(${rotateX}) rotateY(${rotateY})`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'none';
    }
  };

  useEffect(() => {
    const getRandomId = async () => {
      try {
        const response = await fetch('/messages.json');
        const json = await response.json();
        const id = Math.floor(Math.random() * json.length);
        const name = sessionStorage.getItem('nama') || 'Guest';

        setMessageData({
          destination: `To: ${name}`,
          nama: `Dear ${name},`,
          message: json[id].message,
          note: json[id].note,
        });
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    getRandomId();
  }, []);

  return (
    <div className={`container-message ${caveat.variable}`}>
      <div
        ref={cardRef}
        className='card'
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <p>{messageData.destination}</p>
        <div>
          <p>{messageData.nama}</p>
          <p>{messageData.message}</p>
          <p>{messageData.note}</p>
        </div>
        <p>From: Fitri Ratna Dewi</p>
      </div>
    </div>
  );
};

export default Message;
