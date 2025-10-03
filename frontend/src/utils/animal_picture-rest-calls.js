import { FURRY_FRIENDS_BASE_URL } from './consts.js';

function status(response) {
    console.log('response status ' + response.status);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}

export function getAllAnimal_pictures() {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };
    const url = `${FURRY_FRIENDS_BASE_URL}/animal_pictures`;
    let request = new Request(url, myInit);

    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Request succeeded with JSON response', data);
            return data;
        })
        .catch(error => {
            console.log('Request failed', error);
            return Promise.reject(error);
        });
}

export function getPicturesByAnimalId(id) {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Construct the URL for fetching a specific animal's details by ID
    const url = `${FURRY_FRIENDS_BASE_URL}/animals_pictures/animal/${id}`;
    console.log(url);

    let request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Request succeeded with JSON response', data);
            return data;
        })
        .catch(error => {
            console.log('Request failed', error);
            return Promise.reject(error);
        });
}

export function addAnimal_picture(formData) {
    const url = `${FURRY_FRIENDS_BASE_URL}/animals_pictures/upload`;
    const myInit = {
        method: 'POST',
        body: formData
    };

    const request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Request succeeded with JSON response', data);
            return data;
        })
        .catch(error => {
            console.log('Request failed', error);
            return Promise.reject(error);
        });
}