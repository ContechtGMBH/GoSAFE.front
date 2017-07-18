var endpoint;

if (process.env.NODE_ENV === 'development') {
    endpoint = 'http://localhost:3000/';
} else if (process.env.NODE_ENV === 'production') {
    endpoint = 'https://our.production.backend.com'
}

module.exports = {
    endpoint: endpoint
}
