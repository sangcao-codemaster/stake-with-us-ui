const apiCall = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api/v1' : 'http://localhost:3000/api/v1'
export default apiCall