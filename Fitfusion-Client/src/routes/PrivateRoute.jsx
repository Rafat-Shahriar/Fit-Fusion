
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p>Loading.....</p>
  if (user) return children

  return <Navigate to='/signin' state={location.pathname} replace={true} />
}

export default PrivateRoute