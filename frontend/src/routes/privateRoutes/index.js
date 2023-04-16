import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const token = localStorage.getItem('Authorization')

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    token
      ? <Outlet />
      : <Navigate to="/" />

  )
}
