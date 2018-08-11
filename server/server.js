const compression = require("compression");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoute = require("./routes/route-contact");
const employeeRoute = require("./routes/route-employee");
const productRoute = require("./routes/route-product");

server.use(compression());
server.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));


// perhatikan pemakaian route, di sini api nya adalah '/api/contacts', sedangkan di file route nya adalah '/'
server.use(contactRoute);
server.use(employeeRoute);
server.use(productRoute);
