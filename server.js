const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Configuración de Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Verificar si el nombre de usuario ya está en uso
const checkUsernameExists = (username) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Procesar el registro de usuario
app.post('/registro', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExists = await checkUsernameExists(username);
    if (userExists) {
      return res.send('El nombre de usuario ya está en uso.');
    }
    // Insertar usuario en la base de datos
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
      if (err) {
        return res.send('Error al registrar usuario.');
      }
      res.redirect('/login');
    });
  } catch (error) {
    console.error('Error al verificar nombre de usuario:', error);
    res.send('Error en el servidor.');
  }
});

// Procesar el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Consultar usuario en la base de datos
  db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (err) {
      return res.send('Error en el servidor.');
    }
    if (!row) {
      return res.send('Nombre de usuario o contraseña incorrectos.');
    }
    res.redirect('/ingreso');
  });
});

// Ruta de ingreso (página después del login exitoso)
app.get('/ingreso', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/ingreso.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
