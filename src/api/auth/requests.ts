import { axiosInstance } from '@/lib/axios';
import type { GetUserInfoRequest, SignInRequest, SignInResponse, UserInfoResponse } from './types';

export const signIn = async (params: SignInRequest): Promise<SignInResponse> => {
  const { data } = await axiosInstance({
    url: '/auth/sign-in',
    method: 'POST',
    data: params,
  });

  return data;
};

export const getUserInfo = async (params: GetUserInfoRequest): Promise<UserInfoResponse> => {
  const { data } = await axiosInstance({
    url: '/auth/user-info',
    method: 'GET',
    params,
  });

  return data;
};
