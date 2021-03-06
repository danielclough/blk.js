const parseArgs = require('commander'); 
const inquirer = require('inquirer');
const {
  listunspent,
} = require('../depends/blackcoin-wallet');

const {
  createrawtransaction,
  sendrawtransaction,
  signrawtransaction,
} = require('../depends/blackcoin-rawtx');

/*
  If sendFrom and sendTo are passed as arguments script will run without user interaction.
  example:
  node index.js --sendFrom='BF4HmRXfx5Vu6CF9ACW1txRUidqGGHMH64' --sendTo='B8YyHfCd6Kf1Zr68BriWKTbTuPUAQacnr1'

  You can specify the minimum utxo size to send.  Default is 100000000 (1 BLK)
  node index.js --minUtxoSize=<amount in satoshis>
*/

async function main(to, from) {

  const list = await listunspent();

  const addresses = new Set();
  const utxosSortedByAddress = list.reduce( (accumulator, utxo) => {
    const address = utxo.address;
    addresses.add(address);
    if (!accumulator[address]) {
      accumulator[address] = [];
    }
    accumulator[address].push(utxo);
    return accumulator;
  }, {});

  const addressArray = Array.from(addresses);

  if (addressArray.length === 0) {
    console.log('No UTXOs found with 10 or more confirmations.');
    process.exit(0);
  }

  let sendFrom = from ? from : '';
  if (!from || !to) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'sendFrom',
        message: `Select an address to migrate:`,
        choices: addressArray,
        default: addressArray[0]
      },
    ]);
    sendFrom = response.sendFrom;
  }
  const utxoArray = utxosSortedByAddress[sendFrom];

  let sendTo = to ? to : '';
  if (!from || !to) {
    const response = await inquirer.prompt([
      {
        name: 'sendTo',
        message: `Enter address to send to:`
      },
    ]);
    sendTo = response.sendTo;
    if (!sendTo) {
      console.log('Send To address cannot be blank.');
      process.exit(0);
    }
  }

  if (!from || !to) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'list',
        name: 'confirm',
        message: `Migrate ${utxoArray.length} UTXOs from ${sendFrom} to ${sendTo}?`,
        choices: ['Continue', 'Cancel']
      },
    ]);
    if (confirm === 'Cancel') {
      console.log('Aborted by user.');
      process.exit(0);
    }
  }

  utxoArray.forEach( async (utxo) => {
    const amount = Math.round(utxo.amount * 100000000);
    const minUtxoSize = argv.minUtxoSize ? argv.minUtxoSize : 100000000;
    if (amount > minUtxoSize) {
      const fee = 10000;
      const sendAmount = (amount - fee) / 100000000;
      const send = {};
      send[sendTo] = sendAmount;
      console.log(`Creating txn to send ${sendAmount} from ${sendFrom} to ${sendTo}`);
      let rawTxn = await createrawtransaction([utxo], send).catch((err) => {
        console.log('createrawtransaction Error.', err);
        console.log('Error creating raw transaction with utxo:', utxo);
        process.exit(0);
      });
      const signedTxn = await signrawtransaction(rawTxn).catch((err) => {
        console.log('signrawtransaction',err);
        console.log('Error signing raw transaction:', rawTxn);
        process.exit(0);
      });
      const txid = await sendrawtransaction(signedTxn.hex).catch((err) => {
        console.log('sendrawtransaction', err);
        console.log('Error sending signed transaction hex:', signedTxn);
        process.exit(0);
      });
      console.log(`Sent ${utxo.amount} to ${sendTo}. txid: ${txid}`);
    }
  });

}

main().catch(err => console.log(err));
