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

export async function getinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
// export function async help(command) {
//   return new Promise((resolve, reject) => {
//     client.cmd('help', function(err, data){
//       if (err) return reject(err);
//       resolve(data);
//     });
//   });
// }
export async function stop() {
  return new Promise((resolve, reject) => {
    client.cmd('stop', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export async function uptime() {
  return new Promise((resolve, reject) => {
    client.cmd('uptime', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}