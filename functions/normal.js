
const _q = async (query, obj) => {
    let result = ''
    try {
        result = await session.run(
            query,
            obj
        );       

        return result.records;
    } catch (e) {
        result = e.toString()
    }
    return result
}

exports.createPerson = async ([name, age, company]) => {
    return await _q('MERGE (p:Person {name:$name, age:$age}) MERGE(c:Company{name:$company}) MERGE (p)-[r:WORKS]->(c) RETURN p,r,c', {name: name, age:age, company:company})
}

exports.showPersonById = async ([id]) => {
    return await _q('MATCH (a:Person) WHERE id(a) = $id RETURN a', {id: Number(id)})
}

exports.showPersonByName = async ([name]) => {
    let r = await _q("MATCH (a:Person) WHERE a.name = $name RETURN a{.*, id:id(a)}", {name: name})
    if (typeof(r) !== 'string') {
        r = r.map(e => {return e._fields})
    }
    return r
}

exports.deletePerson = async ([id]) => {
    return await _q('MATCH (a:Person) WHERE id(a) = $id DELETE a', {id: Number(id)})
}