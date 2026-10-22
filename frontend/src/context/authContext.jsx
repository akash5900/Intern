import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:3000/api/user/profile", {
                    credentials: "include"
                });

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();

                setUser(data.user)
            } catch (error) {
                console.error("Faild To Fetch User", error);
            } finally {
                setLoading(false);
            };
        };

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;