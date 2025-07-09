export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface GetUserInfoRequest {
  token: string;
}

export interface UserInfoResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
}
