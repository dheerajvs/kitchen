const slug = require('slug');

module.exports = title => slug(title, {lower: true});
