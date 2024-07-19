import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie'; // Import js-cookie
import axiosClient from '../axiosClient';

const useMe = (options = {}) => {
  const fetcher = async () => {
    const hasAccessToken = Cookies.get('accessToken'); 
    if (!hasAccessToken) return null;
    const response = await axiosClient.get('/auth/verify');
    return response;
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

  const resetMeData = () => {
    mutate('/auth/verify', null, false);
  };
  
  return {
    me,
    mutateMe,
    isLoadingMe,
    resetMeData, // Fixed the typo in function name
  };
};

export default useMe;
