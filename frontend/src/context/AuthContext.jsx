import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verify token or load user profile on mount
        const loadUser = async () => {
            if (token) {
                try {
                    // Assuming there's a profile endpoint to get user details
                    // Swagger has /profile for GET
                    const response = await api.get("/profile");
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to load user", error);
                    if (error.response && error.response.status === 401) {
                        logout();
                    }
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            // Expecting { token: "...", user: { ... } } or similar
            // Swagger says 200 OK. Let's assume response body has token.
            const { token } = response.data;
            localStorage.setItem("token", token);
            setToken(token);

            // Optionally fetch profile immediately
            const profileResponse = await api.get("/profile");
            setUser(profileResponse.data);

            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await api.post("/register", userData);
            // Auto login or redirect to login? 
            // Plan implies redirect to login or auto-login.
            // Usually register returns 201 Created.
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.location.href = "/";
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
