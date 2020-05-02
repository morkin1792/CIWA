bash /docker-entrypoint.sh
neo4j start 
function changePassword() {
    echo 'neo4j1' | cypher-shell -u neo4j -p neo4j 2>/dev/null >&2
}
echo -n 'waiting for neo4j to load'
while ! changePassword; do
    sleep 1
    echo -n '.'
done
echo
npm start 
