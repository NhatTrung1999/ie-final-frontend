import { Route, Routes } from 'react-router'
import { CycleTimePage, LoginPage } from '../pages'

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<CycleTimePage />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes