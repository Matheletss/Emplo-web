
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface InterviewState {
  status?: 'pending' | 'in_progress' | 'finished';
  [key: string]: any;
}
