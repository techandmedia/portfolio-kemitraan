const compression = require("compression");
const express = require("express");
const next = require('next')
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const contactRoute = require("./routes/route-contact");
// const employeeRoute = require("./routes/route-employee");
// const productRoute = require("./routes/route-product");

server.use(compression());
server.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = parseInt(process.env.PORT, 10) || 3000;
// server.listen(port, () => console.log(`Listening on port ${port}`));

// perhatikan pemakaian route, di sini api nya adalah '/api/contacts', sedangkan di file route nya adalah '/'
// server.use(contactRoute);
// server.use(employeeRoute);
// server.use(productRoute);


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {

    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query)
    })

    server.get('/about', (req, res) => {
      return app.render(req, res, '/about', req.query)
    })

    server.get('/table1', (req, res) => {
      return app.render(req, res, '/table1', req.query)
    })

    server.get('/table2', (req, res) => {
      return app.render(req, res, '/table/table1', req.query)
    })

    server.get('/table3', (req, res) => {
      return app.render(req, res, '/table/table2', req.query)
    })

    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })