require('shelljs/global');
const os = require('os');

const installGit = () => new Promise((resolve, reject) => {
  exec('brew install git', (code, stdout, stderr) => {
    if (code) {
      return reject();
    }
    resolve();
  });
});

const configureGit = () => new Promise((resolve, reject) => {
  exec('git config --global user.name "JP Erasmus" && git config --global user.email "jperasmus11@gmail.com"', (code, stdout, stderr) => {
    if (code) {
      return reject();
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

  if (which('git')) {
    console.log(`ℹ️ git already installed at "${which('git')}"`);
    return Promise.resolve(successResponse);
  }

  return new Promise((resolve, reject) => {
    installGit()
      .then(configureGit)
      .then(() => resolve(successResponse))
      .catch(() => reject(`❌ ${task}`));
  });
};
