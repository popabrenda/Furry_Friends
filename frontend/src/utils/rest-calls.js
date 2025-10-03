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

export function getAllUsers() {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };
    const url = `${FURRY_FRIENDS_BASE_URL}/users`;
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

export function signUp(user) {
    console.log('Inainte de fetch POST pentru sign-up');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let myInit = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(user)
    };
    const url = `${FURRY_FRIENDS_BASE_URL}/users/sign-up`;
    let request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Sign-up succeeded', data);
            return data;
        })
        .catch(error => {
            console.log('Sign-up failed', error);
            return Promise.reject(error);
        });
}

export function login(email, password) {
    console.log('Inainte de fetch POST pentru login');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.append('email', email);
    body.append('password', password);

    let myInit = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: body
    };
    const url = `${FURRY_FRIENDS_BASE_URL}/users/login`;
    let request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Login succeeded', data);
            return data;
        })
        .catch(error => {
            console.log('Login failed', error);
            return Promise.reject(error);
        });
}

// export function getAllAnimals() {
//     let headers = new Headers();
//     headers.append('Accept', 'application/json');
//
//     const myInit = {
//         method: 'GET',
//         headers: headers,
//         mode: 'cors'
//     };
//
//     const url = `${FURRY_FRIENDS_BASE_URL}/animals`;
//     const request = new Request(url, myInit);
//
//     return fetch(request)
//         .then(status)
//         .then(json)
//         .then(data => data)
//         .catch(error => Promise.reject(error));
// }


export function getAllAnimals() {
    // console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Folosește backticks (`) pentru a include variabila FURRY_FRIENDS_BASE_URL
    const url = `${FURRY_FRIENDS_BASE_URL}/animals`;
    console.log(url);

    let request = new Request(url, myInit);

    console.log('Inainte de fetch GET pentru ' + url);

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


export function addAnimal(animal) {
    console.log("Animal Data: ", animal); // Debugging: Afișează datele trimise

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const myInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(animal)
    };

    const url = `${FURRY_FRIENDS_BASE_URL}/animals/register-animal`;
    const request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => data)
        .catch(error => Promise.reject(error));
}

export function getAnimalById(id) {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Construct the URL for fetching a specific animal's details by ID
    const url = `${FURRY_FRIENDS_BASE_URL}/animals/${id}`;
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

// export function getUserProfilePicture(id) {
//     console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);
//
//     let headers = new Headers();
//     headers.append('Accept', 'application/json');
//
//     let myInit = {
//         method: 'GET',
//         headers: headers,
//         mode: 'cors'
//     };
//
//     // Construct the URL for fetching a specific animal's details by ID
//     const url = `${FURRY_FRIENDS_BASE_URL}/users/profile-picture/${id}`;
//     console.log(url);
//
//     let request = new Request(url, myInit);
//
//     return fetch(request)
//         .then(status)
//         .then(json)
//         .then(data => {
//             console.log('Request succeeded with JSON response', data);
//             return data;
//         })
//         .catch(error => {
//             console.log('Request failed', error);
//             return Promise.reject(error);
//         });
// }

export function getUserProfilePicture(id) {
    console.log(`Fetching profile picture for user: ${id}`);

    const url = `${FURRY_FRIENDS_BASE_URL}/users/profile-picture/${id}`;

    return fetch(url, { method: 'GET', mode: 'cors' }) // Fetch image as a blob
        .then((response) => {
            if(response.ok) {
                return response.blob(); // Return raw binary data
            } else if (response.status === 404) {
                console.warn(`Profile picture not found for user: ${id}`);
                return null; // No image, return null to fallback
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then((blob) => {
            // Convert blob to Base64 Data URL
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // Result is Base64 string
                reader.readAsDataURL(blob); // Start converting blob to Base64
            });
        })
        .catch((error) => {
            console.error('Error fetching user profile picture:', error);
            return null; // Return null if fetching fails
        });
}

export function getCare_NeedsByAnimalId(id) {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Construct the URL for fetching a specific animal's details by ID
    const url = `${FURRY_FRIENDS_BASE_URL}/care-need/${id}`;
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

export function addCaring_session(caring_session){
    console.log("Caring Session Data: ", caring_session); // Debugging: Afișează datele trimise

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const myInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(caring_session)
    };

    const url = `${FURRY_FRIENDS_BASE_URL}/caring-sessions/add`;
    const request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => data)
        .catch(error => Promise.reject(error));
}

export function getCaring_sessionsByUserId(id){
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Construct the URL for fetching a specific animal's details by ID
    const url = `${FURRY_FRIENDS_BASE_URL}/caring-sessions/get-by-user/${id}`;
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

export function getMyPets(userId) {
    console.log("E in rest calls in getMyPets");
    // URL-ul complet pentru a obține animalele unui utilizator pe baza ID-ului
    const url = `http://localhost:8080/furry_friends/animals/user/${userId}`;

    // Setările pentru cererea GET
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
    };

    // Creează o cerere GET
    let request = new Request(url, myInit);

    // Efectuează cererea
    return fetch(request)
        .then(response => {
            // Verifică dacă răspunsul este 200 OK
            if (response.ok) {
                return response.json();  // Returnează datele în format JSON
            } else if (response.status === 404) {
                throw new Error('No animals found for this user.');
            } else {
                throw new Error('Error retrieving data.');
            }
        })
        .then(data => {
            console.log('Pets retrieved successfully:', data);
            return data;  // Returnează lista de animale
        })
        .catch(error => {
            console.error('Error:', error);
            return Promise.reject(error);  // Returnează eroarea
        });
}

export function addCareNeed(careNeed) {
    console.log("Care Need Data: ", careNeed); // Debugging: Display the data being sent

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const myInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(careNeed),
        mode: 'cors'
    };

    const url = `${FURRY_FRIENDS_BASE_URL}/care-need/add`;
    const request = new Request(url, myInit);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('Care need added successfully:', data);
            return data;
        })
        .catch(error => {
            console.error('Error adding care need:', error);
            return Promise.reject(error);
        });
}

