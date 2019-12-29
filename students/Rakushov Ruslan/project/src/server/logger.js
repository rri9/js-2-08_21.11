const logFile = "server/stats.json";

const catalogCore = require("./catalogCore");
const getCurDateTime = require("./getDate");
const fs = require("fs");

function cartActivity(action, id) {
  
  let act;
  switch (action) {
    case "del":
      act = "User deleted"
      break;
    case "add":
      act = "User added"
      break;
    default:
      act = "User do something unexpected with item"
      break;
  }
  const title = catalogCore.getItemById(id).title;
  fs.appendFile(logFile, `${getCurDateTime()} ${act} ${title}\n`, () => { });
}

module.exports = cartActivity;