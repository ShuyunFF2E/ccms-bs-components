const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve('./common-components-demos')));
app.use('/dist', express.static(path.resolve('./dist')));
app.use('/node_modules', express.static(path.resolve('./node_modules')));

const port = 8080;
const host = '0.0.0.0';
app.listen(port, host, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log(`Listening at http://localhost:${port}/`);
});
