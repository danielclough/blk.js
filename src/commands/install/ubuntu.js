const shell = require('shelljs');
const SYSTYPE = shell.exec("echo -n $(lscpu | head -1 | tr -s ' ' | cut -d ' ' -f2)");

const ubuntuDockerfile = `FROM ${DockerHub.DockerHub}/blackcoin-more-ubase-${SYSTYPE}:${branch.branch} as build
RUN echo "Building Ubuntu Package"
#
# Collect dependencies
#
FROM ubuntu
ENV TZ=${timezone.timezone}
ENV DEBIAN_FRONTEND=noninteractive
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \\
		apt-get update && \\
			apt-get -yqq upgrade && \\
				apt-get  -yqq install \\
						libboost-chrono-dev \\
						libboost-filesystem-dev \\
						libboost-program-options-dev \\
						libboost-system-dev \\
						libboost-test-dev \\
						libboost-thread-dev \\
						libzmq3-dev \\
						libminiupnpc-dev \\
						libevent-dev \\
						libssl-dev \\
						libprotobuf-dev \\
						protobuf-compiler \\
                        libqrencode-dev \\
						libqt5core5a \\
						libqt5dbus5 \\
						libqt5gui5 \\
						qttools5-dev \\
						qttools5-dev-tools 
#
# Copy the binaries from the build to our new container
#
COPY --from=build /blackcoin-more/src/blackmored /usr/local/bin
COPY --from=build /blackcoin-more/src/blackmore-cli /usr/local/bin
COPY --from=build /blackcoin-more/src/qt/blackmore-qt /usr/local/bin
COPY --from=build /usr/bin/bc /usr/bin
COPY --from=build /usr/bin/jq /usr/bin
#
# Expose the port for the RPC interface
#
EXPOSE 15714/tcp
`

module.exports = ubuntuDockerfile