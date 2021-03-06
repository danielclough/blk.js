const ubaseDockerfile = `FROM ubuntu
ENV TZ=${timezone.timezone}
ENV DEBIAN_FRONTEND=noninteractive
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \\
      apt-get update && apt-get install -yqq \\
                          wget \\
                          jq \\
                          bc \\
                          git \\
                          make \\
                          file \\
                          autoconf \\
                          automake \\
                          libtool \\
                          libevent-dev \\
                          build-essential \\
                          autotools-dev \\
                          pkg-config \\
                          bsdmainutils \\
                          python3 \\
                          libevent-dev \\
                          libboost-all-dev \\
                          libminiupnpc-dev \\
                          libzmq3-dev \\
                          libssl-dev \\
                          gperf \\
                        # for qt
                          libqrencode-dev \\
                          libprotobuf-dev \\
                          protobuf-compiler \\
                          libqt5core5a \\
                          libqt5dbus5 \\
                          libqt5gui5 \\
                          qttools5-dev \\
                          qttools5-dev-tools 
#
# Build Blackcoin More
#
RUN git clone -b master https://github.com/CoinBlack/blackcoin-more.git && \\
      (wget https://distfiles.gentoo.org/distfiles/db-6.2.38.tar.gz && \\
      tar -xvf db-6.2.38.tar.gz && \\
      cd db-6.2.38/build_unix && \\
      mkdir -p build && \\
      BDB_PREFIX=\$(pwd)/build && \\
      ../dist/configure --disable-shared  -disable-replication --enable-cxx --with-pic  --prefix=\$BDB_PREFIX --with-gui=no --enable-glibc-back-compat --enable-reduce-exports --disable-tests --disable-bench --disable-gui-tests --disable-man && \\
      make install && \\
      cd ../.. && \\
      cd blackcoin-more/  && ./autogen.sh && \\
      ./configure CPPFLAGS=\"-I\${BDB_PREFIX}/include/ -O2\" LDFLAGS=\"-L\${BDB_PREFIX}/lib/\" --disable-tests --disable-bench --enable-reduce-exports && \\
      make -j4 && \\
      cd src/ && \\
      strip blackmore*) && \\
#
# Prepare for minimal package
#
  cp /blackcoin-more/src/blackmored /usr/local/bin/ && \\
  cp /blackcoin-more/src/blackmore-cli /usr/local/bin/ && \\
  cp /blackcoin-more/src/qt/blackmore-qt /usr/local/bin/ && \\
  cp /blackcoin-more/contrib/blk /usr/local/bin/ && \\
  mkdir /parts  && \\
  cd  /parts  && \\
  cp --parents /usr/local/bin/blk ./ && \\
  cp --parents /usr/local/bin/blackmored ./ && \\
  for i in \`ldd /usr/local/bin/blackmored | grep -v linux-vdso.so.1 | awk {\' if ( \$3 == \"\") print \$1; else print \$3 \'}\`; do cp --parents \$i ./; done && \\
  cp --parents /usr/local/bin/blackmore-cli ./ && \\
  for i in \`ldd /usr/local/bin/blackmore-cli | grep -v linux-vdso.so.1 | awk {\' if ( \$3 == \"\") print \$1; else print \$3 \'}\`; do cp --parents \$i ./; done && \\
  cp --parents /usr/local/bin/blackmore-qt ./ && \\
  for i in \`ldd /usr/local/bin/blackmore-qt | grep -v linux-vdso.so.1 | awk {\' if ( \$3 == \"\") print \$1; else print \$3 \'}\`; do cp --parents \$i ./; done && \\
  cp /usr/bin/bc --parents ./ && \\
  for i in \`ldd /usr/bin/bc | grep -v linux-vdso.so.1 | awk {\' if ( \$3 == \"\") print \$1; else print \$3 \'}\`; do cp --parents \$i ./; done && \\
  cp /usr/bin/jq --parents ./ && \\
  for i in \`ldd /usr/bin/jq | grep -v linux-vdso.so.1 | grep -v libjq.so.1 | awk {\' if ( \$3 == \"\") print \$1; else print \$3 \'}\`; do cp --parents \$i ./; done
  #
  # Expose the port for the RPC interface
  #
  EXPOSE 15714/tcp
`

module.exports = ubaseDockerfile