import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SquareLogoIcon from '../../../images/p5js-square-logo.svg';
// import PlayIcon from '../../../images/play.svg';
import AsteriskIcon from '../../../images/p5-asterisk.svg';

function About(props) {
  const { t } = useTranslation('translations');
  return (
    <div className="about__content">
      <Helmet>
        <title>p5.js Web Editor | {t('Menu.Help.About')} </title>
      </Helmet>
      <div className="about__content-column">
        <SquareLogoIcon className="about__logo" role="img" aria-label="p5.js Logo" focusable="false" />
        {/* Video button to hello p5 video page */}
        {/* <p className="about__play-video">
          <a
            href="http://hello.p5js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayIcon className="about__play-video-button" title="Play Hello Video" />
          Play hello! video</a>
        </p>  */}
      </div>
      <div className="about__content-column">
        <h3 className="about__content-column-title">{t('Menu.Help.About.NewP5')}</h3>
        <p className="about__content-column-list">
          <a
            href="https://p5js.org/examples/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AsteriskIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            {t('Menu.Help.About.Examples')}
          </a>
        </p>
        <p className="about__content-column-list">
          <a
            href="https://p5js.org/learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AsteriskIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            {t('Menu.Help.About.Learn')}
          </a>
        </p>
      </div>
      <div className="about__content-column">
        <h3 className="about__content-column-title">{t('Menu.Help.About.Resources')}</h3>
        <p className="about__content-column-list">
          <a
            href="https://p5js.org/libraries/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AsteriskIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            {t('Menu.Help.About.Libraries')}
          </a>
        </p>
        <p className="about__content-column-list">
          <a
            href="https://p5js.org/reference/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AsteriskIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            {t('Menu.Help.Reference')}
          </a>
        </p>
        <p className="about__content-column-list">
          <a
            href="https://discourse.processing.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AsteriskIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            {t('Menu.Help.About.Forum')}
          </a>
        </p>
      </div>
      <div className="about__footer">
        <p className="about__footer-list">
          <a
            href="https://github.com/processing/p5.js-web-editor"
            target="_blank"
            rel="noopener noreferrer"
          >{t('Menu.Help.About.Contribute')}
          </a>
        </p>
        <p className="about__footer-list">
          <a
            href="https://github.com/processing/p5.js-web-editor/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >{t('Menu.Help.About.Report')}
          </a>
        </p>
        <p className="about__footer-list">
          <a
            href="https://twitter.com/p5xjs?lang=en"
            target="_blank"
            rel="noopener noreferrer"
          >Twitter
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
