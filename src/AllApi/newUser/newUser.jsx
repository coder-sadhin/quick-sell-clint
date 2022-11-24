
const addUser = (user) => {
    fetch('http://localhost:5000/addUsers', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
}



export default addUser;