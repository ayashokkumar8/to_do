import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './privateRoutes';
import InnerContent from './InnerContent';
import PageNotFoundComponent from 'pages/PageNotFoundComponent';
import LoginPageComponent from 'pages/LoginPageComponent';
import RegisterPageComponent from 'pages/RegisterPageComponent';
import TodoPageComponent from 'pages/TodoPageComponent';

const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<PrivateRoutes />}>
                <Route path="/" element={<InnerContent />}>
                    <Route path="/" element={<Navigate replace to="home" />} />
                    <Route path="/home" element={<TodoPageComponent />} />
                </Route>
            </Route>
            {/* <Route path="/" element={<PublicRoutes />}>
                <Route path="/" element={<InnerContent />}>
                    {routePublic.map(route => {
                        return (
                            <Route key={route.path} path={route.path} element={route.element} />
                        )
                    })}
                </Route>
            </Route> */}
            <Route path="/register" element={<RegisterPageComponent />} />
            <Route path="/login" element={<LoginPageComponent />} />
            <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
    )
}

export default MainRoutes;
