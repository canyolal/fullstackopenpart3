import axios from 'axios'
const baseUrl = '/api/persons'

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deleteUser = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default {
    create, update, getAll, deleteUser
}


//   {
//     "persons":[
//       { 
//         "name": "Arto Hellas", 
//         "number": "040-123456",
//         "id": 1
//       },
//       { 
//         "name": "Ada Lovelace", 
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       { 
//         "name": "Dan Abramov", 
//         "number": "12-43-234345",
//         "id": 3
//       },
//       { 
//         "name": "Mary Poppendieck", 
//         "number": "39-23-6423122",
//         "id": 4
//       }
//     ]
//   }