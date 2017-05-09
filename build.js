const fs = require('fs');
const Yaml = require('yamljs');
const Handlebars = require('handlebars');

Handlebars.registerPartial('body', fs.readFileSync('html/pages/recipe.html', 'utf8'));
const recipeTemplate = Handlebars.compile(fs.readFileSync('html/layouts/default.hbs', 'utf8'));

const data = Yaml.load('html/data/recipes.yml');

const recipeHtml = recipeTemplate(data[0]);
fs.writeFileSync('public/recipe.html', recipeHtml);
