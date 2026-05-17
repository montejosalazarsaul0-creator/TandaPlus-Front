import { api } from "./api";
import { LoginRequest, LoginResponse } from "../types/auth";

/* ===============================
LOGIN
=============================== */

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {

  const response = await api.post(
    "/api/auth/login",
    data
  );

  return response.data;

};


/* ===============================
REGISTER
=============================== */

export const register = async (data: any) => {

  const response = await api.post(
    "/api/auth/register",
    data
  );

  return response.data;

};


/* ===============================
PROFILE
=============================== */

export const getProfile = async () => {

  const response = await api.get(
    "/api/auth/profile/me"
  );

  return response.data;

};