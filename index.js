// index.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// List of environment variables to include (whitelist)
const includeVars = [
    'MY_FAV_COLOR',
    // Add more variables as needed
];

app.get('/', (req, res) => {
    // Filter to include only whitelisted environment variables
    const filteredEnv = Object.entries(process.env)
        .filter(([key]) => includeVars.includes(key))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    res.send(`
        <h1>Environment Variables</h1>
        <pre>${JSON.stringify(filteredEnv, null, 2)}</pre>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

