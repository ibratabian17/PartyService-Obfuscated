function initroute(app) {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var prodwsurl = "https://jmcs-prod.just-dance.com"
  app.post("/wdf/v1/assign-room", (req, res) => {
    res.send(require("../../database/wdf/assign-room.json"));
  });

  app.get("/wdf/v1/server-time", (req, res) => {
    res.send({
      "time": Date.now() / 1000
    }
    );
  });

  app.post("/wdf/v1/rooms/PCJD2017/screens", (req, res) => {
    res.send({    "__class": "ScreenList",
    "screens": [{
      "__class": "Screen",
      "type": "in-game",
      "startTime": Date.now() / 1000,
      "endTime": (Date.now() / 1000) + 300,
      "theme": "vote",
      "mapName": "Otonablue",
      "schedule": {
          "type": "probability",
          "theme": "MapVote",
          "occurance": {
              "next": (Date.now() / 1000) + 400,
              "prev": null
          }
      }
  }]
    });
  });

  app.get("wdf/v1/rooms/PCJD2017/newsfeed", (req, res) => {
    res.send(require("../../database/wdf/newsfeed.json"));
  });

  app.get("/wdf/v1/online-bosses", (req, res) => {
    res.send({ __class: "OnlineBossDb", bosses: {} });
  });

  app.get("/wdf/v1/rooms/PCJD2017/next-happyhours", (req, res) => {
    res.send(require("../../database/wdf/next-happyhours.json"));
  });

  app.get("/wdf/v1/rooms/" + "PCJD2017" + "/*", (req, res) => {
    var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    var n = req.url.lastIndexOf('/');
    var result = req.url.substr(0)
    xhr.open('GET', prodwsurl + result, false);
    xhr.setRequestHeader('X-SkuId');
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    res.send(xhr.responseText);
  });

  app.post("/wdf/v1/rooms/" + "PCJD2017" + "/*", (req, res) => {
    var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    var n = req.url.lastIndexOf('/');
    var result = req.url.substr(0)
    xhr.open('POST', prodwsurl + result, false);
    xhr.setRequestHeader('X-SkuId');
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body, null, 2));
    res.send(xhr.responseText);
  });

  app.get("/wdf/v1/rooms/" + "PCJD2017" + "/ccu", (req, res) => {
    var ticket = req.header("Authorization");
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      prodwsurl + "/wdf/v1/rooms/PCJD2017/ccu",
      false);
    xhr.setRequestHeader('X-SkuId');
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body), null, 2);

    res.send(xhr.responseText.toString());
  });
}
module.exports = { initroute }