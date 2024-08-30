export interface User {
  user_id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthInitialState {
  auth: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RegisterFunc {
  (name: string, email: string, password: string): void;
}
