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

La pagina tiene el header de busqueda en el layout y cada una de las paginas es un entry en webpack.
Tome esta decisión por considerar que podrian ser dos equipos distintos quienes hacen estas tareas (resultado de busqueda y detalle) y permite tener navegación con node sin la necesidad de usar react route y hacer una single page application. 

# Details

Hice la api y la web en el mismo server por considerarse de un prototipo, podrian haber sido dos node pero no crei que sumara al resultado final.
La decisión de hacer el header en el layout es debido a que podria ser un componente que provee el equipo que tiene la home de Mercado libre y tiene el unico comportamiento de hacer un redirect a un resultado de busqueda.

Agregue un par de test para confirmar el rendering de las dos paginas.
    
