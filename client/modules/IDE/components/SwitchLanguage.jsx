import React from 'react';
import i18n from '../../../i18n';
function SwitchLanguage(props) {
  return (
    <ul>
      <li>            <a onClick={() => i18n.changeLanguage('en')}>en</a>
      </li>
      <li>
        <a onClick={() => i18n.changeLanguage('de')}>de</a>nop
      </li>
    </ul>
  );
}

export default SwitchLanguage;
