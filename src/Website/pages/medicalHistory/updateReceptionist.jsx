import React, { useState, useEffect } from 'react'
import profilePic from '../../../assets/images/guy.png'
import { HospitalService } from '../../../services/hospital';
import { useParams } from 'react-router-dom';
import { DoctorService } from '../../../services/doctor';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { UserService } from '../../../services/user';
import { ReceptionistService } from '../../../services/reception';


export const UpdateHistory = () => {
    const { userId } = useParams();
    const { postMedicalHistory } = ReceptionistService();
    const { getSingleUser } = UserService();


    const [userData, setUserData] = useState({
        procedure: '',
        reason: '',
        medCenter: '',
        patientNo: '',
        patientName: '',
        dieases: '',
        test: '',
        fees: '',
        prescribed: '',
        doctor_name: ''
    })
    // console.log(userData, 'usedddd');

    const [isLoading, setIsLoading] = useState(false)

    const onChangeDoctor = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const currentData = new Date()
        const day = currentData.getDate();
        const month = currentData.getMonth() + 1;
        const year = currentData.getFullYear();
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;


        const formData = new FormData();
        formData.set('userId', userId);
        formData.set('patientNo', userId);
        formData.set('date', formattedDate);
        formData.set('procedure', userData.procedure);
        formData.set('reason', userData.reason);
        formData.set('medCenter', userData.medCenter);
        formData.set('patientName', userData.patientName);
        formData.set('dieases', userData.dieases);
        formData.set('test', userData.test);
        formData.set('fees', userData.fees);
        formData.set('prescribed', userData.prescribed);
        formData.set('doctor_name', userData.doctor_name);
        const apiData = {
            userId: userId,
            patientId: userId,
            date: formattedDate,
            procedure: userData.procedure,
            reason: userData.reason,
            medCenter: userData.medCenter,
            patientName: userData.patientName,
            dieases: userData.dieases,
            test: userData.test,
            fees: userData.fees,
            prescribed: userData.prescribed,
            doctor_name: userData.doctor_name,
        }

        console.log(apiData, 'formmm');
        // console.log({ ...userData, userId, patientNo: userId, date: formattedDate }, 'hosss');
        // const submitData = { ...userData, userId, patientNo: userId, date: formattedDate }

        postMedicalHistory(apiData).then((res) => {
            console.log(res, 'response');
            toast.success('Medical Record Added')
        }).catch((res) => {
            console.log(res, 'error');
            toast.error('Medical Record Failed to add')
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getSingleUser(userId).then((res) => {
            console.log(res.data, 'responseee');
            const userResponse = res?.data?.data?.fullname
            // const { __v, _id, ...newgetData } = res?.data?.data?.fullname
            // setUserData(newgetData)
            // console.log(newgetData)
            setUserData({ ...userData, patientName: userResponse })
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])
    return (
        <React.Fragment>

            <section className="mainSection">
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>Add Record</p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                {
                                    isLoading ?
                                        <Loader />
                                        :
                                        <form className="additionForm"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="row g-4">



                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Doctor Name</label>
                                                        <input type="text" id="doctorName" name="doctor_name" placeholder="Enter Doctor Name..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Note</label>
                                                        <input type="text" id="doctorName" name="reason" placeholder="Enter Note..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Disease</label>
                                                        <input type="text" id="doctorName" name="dieases" placeholder="Enter Disease"
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Prescription</label>
                                                        <input type="text" id="doctorName" name="prescribed" placeholder="Enter Prescription..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Test</label>
                                                        <input type="text" id="doctorName" name="test" placeholder='Enter Test...'
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Procedure</label>
                                                        <input type="text" id="doctorName" name="procedure" placeholder="Enter Procedure..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Fees</label>
                                                        <input type="number" id="doctorName" name="fees" placeholder="Enter Fees..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Medical Center</label>
                                                        <input type="text" id="doctorName" name="medCenter" placeholder="Enter Medical Center..."
                                                            onChange={onChangeDoctor}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type="Submit" >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
