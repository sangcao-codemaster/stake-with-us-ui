const Axios = require('axios')
import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const userService = {
    login,
    getUsers,
    getUserById,
    addOrUpdate,
    xemBaoCaoTong,
    getTongTien,
    phoneUnique,
    emailUnique,
    deleteUser,
    recoverUser,
    resetPassword
};

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/user/delete/${id}`, requestOptions)
    .then(res => {
        return res;
    });
}
function recoverUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/user/recover/${id}`, requestOptions)
    .then(res => {
        return res;
    });
}

function phoneUnique(phone){
    const requestOptions = {
        headers: authHeader()
    };
    return Axios.get(`${apiUrl}/user/phone/unique/${phone}`,requestOptions)
}

function emailUnique(email){
    const requestOptions = {
        headers: authHeader()
    };
    return Axios.get(`${apiUrl}/user/email/unique/${email}`,requestOptions)
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return Axios.post(`${apiUrl}/auth/login`,{'email':email,'password':password},requestOptions)
}

function resetPassword(email){
    return Axios.post(`${apiUrl}/auth/reset-password/${email}`)
}

function getTongTien(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return Axios.get(`${apiUrl}/user/tong-tien`,requestOptions)
    .then(response => { 
        return response
    })
}

function xemBaoCaoTong(params) {
    const requestOptions = {
        method: 'POST',
        responseType: 'arraybuffer',
        headers: authHeader()
    };
    return Axios.post(`${apiUrl}/user/bao-cao-tong`,params,requestOptions)
} 

function getUsers(param) {
    const requestOptions = {
        headers: authHeader(),
        params:param
    };
    return Axios.get(`${apiUrl}/user/list`,requestOptions)
}

function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return Axios.get(`${apiUrl}/user/`+ id, requestOptions);
}

function addOrUpdate(user) {
    return Axios.post(`${apiUrl}/user`,user,{headers:authHeader()})
}