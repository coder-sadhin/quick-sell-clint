import { useState, useEffect } from "react";

const useSeller = email => {

    const [isSeller, setIsSeller] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/checkuser/type?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data === "seller") {
                        setIsSeller(true)
                        setUserLoading(false)
                    }
                });
        }
    }, [email])
    return [isSeller, userLoading];
}

export default useSeller;