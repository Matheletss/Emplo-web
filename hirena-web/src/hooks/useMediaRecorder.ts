import { useState, useRef } from 'react';

export const useMediaRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async (onComplete: (audioBlob: Blob) => void) => {
    try {
      if (isRecording) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
     mediaRecorder.onstop = () => {
  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); // use webm for compatibility
  console.log("📦 audioBlob created:", audioBlob);
  console.log("✅ audioBlob instanceof Blob:", audioBlob instanceof Blob);
  console.log("🧪 audioBlob type:", audioBlob.type);

  onComplete(audioBlob);
  setIsRecording(false);

  // Clean up stream
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
  }
};
      
      setIsRecording(true);
      mediaRecorder.start();
      
      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 30000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};
