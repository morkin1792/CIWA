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
    let level = parseInt(req.query['level'])
    if (!level || level < 1 || level > files.length) {
        level = files.length
    }
    return fs[level-1]
}

app.disable('x-powered-by')
app.disable('etag')

app.use((req, res, next) => {
    let err = null;
    try {
        decodeURIComponent(req.path)
    }
    catch(e) {
        err = e
    }
    if (err){
        return res.redirect(['http://', req.get('Host'), '/'].join(''))    
    }
    next()
})

app.use('/', express.static(path.join(__dirname, 'static')))

app.get('/create/:name/:age/:company', async (req, res) => {
    const name = req.params.name
    const age = req.params.age
    const company = req.params.company
    res.send(await _f(req).createPerson([name, age, company]))
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
            'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r',
        );
        result = 'ok'
    } catch (e) {
        result = e.toString()
    }    
    res.send(result)

})

console.log('access http://localhost:3030')
app.listen(3030)

