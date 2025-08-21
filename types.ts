export interface OllamaMessage {
    role: "system" | "user" | "assistant";
    content: string;
  }
  
  export interface OllamaResponse {
    model: string;
    created_at: string;
    message: OllamaMessage;
    done: boolean;
  }