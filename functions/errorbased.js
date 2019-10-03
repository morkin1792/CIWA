 
const _q = async (query) => {
    let result = ''
    try {
        result = await session.run(
          query,
        );
        result = result.records
    } catch (e) {
        result = e.toString()
    }
    return result
}

exports.createPerson = async ([name, age, weight]) => {
    return await _q('CREATE (a:Person {name:"' + name + '", \nage:"' + age + '", weight:"' + weight +'"}) \n RETURN a')
}

exports.showPersonById = async ([id]) => {
    return await _q('MATCH (a:Person) \nWHERE id(a) = ' + id + '\n RETURN a')
}

exports.showPersonByName = async ([name]) => {
    let r = await _q("MATCH (a:Person) \nWHERE a.name = '" + name + "'\n RETURN a{.*, id:id(a)} as Person")
    if (typeof(r) !== 'string') {
        r = r.map(e => {return e._fields})
    }
    return r
}

exports.deletePerson = async ([id]) => {
    return await _q('MATCH (a:Person) \nWHERE id(a) = ' + id + '\n DELETE a')
}