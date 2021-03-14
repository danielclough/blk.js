const blackcoin = require("node-blackcoin-more");


function getstakinginfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getstakinginfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function generate(numblocks, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generate', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function generatetoaddress(numblocks, address, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generatetoaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}