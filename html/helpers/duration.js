const moment = require('moment');

module.exports = (totalTimeHours, totalTimeMinutes) => (
  moment.duration(`PT${totalTimeHours}H${totalTimeMinutes}M`).humanize()
);
