import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom'
import StoreContext from 'Store/Context'

const PrivateRoute = ({ children }) => {
  const { token } = useContext(StoreContext)
  return (token ? children : <Navigate to="/login" />)
}

export default PrivateRoute