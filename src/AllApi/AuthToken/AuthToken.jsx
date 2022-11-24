export const setAuthToken = userData => {

    //   Save user in db & get token
    fetch('http://localhost:5000/user/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //Save token in LocalStorage
            localStorage.setItem('quicksellToken', data.token)
        })
}