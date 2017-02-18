require('shelljs/global');
const workspaceDir = '~/Projects';

module.exports = (task) => {
  const successResponse = `✅ ${task}`;

  if (test('-d', workspaceDir)) {
    console.log('ℹ️ "Projects" directory already exists');
    return Promise.resolve(successResponse);
  }

  return new Promise((resolve, reject) => {
    mkdir('-p', workspaceDir);
    resolve(successResponse);
  })
};
