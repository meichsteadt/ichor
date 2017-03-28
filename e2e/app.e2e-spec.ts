import { IchorPage } from './app.po';

describe('ichor App', function() {
  let page: IchorPage;

  beforeEach(() => {
    page = new IchorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
