// Importa el módulo express
const express = require("express");

// Importa el módulo bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Importa el módulo jsonwebtoken para generar tokens
const jwt = require("jsonwebtoken");

// Importa el modelo de usuario
const User = require("./models/user");

// Crea una aplicación express
const app = express();

// Configura express para que use el middleware json() para parsear JSON en las solicitudes
app.use(express.json());

//============0Conexión a la base de datos================0

// Importa el módulo mongoose para conectarse a MongoDB
const mongoose = require("mongoose");

// Define las credenciales de la base de datos
const user = "usuarioprueba";
const password = "CjA4KPD83BOrk9Yj";
const dbname = "pruebas";

// Crea la URL de conexión a la base de datos
const dbURL = `mongodb+srv://${user}:${password}@proyecto1.wapsfom.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// Define las opciones de conexión a la base de datos
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conecta a la base de datos
mongoose
  .connect(dbURL, dbOptions)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB: ", error);
  });

//============CREACION DE RUTAS ========================

// Ruta de registro
app.post("/registro", async (req, res) => {
  // Obtiene el nombre de usuario y la contraseña de la solicitud
  const { username, password } = req.body;

  try {
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const user = new User({ username, password: hashedPassword });

    // Guarda el usuario en la base de datos
    await user.save();

    // Responde con un código de estado 201 (Creado) y un mensaje de éxito
    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    // Responde con un código de estado 500 (Error interno del servidor) y un mensaje de error
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta de inicio de sesión
app.post("/iniciar-sesion", async (req, res) => {
  // Obtiene el nombre de usuario y la contraseña de la solicitud
  const { username, password } = req.body;

  // Busca el usuario en la base de datos
  const user = await User.findOne({ username });

  // Si el usuario no existe, responde con un código de estado 401 (No autorizado) y un mensaje de error
  if (!user) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Si la contraseña no es válida, responde con un código de estado 401 (No autorizado) y un mensaje de error
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  // Genera un token JWT con el ID del usuario
  const token = jwt.sign({ userId: user._id }, "clave_secreta");

  // Responde con el token JWT
  res.json({ token });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en ejecución en el puerto 3000");
});
