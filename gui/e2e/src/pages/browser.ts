import {browser, promise} from 'protractor';

export class Browser {

  public static waitForLoading(url: string): promise.Promise<boolean> {
    return browser.wait(() => {
      return Browser.currentUrlEndsWith(url);
    });
  }

  private static currentUrlEndsWith(url: string): promise.Promise<boolean> {
    return browser.getCurrentUrl().then((currentUrl: string) => {
      return currentUrl.endsWith(url);
    });
  }
}
