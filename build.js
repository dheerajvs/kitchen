const fs = require('fs');
const Handlebars = require('handlebars');
const glob = require('glob');
const grayMatter = require('gray-matter');

const duration = require('./html/helpers/duration');
const urlName = require('./html/helpers/urlName');

// Read Markdown data files
const recipes = glob.sync('html/data/_recipes/*.md')
  .reduce(
    (acc, fileName) => {
      acc.push(grayMatter.read(fileName).data);
      return acc;
    },
    []
  )
  .sort((a, b) => a.datePublished < b.datePublished);

// Register handlebars helpers
require('handlebars-helpers')({handlebars: Handlebars});
Handlebars.registerHelper('duration', duration);
Handlebars.registerHelper('urlName', urlName);

const defaultTemplate = fs.readFileSync('html/layouts/default.hbs', 'utf8');

// Generate /index.html
Handlebars.registerPartial('body', fs.readFileSync('html/pages/index.html', 'utf8'));
const indexTemplate = Handlebars.compile(defaultTemplate);
fs.writeFileSync('public/index.html', indexTemplate({baseUrl: '', recipes}));

// Generate /recipe/:recipe.html
Handlebars.registerPartial('body', fs.readFileSync('html/pages/recipe.html', 'utf8'));
const recipeTemplate = Handlebars.compile(defaultTemplate);

if (!fs.existsSync('public/recipe')) {
  fs.mkdirSync('public/recipe');
}

recipes.forEach(recipe => {
  const recipeHtml = recipeTemplate({baseUrl: '../', recipe});
  fs.writeFileSync(`public/recipe/${urlName(recipe.title)}.html`, recipeHtml);
});

// Generate /categories.html
Handlebars.registerPartial('body', fs.readFileSync('html/pages/categories.html', 'utf8'));
const categoriesTemplate = Handlebars.compile(defaultTemplate);
fs.writeFileSync('public/categories.html', categoriesTemplate({baseUrl: ''}));

console.log('build: completed');
