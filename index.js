const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "https://digital-invite-202301.digicraft.link", "https://digital-invite-202401.digicraft.link", "https://digital-invite-202402.digicraft.link"],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}))

app.use(express.static('public'));
app.use(express.json())

const db = mongoose.connection;

const port = process.env.PORT || 3030;
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const db_name = process.env.DB_NAME;

mongoose.set("strictQuery", false);
// mongodb+srv://digicraftAdmin:<db_password>@digicraft-central.rjug2zb.mongodb.net/?retryWrites=true&w=majority&appName=digicraft-central
mongoose.connect(
  `mongodb+srv://${username}:${password}@digicraft-central.rjug2zb.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=digicraft-central`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
    // serverApi: ServerApiVersion.v1,
  }
);

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(port, () => console.log(`Server started on port ${port}`));

/** Settings available routers for digicraft-api-processor DB **/
app.use('/api/rsvp', require('./routes/rsvp'));
app.use('/api/wish', require('./routes/wish'));
