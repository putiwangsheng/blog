import fetch from 'isomorphic-fetch';

export function getRequestInfo(url){
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(checkResponse)
            .then(data => {
                resolve(data);
            });
        });
}

function checkResponse(response){
    if(response.status >= 400){
        throw new Error("Bad response from server");
    }
    return response.json();
}
