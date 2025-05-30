
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const apiService = {
  async startInterview() {
    const response = await axios.get(`${API_BASE_URL}/interview/start`);
    console.log("Interview started:", response.data);
    return response.data;
  },

  // async askQuestion(userResponse: string, state: any) {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     throw new Error('User not authenticated');
  //   }
  //   const response = await axios.post(`${API_BASE_URL}/interview/ask`,
  //   {
  //     user_response: userResponse,
  //     state: state
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     withCredentials: true
  //   }
  // );
  //   return response.data;
  // },

async askQuestion(audioBlob: Blob, state: any) {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const formData = new FormData();

  // 👇 Stringify the state object to send as form field
  formData.append('request_str', JSON.stringify({
  user_response: "",  // placeholder, gets replaced by STT
  state: state
}));

  if (!(audioBlob instanceof Blob)) {
  throw new Error('audioBlob is not a Blob');
}

  // 👇 Ensure audioBlob is actually a Blob and append
  formData.append('file', audioBlob, 'audio.webm');

  console.log('audioBlob:', audioBlob, 'is Blob:', audioBlob instanceof Blob);
  console.log('formData:', formData.get('request_str'), formData.get('file'));

  const response = await axios.post(`${API_BASE_URL}/interview/ask`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // No need to set Content-Type, browser handles it with proper multipart/form-data boundary
    },
    withCredentials: true,
  });
  return response.data;
},

  async speechToText(audioBlob: Blob) {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    formData.append('file', audioBlob, 'audio.webm');
    const response = await axios.post(`${API_BASE_URL}/audio/stt`,  
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    console.log("Speech to text response:", response.data);
    return response.data;
  },

  async textToSpeech(text: string) {
    const response = await axios.post(`${API_BASE_URL}/audio/tts`, { text }, { responseType: 'blob', withCredentials: true });
    return new Blob([response.data], { type: 'audio/wav' });
  }
};


