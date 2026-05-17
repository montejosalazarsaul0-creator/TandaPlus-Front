export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  session: Session;
}
export interface Session {
  access_token: string;
  refresh_token: string;
}