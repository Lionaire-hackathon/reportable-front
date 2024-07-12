import useSWR, { mutate } from 'swr';
import { getCookie } from 'cookies-next';
import axiosClient from '../axiosClient';

const useMe = (options = {}) => {
  const fetcher = async () => {
    const hasAccessToken = getCookie('accessToken');
    if (!hasAccessToken) return null;
    const response = await axiosClient.get('/auth/verify');
    return response.data;
  };

  const { data: me, mutate: mutateMe, isValidating: isLoadingMe } = useSWR('/auth/verify', fetcher, {
    ...options,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const resetMedata = () => {
    mutate('/auth/verify', null, false);
  };

  return {
    me,
    mutateMe,
    isLoadingMe,
    resetMedata,
  };
};

export default useMe;
