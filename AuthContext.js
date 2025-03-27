import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [userID, setUserID] =  useState(null)
    return (
        <AuthContext.Provider value={{userID, setUserID}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext)