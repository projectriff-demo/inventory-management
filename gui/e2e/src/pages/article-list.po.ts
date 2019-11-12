import {Browsable} from "./nav.fragment";
import {ArticleFormPage} from "./article-form.po";
import {Article} from "../../../src/app/article/article";
import {by, element, ElementFinder, promise} from "protractor";

export class ArticleListPage implements Browsable {

  constructor(private navigation: Browsable) {

  }

  navigateToFormPage(): promise.Promise<ArticleFormPage> {
    return this.navigation.navigateToFormPage();
  }

  navigateToListPage(): promise.Promise<ArticleListPage> {
    return this.navigation.navigateToListPage();
  }

  contains(article: Article): promise.Promise<boolean> {
    return ArticleListPage.locateArticle(article).isPresent();
  }

  delete(article: Article): promise.Promise<ArticleListPage> {
    return ArticleListPage.locateArticle(article).$('.delete-link')
      .click()
      .then(_ => this);
  }

  private static locateArticle(article: Article): ElementFinder {
    return element(by.id(`article-${article.sku.replace(' ', '-')}`));
  }
}
