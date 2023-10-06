// **Importamos el módulo mongoose y el tipo Schema**
const mongoose = require("mongoose");
const { Schema } = mongoose;
// **Creamos un nuevo esquema de modelo de usuario**
const userSchema = new Schema(
  {
    // **Nombre de usuario:** un campo de tipo String que debe ser único
    username: { type: String, unique: true },
    // **Contraseña:** un campo de tipo String
    password: String,
  },
  // **Especificamos el nombre de la colección en la BD**
  { collection: "usuarios" }
);
// **Exportamos el modelo de usuario**
module.exports = mongoose.model("User", userSchema);
