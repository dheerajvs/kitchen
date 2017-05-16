const fs = require('fs');
const Handlebars = require('handlebars');
const glob = require('glob');
const grayMatter = require('gray-matter');

const helpers = require('handlebars-helpers')({handlebars: Handlebars});
const markdown = require('helper-markdown');
const duration = require('./html/helpers/duration');
const localeDate = require('./html/helpers/localeDate');
const urlName = require('./html/helpers/urlName');

// Read Markdown data files
const recipes = glob.sync('html/data/_recipes/*.md').reduce(
  (acc, fileName) => {
    acc.push(grayMatter.read(fileName).data);
    return acc;
  },
  []
);

// Register handlebars helpers
// Handlebars.registerHelper('helpers', helpers);
Handlebars.registerHelper('markdown', markdown);
Handlebars.registerHelper('duration', duration);
Handlebars.registerHelper('localeDate', localeDate);
Handlebars.registerHelper('urlName', urlName);

// Generate /index.html
Handlebars.registerPartial('body', fs.readFileSync('html/pages/index.html', 'utf8'));
const indexTemplate = Handlebars.compile(fs.readFileSync('html/layouts/default.hbs', 'utf8'));
fs.writeFileSync('public/index.html', indexTemplate({baseUrl: '', recipes}));

// Generate /recipe/:recipe.html
Handlebars.registerPartial('body', fs.readFileSync('html/pages/recipe.html', 'utf8'));
const recipeTemplate = Handlebars.compile(fs.readFileSync('html/layouts/default.hbs', 'utf8'));

if (!fs.existsSync('public/recipe')) {
  fs.mkdirSync('public/recipe');
}

recipes.forEach(recipe => {
  const recipeHtml = recipeTemplate({baseUrl: '../', recipe});
  fs.writeFileSync(`public/recipe/${urlName(recipe.title)}.html`, recipeHtml);
});

console.log('build: completed');
