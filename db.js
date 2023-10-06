const mongoose = require("mongoose");

const user = "usuarioprueba";
const password = "CjA4KPD83BOrk9Yj";
const dbname = "pruebas";
// URL de conexión a la base de datos
const dbURL = `mongodb+srv://${user}:${password}@proyecto1.wapsfom.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// Opciones de conexión
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conectar a la base de datos
mongoose
  .connect(dbURL, dbOptions)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB: ", error);
  });
