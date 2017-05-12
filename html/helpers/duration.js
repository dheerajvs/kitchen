const moment = require('moment');

module.exports = (duration) => {
  return moment.duration(duration).humanize();
};
