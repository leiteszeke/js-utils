import { Generic } from '../types';

class I18n {
  langFiles: Generic = [];

  localeFiles: Generic = [];

  language: string = '';

  defaultLocale: string = 'es_AR';

  locale: string = '';

  instance = (): Generic => {
    this.locale = this.getLocale();
    const [lang] = this.locale.split('_');
    this.language = lang;

    return {
      ...this.langFiles[this.language],
      ...this.localeFiles[this.locale],
    };
  };

  setFiles = (langFiles: Generic, localeFiles: Generic): void => {
    this.langFiles = langFiles;
    this.localeFiles = localeFiles;
  };

  setLanguage = (lang: string): void => {
    this.language = lang;
  };

  getLocale = (): string => {
    if (this.language !== '') return this.language;

    const body = document.getElementsByTagName('body')[0];

    if (body.getAttribute('data-language') !== null) {
      return body.getAttribute('data-language') || this.defaultLocale;
    }

    const html = document.getElementsByTagName('html')[0];

    if (html.getAttribute('lang') !== null) {
      return html.getAttribute('lang') || this.defaultLocale;
    }

    return this.defaultLocale;
  };

  getLanguage = (): string => this.language;

  exists = (search: string): Boolean => this.translate(search).length > 0;

  translate = (search: string, params: Generic = {}): string => {
    let translate: Generic = this.instance();
    const levels = search.split('.');
    let translatedValue = '';

    levels.forEach((value: string) => {
      if (typeof translate[value] === 'undefined') {
        translatedValue = '';

        // eslint-disable-next-line
        console.warn(`"${search}" has not translation for ${this.getLocale()}`);

        return;
      }

      translate = translate[value];
      translatedValue = translate[value];
    });

    if (translatedValue !== '' && params) {
      Object.entries(params).map(([key, value]) => {
        translatedValue = translatedValue.replace(
          new RegExp(`%${key}%`, 'g'),
          value,
        );

        return true;
      });
    }

    return translatedValue;
  };
}

export default I18n;
