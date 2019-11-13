 
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

exports.createPerson = async ([name, age, company]) => {
    return await _q('MERGE (p:Person {name:"' + name + '", age:"' + age + '"}) MERGE(c:Company{name:"' + company + '"}) MERGE (p)-[r:WORKS]->(c) RETURN p,r,c')
}

exports.showPersonById = async ([id]) => {
    return await _q('MATCH (a:Person) \nWHERE id(a) = ' + id + '\n RETURN a')
}

exports.showPersonByName = async ([name]) => {
    let r = await _q("MATCH (a:Person) WHERE a.name = '" + name + "' RETURN a as Person") //todo: {.*, id:id(a)}
    if (typeof(r) !== 'string') {
        r = r.map(e => {return e._fields})
    }
    return r
}

exports.deletePerson = async ([id]) => {
    return await _q('MATCH (a:Person) \nWHERE id(a) = ' + id + '\n DELETE a')
}