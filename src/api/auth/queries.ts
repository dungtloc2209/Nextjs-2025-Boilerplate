import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from './requests';
import type { GetUserInfoRequest } from './types';

export const useGetUserInfo = (params: GetUserInfoRequest) => {
  return useQuery({
    queryKey: ['/auth/user-info'],
    queryFn: () => getUserInfo(params),
    enabled: !!params.token,
  });
};
