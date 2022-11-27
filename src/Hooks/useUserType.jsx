import { useState, useEffect } from "react";

const useUserType = email => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isUser, setIsUser] = useState(false);
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
                    else if (data === "seller") {
                        setIsSeller(true)
                        setUserLoading(false)
                    }
                    else {
                        setIsUser(true)
                        setUserLoading(false)
                    }
                });
        }
    }, [email])
    return [isAdmin, isSeller, isUser, userLoading];
}

export default useUserType;