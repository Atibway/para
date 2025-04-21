import React, { createContext } from 'react'
import { userTypes } from '../AuthProvider'

type InitialValuesProps = {
    userData?: userTypes
    setUserData: React.Dispatch<React.SetStateAction<undefined | userTypes>>
  }

const InitialValues:InitialValuesProps = {
    userData:  undefined, // Now optional, no error
    setUserData:  () => undefined
  }
export const UserContext = createContext(InitialValues)
