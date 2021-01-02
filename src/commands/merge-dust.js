const inquirer = require('inquirer');
const config = require('../depends/blackcoin-config.js');
const blackcoin = require("node-blackcoin-more");

function warn() {
  if (!config.user || !config.password || !config.host || !config.port) {
    console.log(`blk/src/depends/blackcoin-config.js requires host, port, rpcuser and rpcpassword.`);
    process.exit(0);
  }
}
warn()

const client = new blackcoin.Client(config);

const {
  listunspent,
} = require('../depends/blackcoin-wallet');

const {
  createrawtransaction,
  decoderawtransaction,
  sendrawtransaction,
  signrawtransaction,
} = require('../depends/blackcoin-rawtx');


async function main() {
  let dustAmount;
  let sendToAddress;

  const {dust} = await inquirer.prompt([
    {
      name: 'dust',
      message: `Enter amount in Satoshis to use as dust threshold, or press ENTER to use default (5500 Satoshis).`,
      default: 5500
    },
  ]);

  dustAmount = Number(dust);

  if (Object.is(dustAmount, NaN)) {
    console.log('Please enter a whole number between 5500 and 100000000');
    process.exit(0);
  }

  if (dustAmount > 100000000) {
    console.log(`Whole Blackcoins are not dust.  Value entered was: ${dust / 100000000} BLK`);
    process.exit(0);
  }

  // sort utxos by address
  //
  console.log(`Searching for Addresses with UTXOs with amount less than or equal to ${dustAmount}`);
  let addressesWithDust = [];
  const list = await listunspent(10,9999999);
  const sortedByAddress = list.reduce( (accumulator, utxo) => {
    const address = utxo.address;
    const amount = utxo.amount * 100000000;
    if (amount <= dustAmount && !addressesWithDust.includes(address)) {
      addressesWithDust.push(address);
    }
    if (!accumulator[address]) {
      accumulator[address] = [];
    }
    accumulator[address].push(utxo);
    return accumulator;
  }, {});

  if (addressesWithDust.length === 0) {
    console.log('No address with dust found.');
    process.exit(0);
  }

  // Remove addresses that only have 1 dust UTXO
  //
  addressesWithDust = [];
  for (const address in sortedByAddress) {
    const utxoArray = sortedByAddress[address];
    const dustArray = utxoArray.filter( utxo => {
      const amount = utxo.amount * 100000000;
      if ( amount <= dustAmount ) return utxo;
    });
    if (dustArray.length > 1) {
      sortedByAddress[address] = dustArray;
      addressesWithDust.push(address);
    } else {
      delete sortedByAddress[address];
    }
  }

  const {addresses} = await inquirer.prompt([
    {
      type: 'list',
      name: 'addresses',
      message: 'Select an address',
      choices: addressesWithDust,
    },
  ]);

  const selectedDustArray = sortedByAddress[addresses];

  const {confirmAddress} = await inquirer.prompt([
    {
      type: 'list',
      name: 'confirmAddress',
      message: `Selected address: ${addresses}? Total Dust UTXOs: ${selectedDustArray.length}.`,
      choices: ['Continue', 'Cancel'],
    },
  ]);

  if (confirmAddress === 'Cancel') {
    console.log('Aborted by user.');
    process.exit(0);
  }

  const selectedUtxos = [];
  let fee = 0;
  let total = 0;

  // The maximum number of UTXOs that will be included in a transaction
  //
  let MaxNumUtxos = 666;

  console.log(`selecting from ${selectedDustArray.length} outputs for address: ${addresses}`);
  while (selectedUtxos.length < MaxNumUtxos && selectedDustArray.length > 0) {
    const utxo =  selectedDustArray.pop();
    const amount = utxo.amount * 100000000;
    selectedUtxos.push({txid: utxo.txid, vout: utxo.vout});
    total = total + amount;
  }

  console.log(`Creating txn to send ${selectedUtxos.length} utxos to ${addresses}`);
  const send = {};
  let sendAmount = (total - fee) / 100000000;
  send[addresses] = sendAmount;
  let rawTxn = await createrawtransaction(selectedUtxos, send).catch((err) => {
    console.log('createrawtransaction', err);
    process.exit(0);
  });
  let signedTxn = await signrawtransaction(rawTxn).catch((err) => {
    console.log('signrawtransaction',err);
    process.exit(0);
  });
  let decoded = await decoderawtransaction(signedTxn.hex).catch((err) => {
    console.log('decoderawtransaction', err);
    process.exit(0);
  });
  // Calculate fee based on signed txn size
  //
  console.log('Txn size: ', decoded.size);
  fee = (decoded.size * 10) + 148;
  console.log('Calculated Fee: ', fee);
  sendAmount = (total - fee) / 100000000;
  const {confirmTxn} = await inquirer.prompt([
    {
      type: 'list',
      name: 'confirmTxn',
      message: `Send ${sendAmount} to ${addresses} with fee ${fee / 100000000}? Total amount: ${total / 100000000}`,
      choices: ['Send', 'Cancel'],
    },
  ]);
  if (confirmTxn === 'Cancel') {
    console.log('Aborted by user.');
    process.exit(0);
  }
  // Recreate the txn with the approved fee
  //
  send[addresses] = sendAmount;
  rawTxn = await createrawtransaction(selectedUtxos, send).catch((err) => console.log('createrawtransaction', err));
  signedTxn = await signrawtransaction(rawTxn).catch((err) => console.log('signrawtransaction',err));
  decoded = await decoderawtransaction(signedTxn.hex).catch((err) => console.log('decoderawtransaction', err));
  // Send the transaction
  //
  const txid = await sendrawtransaction(signedTxn.hex).catch((err) => console.log(err));
  console.log('Sent!', txid);
}

main().catch(err => console.log(err));
