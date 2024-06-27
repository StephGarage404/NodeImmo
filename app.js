const express = require('express');
const mustacheExpress = require('mustache-express');
const connectDatabase = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express();
const mustache = mustacheExpress();
const port = process.env.PORT || 3000;

app.engine("mustache", mustache);
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public")); // Le dossier 'public' contiendra vos fichiers statiques
app.use(express.json()); // Pour le support des JSON dans le corps (body) des requêtes
app.use(express.urlencoded({ extended: true })); // Pour le support des formulaires

connectDatabase();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", require("./routes/annonces"));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;