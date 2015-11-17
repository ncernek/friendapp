'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Friend App', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });

  //   1) Friend App view1 should render view1 when
  //  user navigates to /view1
  //    Message:
  //      Error: Index out of bound. Trying to acce
  // ss element at index: 0, but there are only 0 e
  // lements that match locator By.cssSelector("[ng
  // -view] p")
  //    Stacktrace:
  //      Error: Index out of bound. Trying to acce
  // ss element at index: 0, but there are only 0 e
  // lements that match locator By.cssSelector("[ng
  // -view] p")
    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
// my contribution
  describe('Friend list view', function() {

    beforeEach(function() {
      browser.get('index.html');
    });


    it('should filter the Friend list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('friend in friends'));
      var query = element(by.model('query'));

      expect(phoneList.count()).toBe(3);

      query.sendKeys('mugatu');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('babraham');
      expect(phoneList.count()).toBe(1);
    });

    it('should be possible to control friend order via the drop down select box', function() {

      var friendNameColumn = element.all(by.repeater('friend in friends').column('friend.lastName'));
      var query = element(by.model('query'));

      function getNames() {
        return friendNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('i'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Lincoln",
        "Poochino"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="-importance"]')).click();

      expect(getNames()).toEqual([
        "Lincoln",
        "Poochino"
      ]);
    });
  });

});
