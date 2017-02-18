/**
 * Entry point for dev env setup.
 *
 * The only dependency for this script is that node (>= v4) is installed to run it
 */
var exec = require('child_process').exec;

function checkNodeVersion() {
  return new Promise(function(resolve, reject) {
    console.log('Checking installed node version...');
    exec('node -v', function(error, stdout, stderr) {
      if (error) return reject(error);

      const nodeVersion = stdout.trim();
      console.log('✅ Node version "' + nodeVersion + '" found\n');
      resolve();
    });
  });
}

function installShellJS() {
  return new Promise(function(resolve, reject) {
    console.log('Installing shelljs...');
    exec('npm i shelljs', function(error, stdout, stderr) {
      if (error) return reject(error);
      console.log('✅ ShellJS installed\n');
      resolve();
    })
  });
}

function runTasks(arg) {
  return new Promise(function(resolve, reject) {
    console.log('Starting tasks...\n');

    const installXCode = require('./tasks/install-xcode');
    const installHomebrew = require('./tasks/install-homebrew');
    const installGit = require('./tasks/install-git');
    const setupProjectDir = require('./tasks/setup-projects-directory');

    installXCode('install-xcode')
      .then(() => installHomebrew('install-homebrew'))
      // confirm homebrew with doctor?
      // install finder quicklook plugins
        // - brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json qlprettypatch quicklook-csv betterzipql qlimagesize webpquicklook suspicious-package quicklookase qlvideo
      .then(() => installGit('install-git'))
      // create global .gitignore file in home dir
      // ssh config for github
      // install yarn
      .then(() => setupProjectDir('setup-projects-directory'))
      // install vim
        //  - ultimate vim rc https://github.com/amix/vimrc
      // mac system preferences. possible?
        //  - enable tab to click
      //  defaults write com.apple.dock workspaces-auto-swoosh -bool NO
      // install zsh
      // install zsh extensions (completions)
      // install oh-my-zsh
      // install google chrome
      // install heroku toolbelt
      // install chrome extensions. possible?
      // install docker for mac
      // install dash (documentation)
      // install vs code
      // install vs code plugins, etc. possible?
        //    - configure vs code as merge tool
        //    - setup command line tool
      // install slack
      // install bartender and configure
      // install anki
      // install pocket
      // install flux
      // install vlc
      // install cloudapp
      // install mysql through brew & sequelpro?
      // install google inbox? finch for google inbox?
      .then(resolve)
      .catch(reject);
  });
}

checkNodeVersion()
  .then(installShellJS)
  .then(runTasks)
  .then(console.log)
  .catch(console.error);