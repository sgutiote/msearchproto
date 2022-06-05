# Requirements
- Node: 18.2.0 en caso de no tener esta versión de node, se recomienda el uso de [nvm](https://github.com/nvm-sh/nvm)


# Install & Run

```
// en caso de no tenerlo
$ nvm install 18 
$ nvm use 18

//DEPENDENCIAS

//npm requiere del flag debido a node 18
$ npm install --legacy-peer-deps
//yarn
$ yarn install


//BUILD

//npm
$ npm run build
//yarn
$ yarn build

//RUN

//npm
$ npm run start
//yarn
$ yarn start


```
# Gist

Para la realización de esta prueba elegí utilizar las últimas versiones de node y react. Esta decisión me permitió concer los cambios que tenían, además fue una oportunidad para actualizarme y utilizar nuevas herramientas.

El resultado es un servidor node/express que tiene la API y sirve las tres páginas: home, búsequeda y detalle.

# Details

Hice la API y las páginas proveídas por el mismo servidor por tratarse de un prototipo. Podrían haber sido dos node pero no cosideré que sumara al resultado final.

La decisión de hacer el header en el layout se basa en que podría ser un componente que provee el equipo que tiene la home de Mercado libre. El único comportamiento que tiene es hacer un redirect a un resultado de búsqueda.

Al hacer el build del código se puede ver que el front tiene dos scripts, tomé esta decisión por considerar que podrían ser dos equipos distintos los que hacen estas tareas (resultado de búsqueda y detalle). Esto permite tener navegación contra el servidor sin la necesidad de hacer una single page application y ruteo en la web. 


Agregué al código un par de test para confirmar el rendering de las dos páginas.
    
