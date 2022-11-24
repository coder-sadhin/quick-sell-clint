const CheckUserType = email => {
    return fetch(`http://localhost:5000/checkUserType?email=${email}`)
}

export default CheckUserType;