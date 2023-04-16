const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cookieParser());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// parse requests of content-type - application/json
app.use(express.json({ limit: '10mb', extended: true }))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))

const db = require("./db/models")

db.sequelize.sync()
// .then(() => {
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

db.sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat


// simple route
app.get("/", (req, res) => {
    res.send(`
    <html>
    <body>
      <h1>Welcome to TO DO App</h1>
    </body>
  </html>
    `)
  })
  
  // All routes 
  app.use('/auth', require("./routes/auth"));
  app.use('/todo', require("./routes/todo"));
  
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});