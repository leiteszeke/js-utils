// Interfaces
import { MyObject } from '../interfaces';

class I18n {
  langFiles: MyObject = [];
  localeFiles: MyObject = [];
  language: string = '';
  defaultLocale: string = 'es_AR';
  locale: string = '';

  private getInstance = (): MyObject => {
    this.locale = this.getLocale();
    this.language = this.locale.split('_')[0];

    return {
      ...this.langFiles[this.language],
      ...this.localeFiles[this.locale],
    };
  };

  public setFiles = (langFiles: MyObject, localeFiles: MyObject): void => {
    this.langFiles = langFiles;
    this.localeFiles = localeFiles;
  };

  public setLanguage = (lang: string): void => {
    this.language = lang;
  };

  private getLocale = (): string => {
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

  private getLanguage = (): string => this.language;

  public exists = (search: string): Boolean =>
    this.translate(search).length > 0;

  public translate = (search: string, params: MyObject = {}): string => {
    let translate: MyObject = this.getInstance();
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
      });
    }

    return translatedValue;
  };
}

export default I18n;
