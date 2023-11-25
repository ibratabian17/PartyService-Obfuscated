var ipban = require("./ipban.js")

//run filter
function initSec(req, res, next){
	ipban.filter(req, res, next)
}
function botgetlost(app){
  app.get('*.env', function (req, res) {
  	res.status(200).send("USER=JDNEXTLEKA2023NEWUINEWJEANSNEWHOME\nPASS=IMINLOVENOGERODENMAL")
  });
  app.get('*.php', function (req, res) {
  	res.status(200).send("USER=JDNEXTLEKA2023NEWUINEWJEANSNEWHOME\nPASS=IMINLOVENOGERODENMAL")
  });
  app.get('/', function (req, res) {
  	res.redirect("https://partyservice.github.io/web/jdnd.html")
  });
  app.get('/services', function (req, res) {
  	res.redirect("https://partyservice.github.io/web/jdnd.html")
  });
}
module.exports = {initSec, botgetlost}