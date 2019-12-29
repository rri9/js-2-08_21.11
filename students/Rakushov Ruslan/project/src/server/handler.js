const fs = require("fs");
const cartCore = require("./cartCore");

const handler = {
  get(res, file) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        res.sendStatus(404, JSON.stringify({ result: 0 }));
      } else {
        res.send(data);
      }
    });
  },
  post(req, res, file, action) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        data = cartCore[action](data, req.body.id);
        fs.writeFile(file, data, errW => {
          if (errW) {
            res.send(`{"result": 0, "error": ${errW}}`);
          } else {
            res.send(`{"result": 1, "cart": ${data}}`);
          }
        });
      }
    });
  },
};

module.exports = handler;
