const Axios = require('axios')
import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const validatorService = {
    getAll,
    getById,
    addOrUpdate,
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return Axios.get(`${apiUrl}/validator/${id}`, requestOptions)
    .then(res => {
        return res;
    });
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return Axios.get(`${apiUrl}/validators`, requestOptions)
    .then(res => {
        return res;
    });
}

function addOrUpdate(validator) {
    if(validator.id>0){
        return Axios.put(`${apiUrl}/validator/${validator.id}`,{address:validator.address,pub_key:validator.pub_key,voting_power:validator.voting_power,proposer_priority:validator.proposer_priority},{headers:authHeader()})
    }else{
        return Axios.post(`${apiUrl}/validator`,{address:validator.address,pub_key:validator.pub_key,voting_power:validator.voting_power,proposer_priority:validator.proposer_priority},{headers:authHeader()})
    }
}