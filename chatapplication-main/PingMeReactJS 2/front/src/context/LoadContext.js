import React, { createContext, useContext, useState } from "react"

const LoadContext = createContext()

const LoadState = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [onLine, setOnLine] = useState(navigator.onLine)

    return (
        <LoadContext.Provider value={{ loading, setLoading, onLine, setOnLine }}>
            {children}
        </LoadContext.Provider>
    )
}

const useContextLoading = () => { return useContext(LoadContext) }

export { LoadContext, useContextLoading }

export default LoadState