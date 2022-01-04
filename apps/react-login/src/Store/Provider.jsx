import React from 'react'
import useStorage from 'utils/useStorage'
import Context from './Context'

const StoreProvider = ({ children }) => {
  const [ token, setToken ] = useStorage('token')

  const contextValue = { token, setToken }
  return (
    <Context.Provider
      value={contextValue}
    >
    {children}
    </Context.Provider>
  )
}

export default StoreProvider