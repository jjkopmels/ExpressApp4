if (process.env.NODE_ENV === 'production') {
  console.log("root detected production mode");
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
