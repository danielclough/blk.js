const shell = require('shelljs');
const SYSTYPE = shell.exec("echo -n $(lscpu | head -1 | tr -s ' ' | cut -d ' ' -f2)");

const buildDocker = `docker build -t ${DockerHub.DockerHub}/blackcoin-more-ubase-${SYSTYPE}:${branch.branch} - --network=host < /home/${process.env.USER}/BlackcoinMoreBuilder/Dockerfile.ubase-${SYSTYPE}-${branch.branch}
# ubuntu (package with full ubuntu distro)
  docker build -t ${DockerHub.DockerHub}/blackcoin-more-ubuntu-${SYSTYPE}:${branch.branch} - --network=host < /home/${process.env.USER}/BlackcoinMoreBuilder/Dockerfile.ubuntu-${SYSTYPE}-${branch.branch}
  docker image push ${DockerHub.DockerHub}/blackcoin-more-ubuntu-${SYSTYPE}:${branch.branch}
# minimal (only package binaries and scripts)
docker run -itd  --network=host --name ubase ${DockerHub.DockerHub}/blackcoin-more-ubase-${SYSTYPE}:${branch.branch} bash
docker cp ubase:/parts /home/${process.env.USER}/BlackcoinMoreBuilder
cd /home/${process.env.USER}/BlackcoinMoreBuilder
tar -C parts -c . | docker import - ${DockerHub.DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch}
docker image push ${DockerHub.DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch}
docker container stop ubase

echo sudo to create /home/${process.env.USER}/.blackmore/blackmore.conf as root
sudo cat << EOF > /home/${process.env.USER}/.blackmore/blackmore.conf
rpcuser=${process.env.USER}
rpcpassword=${process.env.RPCPASSWORD}
EOF
docker run -itd  -v /home/${process.env.USER}/.blackmore:/.blackmore --network=host --name=blackmore ${DockerHub.DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch} blackmored
echo Install Complete
`

module.exports = buildDocker