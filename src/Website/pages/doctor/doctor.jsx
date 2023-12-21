import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { FiTrash } from 'react-icons/fi'
// import { AdminService } from '../../../----services/admin';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
// import { HospitalService } from '../../../services/hospital';
import { RxCross2 } from 'react-icons/rx';
import { HospitalService } from '../../../services/hospital';
import { ReceptionistService } from '../../../services/reception';
import TokenService from '../../../services/tokenService';
// import { ReceptionService } from '../../../services/receptionist';

export const AllDoctor = () => {
    const { getAllDoctor } = HospitalService();
    const { getSingleReception } = ReceptionistService()
    const { getUserCookie } = TokenService();
    const hospitalId = getUserCookie()

    const [data, setData] = useState([])
    useEffect(() => {
        fetchData()

    }, [])

    const fetchData = () => {
        getSingleReception(hospitalId).then((res) => {
            const hospitalIdRes = res?.data?.reception?.hospitalId
            console.log(res.data.reception.hospitalId, 'response');
            getAllDoctor(hospitalIdRes).then((res) => {
                setData(res?.data?.doctors)
                console.log(res?.data?.doctors, 'responseee')
            }).catch((res) => {
                console.log(res, 'error');
            })
        }).catch((err) => {
            console.log(err, 'error');
        })

    }

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data?.selected;
        setPageNumber(selectedPage);
    };
    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    const currentItems = data?.filter((item) => {
        if (searchTerm === '') {
            return item;
        } else if (
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteHospitalId, setDeleteReceptionId] = useState('')

    const onDeleteHospital = () => {
        deleteSingleReceptionist(deleteHospitalId).then((res) => {
            console.log(res, 'response');
            setModalIsOpen(false);
            fetchData()
        }).catch((res) => {
            console.log(res, 'response');
        })
    }

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                ALL DOCTORS
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch">
                                    {/* <div className="tableInnerHeading">
                            Physical Doctor
                        </div> */}
                                    <input type="text" placeholder="Search..."
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col">User Id</th> */}
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Qualification</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">PDMA</th>
                                                <th scope="col">Experience</th>
                                                {/* <th scope="col">Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentItems?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.qualification}</td>
                                                        <td>{item?.phonenumber}</td>
                                                        <td>{item?.pdmaid}</td>
                                                        <td>{item?.experience}</td>
                                                        {/* <td>
                                                            <div className="actionButtons">
                                                                <Link to={`/${ROUTES.UPDATE_RECEPTION}/${item._id}`}>
                                                                    <BiMessageSquareEdit />
                                                                </Link>
                                                                <Link onClick={() => { setModalIsOpen(true); setDeleteReceptionId(item._id) }}>
                                                                    <FiTrash />
                                                                </Link>
                                                            </div>

                                                        </td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {modalIsOpen &&
                <dialog id='confirmationModal' className='modalMain' open>
                    <div className="modalMainInner">
                        <button className='modalMainCloseButton' onClick={() => setModalIsOpen(false)}><RxCross2 /></button>
                        <h3>Confirmation</h3>
                        <hr />
                        <div className='modalMainContent'>Are You Sure ?</div>
                        <hr />
                        <div className="modalGroupButtons">
                            <button className='modalGroupButtons1' onClick={onDeleteHospital}>Yes</button>
                            <button className='modalGroupButtons2' onClick={() => setModalIsOpen(false)}>No</button>
                        </div>
                    </div>
                </dialog>
            }
        </React.Fragment>
    )
}
