module.exports = function(task) {
  return new Promise(function(resolve, reject) {
    resolve('✅ ' + task);
  })
};
