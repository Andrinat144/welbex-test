const SALT_WARK_FACTOR = 10;
const JWT_SECRET = 'secret key for jwt token';
const BASE_URL = process.env.BASE_URL;
const PORT = 8000;
const config = { SALT_WARK_FACTOR, JWT_SECRET, BASE_URL, PORT };

export default config;
