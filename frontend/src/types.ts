export interface User {
  user_id: string;
  name: string
  email: string;
  role: "admin" | "user";
}

export interface AuthInitialState {
  auth: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
//   loading: boolean;
//   set_auth_loading?: (value: boolean) => void;
//   login?: (user: User) => void;
//   session_expire?: (initialState: AuthInitialState) => void;
//   forgotPasswordEmail?: string;
//   setForgotPasswordEmail?: (value: string) => void;
}
