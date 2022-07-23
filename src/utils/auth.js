const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

exports.auth = (req, res, next) => {
  try {
    // En el back minuscula, en el front mayuscula
    const { authorization } = req.headers;

    //Para verificar que trae el encabezado
    if (!authorization) {
      throw new Error("Session expired");
    }

    //Para separar el Bearer del token
    const [_, token] = authorization.split(" ");

    //Para verificar que trae el token
    if (!token) {
      throw new Error("Session expired !");
    }

    //Reversión de la codificación del token
    const { id } = jwt.verify(token, process.env.ORION);

    //Mutar el objeto req en el user (req.user) para poder acceder a el en cualquier parte
    req.user = id;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
