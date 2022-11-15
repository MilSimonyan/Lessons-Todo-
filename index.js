const express = require('express');
const bodyParser = require('body-parser');
const list = require('./Router/listRouter');
const auth = require('./Router/userRouter');

const PORT = 5050;

const app = express();
app.use(bodyParser.json());
app.use('/list',list);
app.use('/auth', auth);

app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
})