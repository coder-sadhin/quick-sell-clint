import { useState, useEffect } from "react";

const useUserType = email => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/checkuser/type?email=${email}`)
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
                });
        }
    }, [email])
    return [isAdmin, isSeller, userLoading];
}

export default useUserType;