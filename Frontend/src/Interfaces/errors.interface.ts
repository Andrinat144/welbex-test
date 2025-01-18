export interface ErrorMessage {
  error: { message: string };
}

export interface ValidationError {
  type: string;
  messages: string[];
}
