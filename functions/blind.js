
const _q = async (_f, args) => {
    let r = await _f(args)
    if (typeof(r) === 'string') {
        r = 'error'
    }
    return r
}

const {createPerson, showPersonById, showPersonByName, deletePerson} = require('./errorbased')


exports.createPerson = async (args) => {
    return await _q(createPerson, args)
}

exports.showPersonById = async (args) => {
    return await _q(showPersonById, args)
}

exports.showPersonByName = async (args) => {
    return await _q(showPersonByName, args)
}

exports.deletePerson = async (args) => {
    return await _q(deletePerson, args)
}