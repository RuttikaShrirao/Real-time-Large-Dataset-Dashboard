"use client"
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { LoginForm } from './login/LoginForm';


export default function Homev2() {
   useEffect(() => {
    const socket = io('http://localhost:5000');   
    socket.on('updateData', (data) => {
      console.log('Received real-time data:', data);
      // Update state here to reflect in the UI
    });
    return () => socket.disconnect();
  }, []);
  return (
    <main>

      <LoginForm />
      {/* <Component {...pageProps} />; */}
    </main>
  );
}