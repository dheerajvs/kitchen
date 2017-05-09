const fs = require('fs');
const Yaml = require('yamljs');
const Handlebars = require('handlebars');

const recipeData = Yaml.load('html/data/recipes.yml');
// fs.mkdirSync('public/recipe');

Handlebars.registerPartial('body', fs.readFileSync('html/pages/index.html', 'utf8'));
const indexTemplate = Handlebars.compile(fs.readFileSync('html/layouts/default.hbs', 'utf8'));
fs.writeFileSync('public/index.html', indexTemplate(recipeData));

Handlebars.registerPartial('body', fs.readFileSync('html/pages/recipe.html', 'utf8'));
const recipeTemplate = Handlebars.compile(fs.readFileSync('html/layouts/default.hbs', 'utf8'));

recipeData.forEach(recipe => {
  const recipeHtml = recipeTemplate(recipe);
  fs.writeFileSync(`public/recipe/${recipe.urlName}.html`, recipeHtml);
});
