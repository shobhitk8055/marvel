const axios = require("axios");
const express = require("express");
const app = express();
var cors = require("cors");
var MD5 = require("crypto-js/md5");
app.use(cors());

const getHashString = () => {
  const dateTime = new Date().getTime();
  const privateKey = "8078ead99086613c291cde0d5ad7d30d7aa6df4e";
  const publicKey = "56a7c10621f1426b721cd52912e9630d";
  const hashString = dateTime + privateKey + publicKey;
  const hash = MD5(hashString).toString();
  return `?ts=${dateTime}&apikey=${publicKey}&hash=${hash}&limit=12`;
};

const headers = {
  headers: {
    "Accept-Encoding": "application/json",
  },
};

app.get("/characters", async (req, res) => {
  const url = `https://gateway.marvel.com/v1/public/characters${getHashString()}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results);
});

app.get("/characters/search/:name", async (req, res) => {
  const url = `https://gateway.marvel.com/v1/public/characters${getHashString()}&nameStartsWith=${req.params.name}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results);
});

app.get("/character/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://gateway.marvel.com/v1/public/characters/${id}${getHashString()}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results[0]);
});

app.get("/comics/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics${getHashString()}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results);
});

app.get("/series/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/series${getHashString()}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results);
});

app.get("/stories/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/stories${getHashString()}`;
  const response = await axios.get(url, headers);
  res.json(response.data.data.results);
});

app.listen(3000, () => {
  console.log("Connected..");
});
