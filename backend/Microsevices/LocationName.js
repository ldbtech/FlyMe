const axios = require('axios');

const getCityName = async (cityName) => {
    try {
        const response = await axios.get('');
        return response.data
    } catch (error) {
        console.error('Error fetching cities: ', error);
        throw error;
    }
}

const getStatByCode = async (stateCode) => {
    try {
        const response = await axios.get('');
        return response.data;
    } catch (error) {
        console.error('Error fetching State data: ', error);
        throw error;
    }
}

module.exports = {
    getCityName,
    getStatByCode
};