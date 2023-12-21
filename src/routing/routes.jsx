import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { Dashboard } from '../Website/pages/Dashboard/dashboard'
// import { ManageUser } from '../Website/pages/Users/manageUser'
// import { ManageReportedUser } from '../Website/pages/ReportedUser/manageReportedUser'
// import { AddTopics } from '../Website/pages/Topics/addTopics'
// import { ManageTopics } from '../Website/pages/Topics/manageTopics'
// import { Services } from '../Website/pages/Services/services'
import { Profile } from '../Website/pages/UserProfile.jsx/profile'
import { Faqs } from '../Website/pages/Polices/faqs'
// import { AdminManagement } from '../Website/pages/Admin/adminManagement'
import { Layout } from '../Website/layout'
// import { AddAdmin } from '../Website/pages/Admin/addAdmin'
// import { UpdateTopics } from '../Website/pages/Topics/updateTopic'
// import { UpdateAdmin } from '../Website/pages/Admin/updateAdmin'
// import { AddHospital } from '../Website/pages/Hospital/addHospital'
// import { HospitalManage } from '../Website/pages/Hospital/hospitalManage'
// import { UserManage } from '../Website/pages/User/userManage'
// import { UpdateHospital } from '../Website/pages/Hospital/updateHospital'
// import { Login } from '../Website/pages/registration/login'
import TokenService from '../services/tokenService'
import { AdminService } from '../services/admin'
import { Receptionist } from '../Website/pages/receptionist/receptionist'
import { AddHistory } from '../Website/pages/medicalHistory/addHistory'
import { ManageHistory } from '../Website/pages/medicalHistory/manageHistory'
import { UpdateHistory } from '../Website/pages/medicalHistory/updateReceptionist'
import { AllDoctor } from '../Website/pages/doctor/doctor'

export const ExternalRoutes = () => {

    const { getUserCookie } = TokenService();
    const { getSingleAdmin } = AdminService();
    let userId = getUserCookie()
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        if (userId) {
            getSingleAdmin(userId).then((res) => {
                console.log(res.data.data, 'response routeesss');
                setUserObject(res?.data?.admin)
            }).catch((err) => {
                console.log(err, 'err');
            })
        }
    }, [userId])

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.RECEPTIONIST} element={<Receptionist />} />
                <Route path={ROUTES.ADD_HISTORY} element={<AddHistory />} />
                <Route path={ROUTES.MANAGE_HISTORY} element={<ManageHistory />} />
                <Route path={ROUTES.ALL_DOCTOR} element={<AllDoctor />} />
                <Route path={`${ROUTES.UPDATE_HISTORY}/:userId`} element={<UpdateHistory />} />
                <Route path={ROUTES.FAQS} element={<Faqs />} />
                <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Route>
        </Routes>
    )
}
