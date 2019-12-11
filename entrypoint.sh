bash /docker-entrypoint.sh
neo4j start 
function changePassword() {
    cypher-shell -u neo4j -p neo4j 'CALL dbms.changePassword("neo4j1")' 2>/dev/null
}
echo -n 'waiting for neo4j to load'
while ! changePassword; do
    sleep 1
    echo -n '.'
done
echo
npm start 