import express from 'express';
import db from './utils/database.js';
import User from './models/users.model.js';
import 'dotenv/config';

User;

console.log(process);

const PORT = process.env.PORT ?? 8000;

//probar conexión con la base de datos

db.authenticate()
    .then(() =>{
        console.log('Conexión correcta');
    })
    .catch((error) => console.log(error));

    //Si existe la tabla y hay modificaciones -> altera la tabla {alter}
db.sync({alter:true}) // Si no existe la tabla, la crea/ si ya existe no hace nada
.then(() => console.log('Base de datos sincronizada'))
.catch(error => console.log(error));

const app = express();

app.use(express.json());

//health check
app.get('/', (req, res)=> {
    res.send('OK');
});

//CREATE user.
// Cuando se haga una petición "request# / user POST crear un usuario"

app.post('/users', async (req, res) => {

    try{

        const { body } = req;
        //Mandar esta info hasta la base de datos
        // * INSERT INTO users (username, email, password)
        const user = await User.create(body);
        res.status(201).json(user);

    }catch (error) {
        res.status(400).json(error);
    }

});

//READ users
//Get/users -> devoler un json con todos los usuarios en la base de datos.
app.get('/users', async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        res.status(400).json(error);
    }

});

// en SQL cuando queriamos buscar un elemento hacíamos así -> SELECT * FROM users WHERE id=4 
// GET / users / :id

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params; // params es un objeto {id:4}
        const user = await User.findByPk(id);
        res.json(user);
    }catch (error) {
        res.status(400).json(error);
    }
});

//UPDATE .... WHERE id = 5;
// PUT '/users' -Z path params
// la informacion a actualizar por el body

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params; // params es un objeto {id:4}
        const {body} = req;
        //primer objeto es la info
        // segundo objeto es el where
        const user = await User.update(body, {
            where: { id: id },
          });
          res.json(user);
        } catch (error) {
          res.status(400).json(error);
        }
      });

      app.delete("/users/:id", async (req, res) => {
        try {
          const { id } = req.params;
      
          await User.destroy({
            where: { id },
          });
          res.status(204).end(); // termina con la petición
        } catch (error) {
          res.status(400).json(error);
        }
      });



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el pueto ${PORT}`)
});