(function(mdc) {
  'use strict';

  var catMenuEl = document.querySelector('#cat-menu');
  var catMenu = new mdc.menu.MDCSimpleMenu(catMenuEl);
  var toggle = document.querySelector('#cat-toggle');
  toggle.addEventListener('click', function() {
    console.log('open: ' + !catMenu.open)
    catMenu.open = !catMenu.open;
  });
}(mdc));
