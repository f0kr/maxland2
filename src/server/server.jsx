import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from '../client/pages/App'
import Item from "./models/itemModel"
import fs from "fs";
import store from "../client/store";
import { Provider } from "react-redux";
import { renderToPipeableStream } from "react-dom/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

app.use("/static", express.static(__dirname));

/**
 * Produces the initial non-interactive HTML output of React
 * components. The hydrateRoot method is called on the client
 * to make this HTML interactive.
 * @param {string} location
 * @return {Promise<string>}
 */
const createReactApp = async (location, data, res) => {
  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');

  const { pipe } = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={location}>
        <App data={data} />
      </StaticRouter>
    </Provider>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        pipe(res); // Start streaming the HTML
      },
      onError(error) {
        console.error(error);
        res.statusCode = 500;
        res.send('An error occurred during rendering.');
      }
    }
  );

  return null; // Since we're streaming, return is not needed.
};

app.get('/', async (req, res) => {
  await createReactApp(req.url, null, res);
});

app.get('/products', async (req, res) => {
  try {
    const data = await Item.find();
    await createReactApp(req.url, data, res);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.get('*', async (req, res) => {
  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');
  res.send(html);
});
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
