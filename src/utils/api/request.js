

export const request = (url, optiosns) => fetch(url, optiosns)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response
    })
    .then(response => response.json())