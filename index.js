const express = require('express')
const app = express()
const path = require('path');

const {
    uri, 
    user, 
    password,
    files
} = require('./config.json')

const fs = files.map(i => { return require('./' + i) })
const neo4j = require('neo4j-driver').default
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
global.session = driver.session();

const _f = (req) => {
    const level = req.query['level'] || 3
    return fs[level-1]
}

app.use('/', express.static(path.join(__dirname, 'static')))

app.get('/create/:name/:age/:weight', async (req, res) => {
    const name = req.params.name
    const age = req.params.age
    const weight = req.params.weight
    res.send(await _f(req).createPerson([name, age, weight]))
})

app.get('/show/id/', async (req, res) => {
    const id = req.query.id
    res.send(await _f(req).showPersonById([id]))
})

app.get('/show/name/', async (req, res) => {
    const name = req.query.name
    res.send(await _f(req).showPersonByName([name]))
})

app.get('/delete/', async (req, res) => {
    const id = req.query.id
    res.send(await _f(req).deletePerson([id]))
})


app.get('/clear', async (req, res) => {
      
    let result = ''
    try {
        await session.run(
            'MATCH (n) DELETE n',
        );
        result = 'ok'
    } catch (e) {
        result = e.toString()
    }    
    res.send(result)

})

app.listen(3030)

