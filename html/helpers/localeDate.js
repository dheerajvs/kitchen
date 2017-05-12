const moment = require('moment');

module.exports = (dateString) => {
  return moment(dateString).format('ll');
};
