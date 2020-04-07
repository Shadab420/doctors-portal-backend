const express = require('express');

const app = express()

app.get('/', (req, res) => res.send('Hello Api!'))


app.listen(port, () => console.log(`listening at http://localhost:${port}`))