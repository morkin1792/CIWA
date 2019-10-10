const express = require('express')
const app = express()
const port = 3000

app.get('*', async (req, res) => {
    // const data = req.params
    console.log(req.params[0].substr(1))
    res.send('ok')
})

app.listen(port)
console.log('listening *:' + port)
