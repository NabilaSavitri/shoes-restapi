const express = require("express")
const app = express();
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())

//import routes
const authRoutes = require('./routes/auth')
const sepatuRoutes = require('./routes/sepatu')

app.use('/auth', authRoutes)
app.use('/sepatu', sepatuRoutes)

app.get("/", (req, res) => {
  res.send("Nabila Savitri");
})

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection

//handel error
db.on('error', console.error.bind(console, 'Error Establishing Database Connection'))
//handel sukses
db.once('open', () => {
  console.log('Database Is Connected');
})

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});