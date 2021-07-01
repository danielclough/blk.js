# blk.js

blk.js is a command line utility for blackcoin-more using the client's JSON-RPC API.

## Install
```
npm i -g blk.js
```
or, for development:
```
npm i blk.js
cd blk.js
npm link
```
## Install Blackcoin-More with Docker

`blk install`

### Client Config

`.blackmore/blackmore.conf` must contain the same `rpcuser` and `rpcpassword` as your blk.js `.env` file.
This requires root, so you need to add that manually.
You can copy and pate the output during install.
```bash
rpcuser=
rpcpassword=
```

#### SSL
See [Enabling SSL on original client](https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon).

If you're using this to connect to blackmored across a network it is highly
recommended to enable `ssl`, otherwise an attacker may intercept your RPC credentials
resulting in theft of your blackcoins.

When enabling `ssl` by setting the configuration option to `true`, the `sslStrict`
option (verifies the server certificate) will also be enabled by default. It is 
highly recommended to specify the `sslCa` as well, even if your blackmored has
a certificate signed by an actual CA, to ensure you are connecting
to your own blackmored.

```js
var client = new blackcoin.Client({
  host: 'localhost',
  port: 15715,
  user: 'username',
  pass: 'password',
  ssl: true,
  sslStrict: true,
  sslCa: fs.readFileSync(__dirname + '/server.cert')
});
```

If your using a self signed certificate generated with something like 

`openssl x509 -req -days 365 -in server.cert -signkey server.key -out server.cert`

then `sslStrict` should be set to `false` because by defult node wont work with 
untrusted certificates. 
