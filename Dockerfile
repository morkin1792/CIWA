FROM neo4j:enterprise
WORKDIR /var/app/
COPY . .
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash 
RUN apt-get -y install nodejs 
RUN npm install
ENV NEO4J_ACCEPT_LICENSE_AGREEMENT yes
ENV NEO4J_apoc_import_file_enabled yes
ENV NEO4J_AUTH=neo4j/neo4j1
ENV NEO4J_apoc_import_file_use__neo4j__config true

EXPOSE 3030  
CMD [ "bash", "/var/app/entrypoint.sh" ]