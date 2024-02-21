const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ELEMENTOS PARA CONECTAR CON MONGODB
// SIEMPRE IGUALES. DOS FORMAS.
// MONGOOSE Y MONGO CLIENT. EMPEZAMOS CON MC POR ESTABILIDAD.

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

// CONEXIÓN CON MONGODB VÍA MONGO CLIENT

MongoClient.connect("mongodb://0.0.0.0:27017/", function (err, client) {
  if (err != null) {
    console.log(err);
    console.log("No se ha podido conectar con MongoDB");
  } else {
    app.locals.db = client.db("EspeciesAnimales");
    console.log(
      "Conexión correcta a la base de datos EspeciesAnimales de MongoDB"
    );
  }
});

// AQUÍ LAS RUTAS
app.get("/animales", function (req, res) {
  app.locals.db
    .collection("Animales")
    .find()
    .toArray(function (err, datos) {
      if (err != null) {
        console.log(err);
      } else {
        console.log(datos);
        res.send(datos);
      }
    });
});

app.post("/animales", (req, res) => {
  let nuevo = {
    nombre: req.body.nombre,
    especie: req.body.especie,
    alimentacion: req.body.alimentacion,
    longevidad: req.body.longevidad,
    img: req.body.img,
  };

  // AQUÍ GUARDAREMOS ESTE ELEMENTO A LA BASE DE DATOS
  // NO NECESITAMOS HACER UN PUSH PORQUE NO ES UN ARRAY
  app.locals.db.collection("Animales").insertOne(nuevo, function (err, res) {
    if (err != null) {
      console.log(err);
    } else {
      console.log("Añadido correctamente a la colección Animales");
    }
  });
});
app.put("/animales", (req, res) => {
  let nuevo = {
    nombre: req.body.nombre,
    especie: req.body.especie,
    alimetacion: req.body.alimentacion,
    longevidad: req.body.longevidad,
    img: req.body.img,
  };
  // AHORA TENDRÉ QUE MIRAR EN LA BASE DE DATOS
  // SI HAY COINCIDENCIA Y, EN CASO DE QUE
  // LA HAYA, MODIFICAR EL RESTO DE VALORES

  app.locals.db.collection("Animales").updateOne(
    { nombre: nuevo.nombre },
    {
      $set: {
        especie: nuevo.especie,
        alimentacion: nuevo.alimentacion,
        longevidad: nuevo.longevidad,
        img: nuevo.img,
      },
    },
    function (err, res) {
      if (err != null) {
        console.log(err);
      } else {
        console.log("Animal modificado correctamente");
      }
    }
  );
});

app.delete("/animales", (req, res) => {
  app.locals.db
    .collection("Animales")
    .deleteMany({ nombre: req.body.nombre }, function (err, res) {
      if (err != null) {
        console.log(err);
      } else {
        console.log("Animal eliminado correctamente");
      }
    });
});
// Y EL PUERTO

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor (Express JS) conectado correctamente al puerto 3000");
});