export function getAllCareNeeds() {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    const url = `${FURRY_FRIENDS_BASE_URL}/care-need`;
    console.log(url);

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

export function deleteCareNeed(id) {
    const url = `${FURRY_FRIENDS_BASE_URL}/care-need/delete/${id}`;

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    const request = new Request(url, {
        method: 'DELETE',
        headers: headers,
        mode: 'cors',
    });

    return fetch(request)
        .then(response => {
            // Verifică dacă răspunsul este în format JSON
            if (response.ok) {
                // Dacă serverul returnează JSON
                if (response.headers.get('Content-Type').includes('application/json')) {
                    return response.json(); // parsează JSON
                } else {
                    // Dacă serverul trimite un mesaj simplu
                    return response.text();
                }
            } else {
                return Promise.reject('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            // Dacă serverul a trimis un mesaj de succes
            if (typeof data === 'string') {
                console.log(data); // În cazul unui mesaj simplu
            } else {
                console.log('Care need deleted successfully');
            }
        })
        .catch((error) => {
            console.log('Error deleting care need:', error);
            return Promise.reject(error);
        });
}

export function updateCareNeedStatus(id, status) {
    console.log("Updating care need status to:", status);

    // Set up headers
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    // Construct the URL with query parameter for status
    const url = `${FURRY_FRIENDS_BASE_URL}/care-need/update-status/${id}?status=${status}`;

    const myInit = {
        method: 'PUT',   // Use PUT method as the endpoint expects it
        headers: headers,
        mode: 'cors'     // Cross-origin request mode
    };

    const request = new Request(url, myInit);

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Assuming the response is JSON
        })
        .then((data) => {
            console.log('Care need status updated successfully:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error updating care need status:', error);
            return Promise.reject(error);
        });
}

export function getCaretakerId(id) {
    console.log('Inainte de fetch GET pentru ' + FURRY_FRIENDS_BASE_URL);

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    // Construct the URL for fetching a specific animal's details by ID
    const url = `${FURRY_FRIENDS_BASE_URL}/care-need/caretaker/${id}`;
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

export function getUser(id) {
    console.log('Fetching user with ID:', id);

    const headers = new Headers();
    headers.append('Accept', 'application/json');

    const myInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
    };

    const url = `${FURRY_FRIENDS_BASE_URL}/users/${id}`;
    console.log("URL:", url);

    const request = new Request(url, myInit);

    return fetch(request)
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch user details:', error);
            return Promise.reject(error);
        });
}
