import { createContext, useEffect, useState } from "react";

const Authcontext = createContext();

export function authProvider({ childern }) {
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
        <Authcontext.Provider value={{ user, setUser, loading }}>
            {childern}
        </Authcontext.Provider>
    );
};

export default Authcontext;