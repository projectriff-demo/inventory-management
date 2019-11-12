import {Browsable} from "./nav.fragment";
import {ArticleListPage} from "./article-list.po";
import {by, element, promise} from 'protractor';
import {Article} from "../../../src/app/article/article";
import {Browser} from "./browser";

export class ArticleFormPage implements Browsable {

  constructor(private navigation: Browsable) {

  }

  submitArticle(article: Article): promise.Promise<ArticleListPage> {
    return ArticleFormPage.fillField('sku', article.sku)
      .then(_ => {
        return ArticleFormPage.fillField('name', article.name)
      })
      .then(_ => {
        return ArticleFormPage.fillField('description', article.description)
      })
      .then(_ => {
        return ArticleFormPage.fillField('priceInUsd', article.priceInUsd)
      })
      .then(_ => {
        return element(by.css("button[type=submit]")).click();
      })
      .then(_ => {
        return Browser.waitForLoading('/list');
      })
      .then(_ => {
        return new ArticleListPage(this.navigation);
      })
  }

  navigateToFormPage(): promise.Promise<ArticleFormPage> {
    return this.navigation.navigateToFormPage();
  }

  navigateToListPage(): promise.Promise<ArticleListPage> {
    return this.navigation.navigateToListPage();
  }

  private static fillField(fieldId: string, value: string | number): promise.Promise<void> {
    const field = element(by.id(fieldId));
    return field.clear()
      .then(_ => {
        return field.sendKeys(value)
      });
  }
}
