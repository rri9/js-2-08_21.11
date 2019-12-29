const handler = require("./handler");
const getDateTime = require("./getDate"); 

console.log(`   ${getDateTime()}`);
console.log("Starting E-Shop server");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

app.get("/catalogData.json", (req, res) => {
  handler.get(res, "server/responses/catalogData.json");
});

app.get("/getBasket.json", (req, res) => {
  handler.get(res, "server/responses/getBasket.json");
});

app.post("/addToBasket.json", (req, res) => {
  handler.post(req, res, "server/responses/getBasket.json", "add");
});

app.post("/delFromBasket.json", (req, res) => {
  handler.post(req, res, "server/responses/getBasket.json", "del");
});

app.listen(3000, () => {
  console.log("Server listening at port 3000...");
});
