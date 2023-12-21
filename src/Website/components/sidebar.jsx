import React, { useContext, useEffect, useState } from 'react'
import logoImg from '../../assets/images/logo/Logo.png'
import { SidebarContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import { RxCross2, RxDashboard } from 'react-icons/rx';
import { HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlineClipboardDocument } from 'react-icons/hi2'
import { LiaUserSlashSolid } from 'react-icons/lia'
import { AiOutlineFolderAdd, AiOutlineUser } from 'react-icons/ai'
import { GiHospitalCross } from 'react-icons/gi'
import { RiHospitalLine } from 'react-icons/ri'
import { CgFileDocument } from 'react-icons/cg'
import { MdOutlineAdminPanelSettings, MdOutlineManageAccounts } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { FaUserNurse } from 'react-icons/fa'
import { FaUserDoctor } from "react-icons/fa6";
import { ROUTES } from '../../../utils/routes';
import TokenService from '../../services/tokenService';
import { AdminService } from '../../services/admin';
import { LiaNotesMedicalSolid, LiaBriefcaseMedicalSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import AuthService from '../../services/auth.service';

export const Sidebar = () => {


    const { sideBar, setSideBar } = useContext(SidebarContext)
    const closeButton = () => {
        setSideBar(!sideBar)
    }
    const { userLogout } = AuthService();
    const { getUserCookie } = TokenService();
    const { getSingleAdmin } = AdminService();
    let userId = getUserCookie()
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        if (userId) {
            getSingleAdmin(userId).then((res) => {
                setUserObject(res?.data?.admin)
                // console.log(res?.data?.data, 'userrr');
            }).catch((err) => {
                console.log(err, 'err');
            })
        }
    }, [userId])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <aside id="sidebar" className={sideBar ? 'sidebarwidth' : 'sidebar'}>
                <div className="sideBarInner">
                    <div className='aSideCloseButton'>
                        <button onClick={closeButton}><RxCross2 /></button>
                    </div>
                    <div className="LogoImage">
                        <Link to="" >
                            <img src={logoImg} alt="" />
                        </Link >
                    </div>

                    <ul className="sidebar-nav" id="sidebar-nav">

                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.DASHBOARD}>
                                <RxDashboard className='sideIcon' /><span>Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.RECEPTIONIST}>
                                <FaUserNurse className='sideIcon' /><span>Receptionist </span>
                            </NavLink>
                        </li>


                        {/* <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.ADD_HISTORY}>
                                <LiaNotesMedicalSolid className='sideIcon' /><span>Add User Medical</span>
                            </NavLink>
                        </li> */}

                        {/* <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.MANAGE_HISTORY}>
                                <LiaBriefcaseMedicalSolid className='sideIcon' /><span>User Medical</span>
                            </NavLink>
                        </li> */}

                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.PROFILE}>
                                <AiOutlineUser className='sideIcon' /><span>Profile</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.FAQS}>
                                <CgFileDocument className='sideIcon' /> <span>Faqs</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link  collapsed navItemButton" activeclassname="active" onClick={() => setModalIsOpen(true)} >
                                <IoIosLogOut className='sideIcon' /> <span>Logout</span>
                            </button>
                        </li>


                    </ul>
                </div>
            </aside>

            {modalIsOpen &&
                <dialog id='confirmationModal' className='modalMain' open>
                    <div className="modalMainInner">
                        <button className='modalMainCloseButton' onClick={() => setModalIsOpen(false)}><RxCross2 /></button>
                        <h3>Logout</h3>
                        <hr />
                        <div className='modalMainContent'>Are You Sure ?</div>
                        <hr />
                        <div className="modalGroupButtons">
                            <button className='modalGroupButtons1' onClick={userLogout}>Yes</button>
                            <button className='modalGroupButtons2' onClick={() => setModalIsOpen(false)}>No</button>
                        </div>
                    </div>
                </dialog>
            }
        </>
    )
}
