const moment = require('moment');

module.exports = dateString => moment(dateString).format('ll');
