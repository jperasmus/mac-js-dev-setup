require('shelljs/global');
const os = require('os');

const installBrew = () => new Promise((resolve, reject) => {
  exec('ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null', (code, stdout, stderr) => {
    if (code) {
      return reject(code);
    }

    resolve();
  });
});

const addBrewToPath = () => new Promise((resolve, reject) => {
  exec(`echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile`, (code, stdout, stderr) => {
    if (code) {
      return reject(code);
    }

    resolve();
  });
});

const updateBrew = () => new Promise((resolve, reject) => {
  exec('brew update', (code, stdout, stderr) => {
    if (code) {
      return reject(code);
    }

    resolve();
  });
});

module.exports = (task) => {
  const successResponse = `✅ ${task}`;

  if (os.platform() !== 'darwin') {
    console.log(`⚠️ This script is only optimized for running on a Mac and not for "${os.platform()}"`);
    return Promise.resolve(successResponse);
  }

  if (which('brew')) {
    console.log(`ℹ️ homebrew already installed at "${which('brew')}"`);
    return Promise.resolve(successResponse);
  }

  return new Promise((resolve, reject) => {
    installBrew()
      .then(addBrewToPath)
      .then(updateBrew)
      .then(() => resolve(successResponse))
      .catch(() => reject(`❌ ${task}`));
  });
};
