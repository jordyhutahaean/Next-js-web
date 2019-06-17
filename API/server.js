const express = require('express')
const app = express();
const hostname = process.env.HOST;
const database = process.env.DB;
const port = process.env.PORT;

require('dotenv').config();

app.get('/', (req,res) => {
    res.send(process.env.SECRET_KEY);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

server.post('/api/contacts',(req,res) => {
    const { email, name } = req.body
    console.log(req.body)
    res.send('success')
})

server.get('/api/contacts/:id', (req, res) => {
    const actualPage = '/view';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
});