const fs = require('fs');

var bannedIPs = fs.readFileSync("./database/db/blacklist.json", 'utf8');
function filter(req, res, next){
  const userIP = req.headers["x-real-ip"]|| req.ip; // Get the requester's IP address
  if (bannedIPs.includes(userIP)) {
    // If the IP is in the ban list, deny access
    res.status(403).send({
       'error': 403,
       'message': 'Access to this request currently denied for temporary times, go chat in discord to unban',
       'discord': 'https://discord.gg/RaXaKTmHpV'
     });
  }
  // If not banned, continue with the request
  next();
	
}
module.exports = {filter}