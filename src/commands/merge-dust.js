import inquirer from 'inquirer'
import {
  createrawtransaction,
  decoderawtransaction,
  sendrawtransaction,
  signrawtransaction,
} from '../depends/blackcoin-rawtx.js'
import {
  listunspent,
} from '../depends/blackcoin-wallet.js'

async function mergeDust() {
  let dustAmount;
  let sendToAddress;

  const dust = 9999999

  // const {dust} = await inquirer.prompt([
  //   {
  //     name: 'dust',
  //     message: `Enter amount in Satoshis to use as dust threshold, or press ENTER to use default (5500 Satoshis).`,
  //     default: 5500
  //   },
  // ]);

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
  const list = await listunspent();
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

  const addresses = addressesWithDust[0];

  // const {addresses} = await inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'addresses',
  //     message: 'Select an address',
  //     choices: addressesWithDust,
  //   },
  // ]);

  const selectedDustArray = sortedByAddress[addresses];

  const {confirmAddress} = 'Continue'


  const MaxNumUtxos = 677;
  const totalDustTX = selectedDustArray.length

  const repeat = totalDustTX/MaxNumUtxos
  console.log(`Try: \n for n in {1..${repeat}}; do blk merge-dust; done`);

  // const {confirmAddress} = await inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'confirmAddress',
  //     message: `Selected address: ${addresses}? Total Dust UTXOs: ${totalDustTX}.`,
  //     choices: ['Continue', 'Cancel'],
  //   },
  // ]);

  // if (confirmAddress === 'Cancel') {
  //   console.log('Aborted by user.');
  //   process.exit(0);
  // }
  

  const selectedUtxos = [];
  let fee = 0;
  let total = 0;

  // The maximum number of UTXOs that will be included in a transaction
  //

  console.log(`selecting from ${totalDustTX} outputs for address: ${addresses}`);
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

  const confirmTxn = 'Send'


  // const {confirmTxn} = await inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'confirmTxn',
  //     message: `Send ${sendAmount} to ${addresses} with fee ${fee / 100000000}? Total amount: ${total / 100000000}`,
  //     choices: ['Send', 'Cancel'],
  //   },

  // if (confirmTxn === 'Cancel') {
  //   console.log('Aborted by user.');
  //   process.exit(0);
  // }
  // ]);

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

mergeDust().catch(err => console.log(err));

export default mergeDust