const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');


// download latest Dockerfiles
const ubase	= 'https://raw.githubusercontent.com/CoinBlack/blackcoin-more/add-jenkins/contrib/docker/Dockerfile.ubase'
const ubuntu ='https://raw.githubusercontent.com/CoinBlack/blackcoin-more/add-jenkins/contrib/docker/Dockerfile.ubuntu'
  
const install = async () => {
  // DockerHub Account

  DockerHub = await inquirer.prompt([{
    name: "DockerHub",
    type: "input",
    message: "What is your DockerHub Account Name? ",
    default: "blackcoinnl"
  }])

  // Git Account

  HubLab = await inquirer.prompt([{
    name: "HubLab",
    type: "input",
    message: "Github or Gitlab? ",
    default: "github"
  }])

  Git = await inquirer.prompt([{
    name: "Git",
    type: "input",
    message: "Git account to use? ",
    default: "CoinBlack"
  }])

  // Git branch

  branch = await inquirer.prompt([{
    name: "branch",
    type: "input",
    message: "What branch/version? ",
    default: "v2.13.2.8"
  }])

  // x11 Desktop QT?
  X11 = await inquirer.prompt([{
    name: "X11",
    type: "input",
    message: "Are you going to need X11docker for QT (visual) client? ",
    default: "no"
  }])

  // timezone
  timezone = await inquirer.prompt([{
    name: "timezone",
    type: "input",
    message: "What is your timezone? ",
    default: "America/Los_Angeles"
  }])

  shell.echo(`DockerHub Account: ${DockerHub.DockerHub}`)
  shell.echo(`Git Account: ${Git.Git}`)
  shell.echo(branch.branch)
  shell.echo(timezone.timezone)
  const SYSTYPE = shell.exec("echo -n $(lscpu | head -1 | tr -s ' ' | cut -d ' ' -f2)");

  // build Dockerfiles
  const moreBuilder = `/home/${process.env.USER}/BlackcoinMoreBuilder/`
  // check that the directory exists
  fs.exists((moreBuilder), exists => {
    console.log(exists ? "" 
                      : fs.mkdirSync(moreBuilder));
  });
  

  // ubase
  const ubaseDockerfile = require(`${__dirname}/install/ubase.js`)
  const ubaseDockerfileName = `${moreBuilder}Dockerfile.ubase-${SYSTYPE}-${branch.branch}`
  fs.writeFileSync( ubaseDockerfileName, ubaseDockerfile);
  // console.log(fs.readFileSync(ubaseDockerfileName, "utf8"));
  // ubuntu
  const ubuntuDockerfile = require(`${__dirname}/install/ubuntu.js`)
  const ubuntuDockerfileName = `${moreBuilder}Dockerfile.ubuntu-${SYSTYPE}-${branch.branch}`
  fs.writeFileSync( ubuntuDockerfileName, ubuntuDockerfile);
  // console.log(fs.readFileSync(ubuntuDockerfileName, "utf8"));

  // build
  const buildDocker = require(`${__dirname}/install/build.js`)
  const buildDockerName = `${moreBuilder}build.sh`
  fs.writeFileSync( buildDockerName, buildDocker);
  // console.log(fs.readFileSync(buildDockerName, "utf8"));

  // examine files run yourself 
  console.log(`

    Examine the files in ${moreBuilder} if you like, 
                                          then execute:
                              bash ${buildDockerName}

      Then start docker with 
  docker run -itd  -v /home/${process.env.USER}/.blackmore-docker:/.blackmore --network=host --name=blackmore ${DockerHub:DockerHub}/blackcoin-more-minimal-${SYSTYPE}:${branch.branch} blackmored

    `)
  // enable autobuild
  // const child_process = require('child_process');

  // const build = child_process.exec(`bash ${buildDockerName}`,
  //     function (error, stdout, stderr) {
  //         console.log('stdout: ' + stdout);
  //         console.log('stderr: ' + stderr);
  //         if (error !== null) {
  //              console.log('exec error: ' + error);
  //         }
  //     });
  // build();
}

module.exports = install