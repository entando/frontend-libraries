import React from 'react';
import PropTypes from 'prop-types';

if (window.FontFace) {
  const robotoFontRegular = new FontFace('Roboto', 'url(fonts/Font_Roboto/Roboto-Regular.ttf)', { style: 'normal', weight: 400 });
  robotoFontRegular.load();
  const robotoFontMedium = new FontFace('Roboto', 'url(fonts/Font_Roboto/Roboto-Medium.ttf)', { style: 'normal', weight: 500 });
  robotoFontMedium.load();
  document.fonts.add(robotoFontRegular);
  document.fonts.add(robotoFontMedium);
}

const LoginPage = ({ children }) => (
  <div className="LoginPage" style={{ backgroundImage: 'url(images/Stack.png)' }}>
    {children}
  </div>
);

LoginPage.defaultProps = {
  children: null,
};

LoginPage.propTypes = {
  children: PropTypes.node,
};

export default LoginPage;
