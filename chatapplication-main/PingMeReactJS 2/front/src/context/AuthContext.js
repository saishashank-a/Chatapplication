import React,{createContext, useContext, useEffect, useState} from "react"
import getData from "../utils/postData"
const AuthContext = createContext()
export default AuthContext
const AuthState = ({ children }) => {

    const [user,setUser] = useState({})
    
    useEffect(()=>{
        const setCredentials = async ()=>{
            const jwt = localStorage.getItem('jwt')
            if(jwt){
                const userData = await getData('POST',`user`,{jwt})
                setUser(userData)
            }
        }
        setCredentials()
    },[])
        
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
const useContextState = ()=>{ return useContext(AuthContext)}
export {useContextState}
export {AuthState}