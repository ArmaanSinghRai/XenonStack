const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const db = require('./db');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
