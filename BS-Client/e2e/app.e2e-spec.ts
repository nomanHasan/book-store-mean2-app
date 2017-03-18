import { BSClientPage } from './app.po';

describe('bs-client App', () => {
  let page: BSClientPage;

  beforeEach(() => {
    page = new BSClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
