import {Homepage} from './pages/homepage.po';
import {browser, logging} from 'protractor';
import {NavFragment} from './pages/nav.fragment';
import {Article} from '../../src/app/article/article';

describe('workspace-project App', () => {
  let home: Homepage;

  beforeEach(() => {
    home = new Homepage(new NavFragment());
    home.navigateTo();
  });

  it('should display welcome message', () => {
    expect(home.getTitleText()).toEqual('Inventory Management 📦');
  });

  it('should create and delete an article', () => {
    const article = {
      sku: `sku_${Math.random().toString(36).substring(2)}`,
      name: `some name`,
      description: `some description`,
      priceInUsd: 42,
      quantity: 23,
    } as Article;

    home.navigateToFormPage()
      .then(form => {
        return form.submitArticle(article);
      })
      .then(list => {
        expect(list.contains(article))
          .toBeTruthy('created article should be in the list');
        return list.delete(article);
      })
      .then(list => {
        expect(list.contains(article))
          .toBeFalsy('deleted article should not be in the list');
      });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
