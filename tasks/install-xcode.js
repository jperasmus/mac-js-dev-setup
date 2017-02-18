require('shelljs/global');
const os = require('os');

module.exports = (task) => {
  const successResponse = `✅ ${task}`;

  if (os.platform() !== 'darwin') {
    console.log(`⚠️ This script is only optimized for running on a Mac and not for "${os.platform()}"`);
    return Promise.resolve(successResponse);
  }

  if (which('xcode-select')) {
    console.log(`ℹ️ xcode already installed at "${which('xcode-select')}"`);
    return Promise.resolve(successResponse);
  }

  return new Promise((resolve, reject) => {
    exec('curl -s https://github.com/timsutton/osx-vm-templates/blob/ce8df8a7468faa7c5312444ece1b977c1b2f77a4/scripts/xcode-cli-tools.sh | bash', (code, stdout, stderr) => {
      if (code) {
        return reject(`❌ ${task}`);
      }
      resolve(successResponse);
    });
  })
};
