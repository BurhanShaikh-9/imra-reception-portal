import React, { useState, useEffect } from 'react'
import profilePic from '../../../assets/images/guy.png'
import { HospitalService } from '../../../services/hospital';
import { DoctorService } from '../../../services/doctor';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';

export const AddHistory = () => {
    const { postAddDoctor } = DoctorService();
    const [isLoading, setIsLoading] = useState(false);
    const [doctorData, setDoctorData] = useState({
        name: '',
        image: '',
        email: '',
        phonenumber: '',
        pdmaid: '',
        experience: '',
        qualification: '',
    })

    const onChangeDoctor = (e) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.value })
    }
    const onChangeImage = (e) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.files[0] })
    }

    const onSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault()
        const formData = new FormData();
        formData.set('name', doctorData.name);
        formData.set('Image', doctorData.image);
        formData.set('email', doctorData.email);
        formData.set('phonenumber', doctorData.phonenumber);
        formData.set('pdmaid', doctorData.pdmaid);
        formData.set('experience', doctorData.experience);
        formData.set('qualification', doctorData.qualification);

        console.log(formData, 'hosss');

        postAddDoctor(formData).then((res) => {
            console.log(res, 'response');
            toast.success('Doctor Added')
        }).catch((res) => {
            toast.error('Doctor Failed to Add')
            console.log(res, 'error');
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <React.Fragment>

            <section className="mainSection">
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>ADD USER HISTORY</p>
                        </div>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className="card cardForm">
                                    <div className="card-body">

                                        <form className="additionForm"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img src={doctorData.image ? URL.createObjectURL(doctorData.image) : profilePic} alt="" />
                                                            {/* <img src={adminModel?.image ? URL.createObjectURL(adminModel.image) : profilePic} alt="" className="profileImage" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorImage">Image</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            name="image"
                                                            onChange={onChangeImage}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" id="doctorName" name="name" placeholder="Enter Name..."
                                                            onChange={onChangeDoctor} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Email</label>
                                                        <input type="email" id="doctorName" name="email" placeholder="Enter Email..."
                                                            onChange={onChangeDoctor} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Phone</label>
                                                        <input type="number" id="doctorName" name="phonenumber" placeholder="Enter Phone..."
                                                            onChange={onChangeDoctor} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">PDMA ID</label>
                                                        <input type="text" id="doctorName" name="pdmaid" placeholder="Enter Address..."
                                                            onChange={onChangeDoctor} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Experience</label>
                                                        <input type="text" id="doctorName" name="experience" placeholder="Enter Branch..."
                                                            onChange={onChangeDoctor} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Qualification</label>
                                                        <input type="text" id="doctorName" name="qualification" placeholder="Enter Branch..."
                                                            onChange={onChangeDoctor} required
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
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
