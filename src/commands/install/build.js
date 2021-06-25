const shell = require('shelljs');
const SYSTYPE = shell.exec("echo -n $(lscpu | head -1 | tr -s ' ' | cut -d ' ' -f2)");

const buildDocker = `docker build -t ${DockerHub.DockerHub}/blackcoin-more-ubase-${SYSTYPE}:${branch.branch} - --network=host < /home/${process.env.USER}/git/blk.js/src/commands/install/moreBuilder/Dockerfile.ubase-${SYSTYPE}-${branch.branch}
# ubuntu (package with full ubuntu distro)
  docker build -t ${DockerHub.DockerHub}/blackcoin-more-ubuntu-${SYSTYPE}:${branch.branch} - --network=host < /home/${process.env.USER}/git/blk.js/src/commands/install/moreBuilder/Dockerfile.ubuntu-${SYSTYPE}-${branch.branch}
  docker image push ${DockerHub.DockerHub}/blackcoin-more-ubuntu-${SYSTYPE}:${branch.branch}
# minimal (only package binaries and scripts)
docker run -itd  --network=host --name ubase ${DockerHub.DockerHub}/blackcoin-more-ubase-${SYSTYPE}:${branch.branch} bash
docker cp ubase:/parts /home/${process.env.USER}/git/blk.js/src/commands/install/moreBuilder
cd /home/${process.env.USER}/git/blk.js/src/commands/install/moreBuilder
tar -C parts -c . | docker import - ${DockerHub.DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch}
docker image push ${DockerHub.DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch}
docker container stop ubase`

module.exports = buildDocker