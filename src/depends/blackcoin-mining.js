import blackcoin from 'node-blackcoin-more'
import config from '../../config.js'

export function warn() {
  if (!config.user || !config.pass || !config.host || !config.port) {
    console.log(`depends/blackcoin-config.js requires host, port, user and pass.`);
    console.log(`user: ${config.user}, pass: ${config.pass}, host: ${config.host}, port: ${config.port}`)
    process.exit(0);
  }
}
warn()

const client = new blackcoin.Client(config);


export function getstakinginfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getstakinginfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function generate(numblocks, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generate', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function generatetoaddress(numblocks, address, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generatetoaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}