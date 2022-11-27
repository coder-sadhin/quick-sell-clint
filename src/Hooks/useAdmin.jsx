import { useState, useEffect } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://sell-dao-server.vercel.app/checkuser/type?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data === "admin") {
                        setIsAdmin(true)
                        setUserLoading(false)
                    }
                });
        }
    }, [email])
    return [isAdmin, userLoading];
};

export default useAdmin;