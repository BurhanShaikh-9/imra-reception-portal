// import React, { useState } from 'react';
// import { UserService } from '../../../services/user';
// import { ReceptionistService } from '../../../services/reception';
// import Loader from '../../components/loader';
// import { toast } from 'react-toastify';
// import { IoIosSearch } from "react-icons/io";
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../../../utils/routes';


// export const Receptionist = () => {
//     const [getUserId, setGetUserId] = useState();
//     const { getUserAllDetails } = ReceptionistService();
//     const { getSingleUser } = UserService();
//     const [isLoading, setIsLoading] = useState(false);
//     const [isShowDetails, setIsShowDetails] = useState(false);

//     const [userHistory, setUserHistory] = useState([]);
//     const [userDetails, setUserDetails] = useState({});
//     const onFormSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         // getUserAllDetails('654a08cf3a690fc1fb950455').then((res) => {
//         getSingleUser(getUserId).then((res) => {
//             // console.log(res.data, 'daaa');
//             const response = res?.data?.data;
//             setUserHistory(response);
//             // console.log(response, 'response');
//             setIsShowDetails(true);
//             getUserAllDetails(response._id).then((res) => {
//                 const userResponse = res.data.data;

//                 setUserDetails(userResponse);
//                 // console.log(userResponse, 'userResponse')
//                 toast.success('User Found');
//             }).catch((res) => {
//                 console.log("error", res);
//             }).finally(() => {
//                 setIsLoading(false);
//             });
//         }).catch((res) => {
//             toast.error('User Not Found');
//             console.log(res, 'error');
//         });
//     };

//     return (
//         <React.Fragment>


//             <section className="mainSection">
//                 <div className="container">
//                     <div className="mainSectionWrapper">
//                         <div className="heading">
//                             <p>Receptionist </p>
//                         </div>
//                         <div className="card cardForm">
//                             <div className="card-body">

//                                 <form className="additionForm" onSubmit={onFormSubmit}>
//                                     <div className="row g-4 justify-content-center">


//                                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
//                                             <div className="fields marginBottomFields">
//                                                 <label>User ID</label>
//                                                 <div className='inputDivAbsolute'>
//                                                     <input type="text" placeholder="Enter User ID..." onChange={(e) => setGetUserId(e.target.value)} />
//                                                     <button type="Submit">
//                                                         Find
//                                                         <IoIosSearch />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>

//                         {isShowDetails &&
//                             <div className="card cardForm marginCardTop">
//                                 <div className="card-body">
//                                     {isLoading ?

//                                         <Loader />
//                                         :
//                                         <React.Fragment>

//                                             <div className="heading">
//                                                 <p>User Details </p>
//                                             </div>
//                                             <div className='receptionistUserDetails'>
//                                                 <img className='userImage' src={userHistory.avatar} alt="" />
//                                                 <div className="userPersonalWrapper">

//                                                     <div>
//                                                         <span className='userTitle'>FullName :</span> <span>{userHistory.fullname}</span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>Phone Number :</span> <span>{userHistory.phonenumber}</span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>Email :</span> <span>{userHistory.email}</span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>
//                                                             Address :
//                                                         </span>  <span>
//                                                             {userHistory.address}
//                                                         </span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>
//                                                             Country :
//                                                         </span> <span>
//                                                             {userHistory.country}
//                                                         </span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>
//                                                             Date of Birth :
//                                                         </span> <span>
//                                                             {userHistory.date_of_birth}
//                                                         </span>
//                                                     </div>
//                                                     <div>
//                                                         <span className='userTitle'>
//                                                             Medical History :
//                                                         </span>
//                                                         <Link className='userButton' to={`/${ROUTES.UPDATE_HISTORY}/${getUserId}`}>
//                                                             Add Record
//                                                         </Link>



//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="heading marginCardTop">
//                                                 <p>User History </p>
//                                             </div>
//                                             {/* {
//                                     console.log(userDetails.length, 'userrasf')
//                                 } */}
//                                             {userDetails.length > 0 ?

//                                                 <React.Fragment>
//                                                     {userDetails.map((item, keyId) => (
//                                                         <div className="card cardForm marginCardHalfTop" key={keyId}>
//                                                             <div className="card-body">
//                                                                 <div className='receptionistUserDetails'>
//                                                                     <div className="userPersonalWrapper">
//                                                                         <div>
//                                                                             <span className='userTitle'>
//                                                                                 Medical Center :
//                                                                             </span> <span>
//                                                                                 {item.medCenter}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Procedure :
//                                                                             </span> <span>
//                                                                                 {item.procedure}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Reason :
//                                                                             </span> <span>
//                                                                                 {item.reason}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Dieases :
//                                                                             </span> <span>
//                                                                                 {item.dieases}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Fees :
//                                                                             </span>
//                                                                             <span>
//                                                                                 {item.fees}
//                                                                             </span>
//                                                                             <span>
//                                                                                 PKR
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Prescribtion :
//                                                                             </span> <span>
//                                                                                 {item.prescribed}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Test :
//                                                                             </span> <span>
//                                                                                 {item.test}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Doctor Name :
//                                                                             </span> <span>
//                                                                                 {item.doctor_name}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Date :
//                                                                             </span> <span>
//                                                                                 {item.date}
//                                                                             </span>
//                                                                         </div>
//                                                                         <div key={keyId}>
//                                                                             <span className='userTitle'>
//                                                                                 Patient Name :
//                                                                             </span> <span>
//                                                                                 {item.patientName}
//                                                                             </span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </React.Fragment>
//                                                 :
//                                                 <div className="">
//                                                     <p>No History Found </p>
//                                                 </div>}

//                                         </React.Fragment>}

//                                 </div>
//                             </div>}

//                     </div>
//                 </div>
//             </section>

//         </React.Fragment>
//     );
// };
