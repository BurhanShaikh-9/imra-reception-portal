import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const DashboardService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
   
    const getSearchCount = (id) =>{
        return axiosInstance.get(`${baseUrl}/search-reception/${id}`);
    }
    const getCountRecep = (id) =>{
        return axiosInstance.get(`${baseUrl}/count-reception/${id}`);
    }
   
  return {getCountRecep, getSearchCount}
}
