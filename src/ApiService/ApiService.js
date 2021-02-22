import { REACT_APP_API_BASE } from '../config';

const ApiService = {
  getAllPets() {
    return fetch(`${REACT_APP_API_BASE}/pets`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  },
  getAllPeople() {
    return fetch(`${REACT_APP_API_BASE}/people`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  },

  queuePerson(name) {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ person: name }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  },

  dequeuePerson() {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  },
  dequeuePet(pet) {
    return fetch(`${REACT_APP_API_BASE}/pets`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: pet }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  },

  queue4: () => {
    this.queuePerson('Dave');
    this.queuePerson('Tyler');
    this.queuePerson('Doug');
    this.queuePerson('Matt');
  },
};

export default ApiService;