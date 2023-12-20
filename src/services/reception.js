import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const ReceptionistService = () => {

  const { baseUrl } = Base();
  const { axiosInstance } = AxiosSettings()

  const getUserAllDetails = (id) => {
    return axiosInstance.get(`${baseUrl}/medical-history/${id}`);
  }
  const postMedicalHistory = (data) => {
    return axiosInstance.post(`${baseUrl}/create-medicalhistory`, data);
  }

  return { getUserAllDetails, postMedicalHistory }
}
