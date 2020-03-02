import {browser, by, element, promise} from 'protractor';
import {Browsable} from './nav.fragment';
import {ArticleFormPage} from './article-form.po';
import {ArticleListPage} from './article-list.po';

export class Homepage implements Browsable {


  constructor(private navigation: Browsable) {
  }

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .navbar-brand')).getText() as Promise<string>;
  }

  navigateToFormPage(): promise.Promise<ArticleFormPage> {
    return this.navigation.navigateToFormPage();
  }

  navigateToListPage(): promise.Promise<ArticleListPage> {
    return this.navigation.navigateToListPage();
  }
}
