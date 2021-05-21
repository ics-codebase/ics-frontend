import React from 'react'
import { storesContext } from '../store/StoresContext'

export const useStores = () => React.useContext(storesContext)

