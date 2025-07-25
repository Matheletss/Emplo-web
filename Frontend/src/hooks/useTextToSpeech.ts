
import { useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8000";

export const useTextToSpeech = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = async (text: string): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/audio/tts`,
        { text },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.oncanplaythrough = () =>
        audio.play().catch((err) => console.error('Playback error:', err));
    } catch (err) {
      console.error('TTS Error:', err);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  return {
    speak,
    stop
  };
};