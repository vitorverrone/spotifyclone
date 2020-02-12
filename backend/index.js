const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({});
});

app.listen(3333);