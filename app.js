import express from "express";
import exphbs from "express-handlebars";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use("/", routes);

app.use((req, res) => {
  res.status(404).render('error', {
    errorCode: 404,
    message: 'Page not found'
  });
});

// Example 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    errorCode: 500,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

