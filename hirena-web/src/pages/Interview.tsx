import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaRecorder } from '@/hooks/useMediaRecorder';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { apiService } from '@/services/api';
import { ConversationMessage, InterviewState } from '@/types/interview';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [transcript, setTranscript] = useState('');
  const [canSpeak, setCanSpeak] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [interviewState, setInterviewState] = useState<InterviewState | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(() => {
    const saved = localStorage.getItem('isVideoEnabled');
    return saved === null ? false : saved === 'true';
  });
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string>("");

// Reset interview state
  const resetInterview = () => {
    setHasStarted(false);
    setConversation([]);
    setInterviewState(null);
    setQuestion('');
    setTranscript('');
    setCanSpeak(false);
    setLoading(false);
    localStorage.removeItem('conversation');
    localStorage.removeItem('interviewState');
    localStorage.removeItem('hasStarted');
};

  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isRecording, startRecording } = useMediaRecorder();
  const { speak } = useTextToSpeech();

  // Update isVideoEnabled in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isVideoEnabled', isVideoEnabled.toString());
  }, [isVideoEnabled]);

  useEffect(() => {
    // Only start/stop video based on isVideoEnabled
    if (isVideoEnabled) {
      startVideo();
    } else {
      stopVideo();
    }
    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoEnabled]);

  const startVideo = async () => {
    try {
      console.log("Starting video stream...");
      const videoStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      console.log("Video stream obtained:", videoStream);
      setStream(videoStream);
      setIsVideoEnabled(true);
      setError("");
      
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        console.log("Video stream assigned to video element");
      }
    } catch (err) {
      console.error("Video access error:", err);
      setError(`Failed to access camera: ${err}`);
      setIsVideoEnabled(false);
    }
  };


  const stopVideo = () => {
    console.log("Stopping video stream...");
    if (stream) {
      stream.getTracks().forEach((track) => {
        console.log("Stopping track:", track);
        track.stop();
      });
    }
    setStream(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    // Do NOT setIsVideoEnabled(false) here!
  };

  const toggleVideo = async () => {
    if (isVideoEnabled) {
      stopVideo();
      setIsVideoEnabled(false); // Only here!
    } else {
      await startVideo();
      setIsVideoEnabled(true); // Only here!
    }
  };

   useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startInterview = async () => {
    try {
      const data = await apiService.startInterview();
      const greeting = data.greeting;
      const state = data.state;
      setInterviewState(state);
      setQuestion(greeting);
      setHasStarted(true);
      setConversation([{ role: 'assistant', content: greeting, timestamp: new Date() }]);
      if (speak) {
        await speak(greeting);
      }
      setCanSpeak(true);
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  const handleRecording = async () => {
    if (!canSpeak) return;

    await startRecording(async (audioBlob) => {
       setLoading(true);
    try {
      const sttData = await apiService.speechToText(audioBlob);
      const userText = typeof sttData.transcript.transcript === 'string' ? sttData.transcript.transcript : JSON.stringify(sttData.transcript.transcript);
      console.log('STT Result:', sttData);
      console.log('User Text:', userText);
      setTranscript(userText);

      // Pass audioBlob, not userText!
      const askData = await apiService.askQuestion(audioBlob, interviewState);
      const nextQ = askData.question;
      setInterviewState(askData.state);
      setQuestion(nextQ);

      console.log('sttData:', sttData);
      console.log('typeof sttData.transcript:', typeof sttData.transcript, sttData.transcript);

      setConversation(prev => [
        ...prev,
        { role: 'user', content: userText, timestamp: new Date() },
        { role: 'assistant', content: nextQ, timestamp: new Date() }
      ]);

      setCanSpeak(false);
      if (speak) {
        await speak(nextQ);
      }
      setTimeout(() => setCanSpeak(true), 2000);
    } catch (err) {
      console.error('STT or interview ask error:', err);
    } finally {
      setLoading(false);
      }
    });
  };

useEffect(() => {
  const savedConversation = localStorage.getItem('conversation');
  const savedState = localStorage.getItem('interviewState');
  const savedStarted = localStorage.getItem('hasStarted');

  if (savedConversation) {
    try {
      const parsed = JSON.parse(savedConversation).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setConversation(parsed);
    } catch (err) {
      console.error("Error parsing conversation from localStorage", err);
    }
  }

  if (savedState) {
    try {
      setInterviewState(JSON.parse(savedState));
    } catch (err) {
      console.error("Error parsing interview state from localStorage", err);
    }
  }

  if (savedStarted === 'true') {
    setHasStarted(true);
  let lastAssistantMsg = null;
  if (savedConversation) {
    try {
      const parsed = JSON.parse(savedConversation);
      lastAssistantMsg = parsed.slice().reverse().find((msg: any) => msg.role === 'assistant');
    } catch (err) {
      console.error("Error parsing conversation for last assistant message", err);
    }
  }
  if (lastAssistantMsg) setQuestion(lastAssistantMsg.content);
  setCanSpeak(true);
  }
}, []);

useEffect(() => {
  localStorage.setItem('conversation', JSON.stringify(conversation));
}, [conversation]);

// Save interviewState and hasStarted whenever they change
useEffect(() => {
  if (interviewState) {
    localStorage.setItem('interviewState', JSON.stringify(interviewState));
  }
  localStorage.setItem('hasStarted', hasStarted.toString());
}, [interviewState, hasStarted]);

useEffect(() => {
  console.log('interviewState:', interviewState);
}, [interviewState]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-warm-100 to-warm-200 flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-warm-900 mb-2">AI Interview Practice</h1>
          <p className="text-warm-700 text-lg">Practice your interview skills with our AI-powered platform</p>
        </div>

        {/* Video Container */}
        <div className="relative mb-12">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-80 h-60 bg-gray-200 rounded-lg border-2 ${
              isVideoEnabled ? 'border-green-500' : 'border-gray-300'
            }`}
            style={{ transform: 'scaleX(-1)' }} // Mirror the video like a selfie camera
          />

          {!isVideoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <VideoOff className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button
              onClick={toggleVideo}
              className={`flex items-center space-x-2 ${
                isVideoEnabled 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isVideoEnabled ? (
                <>
                  <VideoOff className="w-4 h-4" />
                  <span>Stop Video</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span>Start Video</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}

        {/* Interview Controls */}
        <Card className="bg-white/90 backdrop-blur-sm border-warm-200 shadow-xl max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            {!hasStarted ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-warm-900">
                    Ready to Practice?
                  </h2>
                  <p className="text-warm-700">
                    Our AI interviewer will guide you through a realistic interview experience
                  </p>
                </div>
                <Button
                  onClick={startInterview}
                  className="bg-warm-600 hover:bg-warm-700 text-white px-8 py-3 rounded-xl font-medium"
                >
                  <Play className="mr-2" size={16} />
                  Start Interview
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-warm-600 mb-3 font-medium">Current Question</p>
                  <div className="bg-warm-50 p-6 rounded-xl border border-warm-200">
                    <p className="text-warm-900 text-lg leading-relaxed">{question}</p>
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-warm-600"></div>
                    <p className="text-warm-700">Processing your response...</p>
                  </div>
                )}

                <Button
                  onClick={handleRecording}
                  disabled={!canSpeak || isRecording || loading}
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                    canSpeak && !loading && !isRecording 
                      ? 'bg-warm-600 hover:bg-warm-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-warm-300 cursor-not-allowed text-warm-500'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="mr-2 animate-pulse" size={18} />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2" size={18} />
                      Tap to Speak
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conversation Sidebar */}
      <div className="w-96 h-screen bg-white/80 backdrop-blur-sm border-l border-orange-200 flex flex-col">
        <Card className="h-full bg-transparent border-0 flex flex-col">
          <CardHeader className="border-b border-orange-200 flex-shrink-0">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              Conversation History
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      message.role === 'user'
                        ? 'bg-orange-100 border border-orange-200 ml-4'
                        : 'bg-orange-600 text-white mr-4'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium ${
                        message.role === 'user' ? 'text-orange-700' : 'text-orange-200'
                      }`}>
                        {message.role === 'user' ? 'You' : 'AI Interviewer'}
                      </span>
                      <span className={`text-xs ${
                        message.role === 'user' ? 'text-orange-500' : 'text-orange-300'
                      }`}>
                        {message.timestamp?.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user' ? 'text-orange-800' : 'text-white'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                ))}
                
                {/* Placeholder for empty conversation */}
                {conversation.length === 0 && hasStarted && (
                  <div className="text-center text-gray-500 mt-12">
                    <p>Your conversation will appear here</p>
                  </div>
                )}
                
                {!hasStarted && (
                  <div className="text-center text-gray-500 mt-12">
                    <p>Start the interview to see the conversation</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Reset Button - Fixed at bottom */}
            <div className="p-6 border-t border-orange-200 flex-shrink-0">
              <Button
                onClick={resetInterview}
                // disabled={interviewState?.status !== 'finished'}
                className={`w-full px-6 py-2 rounded-xl font-medium transition-all ${
                  interviewState?.status === 'finished'
                    ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reset Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;