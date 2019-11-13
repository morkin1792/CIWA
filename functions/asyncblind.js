
const {createPerson, showPersonById, showPersonByName, deletePerson} = require('./blind')

exports.createPerson = async (args) => {
    createPerson(args)
    return 'create ok'
}

exports.showPersonById = async (args) => {
    showPersonById(args)
    return 'show id ok'
}

exports.showPersonByName = async (args) => {
    showPersonByName(args)
    return 'show name ok'
}

exports.deletePerson = async (args) => {
    deletePerson(args)
    return 'delete ok'
}