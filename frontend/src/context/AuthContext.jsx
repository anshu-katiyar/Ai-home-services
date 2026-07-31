import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const login = (token, role, email, fullName) => {

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    localStorage.setItem("fullName", fullName);

    setToken(token);
    setRole(role);
    setEmail(email);
    setFullName(fullName);
};
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");

        setToken(null);
        setRole(null);
        setEmail(null);
        setFullName(null);

    };


    const [email, setEmail] = useState(
    localStorage.getItem("email")
);

const [fullName, setFullName] = useState(
    localStorage.getItem("fullName")
);

    return (

        <AuthContext.Provider
            value={{
                token,
                role,
                email,
                fullName,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);