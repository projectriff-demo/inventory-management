import {ArticleFormPage} from './article-form.po';
import {browser, by, element, ElementFinder, promise} from 'protractor';
import {ArticleListPage} from './article-list.po';
import {Browser} from './browser';


export interface Browsable {
  navigateToFormPage(): promise.Promise<ArticleFormPage>;

  navigateToListPage(): promise.Promise<ArticleListPage>;
}

export class NavFragment implements Browsable {

  private static findLink(url): ElementFinder {
    return element(by.css(`app-root nav .nav-link[href="${url}"]`));
  }

  navigateToFormPage(): promise.Promise<ArticleFormPage> {
    const url = '/new';
    return NavFragment.findLink(url)
      .click()
      .then(_ => {
        return Browser.waitForLoading(url);
      })
      .then(_ => {
        return new ArticleFormPage(this);
      });
  }

  navigateToListPage(): promise.Promise<ArticleListPage> {
    const url = '/list';
    return NavFragment.findLink(url)
      .click()
      .then(_ => {
        return Browser.waitForLoading(url);
      })
      .then(_ => {
        return new ArticleListPage(this);
      });
  }
}
