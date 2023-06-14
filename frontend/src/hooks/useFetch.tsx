import { useState, useEffect } from 'react';
import API from './api';

export type ApiResponse = {
  status: Number;
  data: any;
  error: any;
  loading: Boolean;
};

export const useFetch = (url: string, method : string = 'get' , payload : object = {} ): ApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      var apiResponse :any  = null;
      if(method === 'post'){
        apiResponse = await API.post(url, payload);
      }
      else if(method === 'patch'){
        apiResponse = await API.patch(url, payload);
      }
      else if(method === 'delete'){
        apiResponse = await API.delete(url);
      }
      else{
        apiResponse = await API.get(url);
      }



      setStatus(apiResponse.status);
      setData(apiResponse.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, data, error, loading };
};