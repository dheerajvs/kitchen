module.exports = md => {
  const lines = md.split(/[\n\r]+/);
  const listItems = lines.reduce(
    (acc, line) => {
      const ul = '<ol class="mdc-list sk-procedure-list">';
      let match;
      if ((match = line.match(/^# (.*)/))) {
        if (acc) {
          acc += '</ol>';
        }
        acc += `
          <h3 class="mdc-list-group__subheader">${match[1]}</h3>
          ${ul}
        `;
      }
      else if ((match = line.match(/^\* (.*)/))) {
        if (!acc) {
          acc += ul;
        }
        acc += `
          <li class="mdc-list-item sk-procedure-list-item">
            <span class="mdc-list-item__text">${match[1]}</span>
          </li>
        `;
      }
      return acc;
    },
    ''
  );

  return `<div class="mdc-list-group">${listItems}</div>`;
};
