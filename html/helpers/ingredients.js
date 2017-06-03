module.exports = md => {
  const lines = md.split(/[\n\r]+/);
  const listItems = lines.reduce(
    (acc, line) => {
      const ul = '<ul class="mdc-list mdc-list--avatar-list">';
      let match;
      if ((match = line.match(/^# (.*)/))) {
        if (acc) {
          acc += '</ul>';
        }
        acc += `
          <h3 class="mdc-list-group__subheader">${match[1]}</h3>
          ${ul}
        `;
      }
      else if ((match = line.match(/^- (.*)/))) {
        if (!acc) {
          acc += ul;
        }
        acc += `
          <li class="mdc-list-item sk-multiline-list-avatar-li">
            <span class="mdc-list-item__start-detail sk-multiline-list-avatar grey-bg"></span>
            <span class="mdc-list-item__text">
              ${match[1]}
        `;
      }
      else if ((match = line.match(/^ - (.*)/))) {
        acc += `
              <span class="mdc-list-item__text__secondary">${match[1]}</span>
            </span>
          </li>
        `;
      }
      return acc;
    },
    ''
  );

  return `
    <div class="mdc-list-group">
      ${listItems}
    </div>
  `;
};
