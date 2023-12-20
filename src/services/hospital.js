import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const HospitalService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
    const postAddHospital = (data) =>{
        return axiosInstance.post(`${baseUrl}/create-hospital`, data);
    }
    const getAllHospital = () =>{
        return axiosInstance.get(`${baseUrl}/all-hospitals`);
    }
    const getSingleHospital = (id) =>{
        return axiosInstance.get(`${baseUrl}/hospital/${id}`);
    }
    const patchUpdateHospital = (id, data) =>{
        return axiosInstance.patch(`${baseUrl}/update-hospital/${id}`, data);
    }
    const deleteSingleHospital = (id) =>{
        return axiosInstance.delete(`${baseUrl}/delete-hospital/${id}`);
    }

  return {postAddHospital, getAllHospital, getSingleHospital, patchUpdateHospital, deleteSingleHospital}
}
