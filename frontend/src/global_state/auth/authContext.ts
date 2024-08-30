"use client";

import { AuthInitialState } from "@/types";
import { createContext } from "react";

const authContext = createContext<AuthInitialState>({
  auth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
});

export default authContext;
