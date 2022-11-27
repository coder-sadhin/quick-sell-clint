
const addUser = (user) => {
    fetch('https://sell-dao-server.vercel.app/addUsers', {
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