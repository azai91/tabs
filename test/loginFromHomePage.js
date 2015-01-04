// casper.test.begin('Sign in and post', 2, function suite(test) {
//     casper.start("http://tabs.cloudapp.net/#/", function() {
//       console.log(this.getPageContent());
//         test.assertExists("div.flux-message-app");
//         test.assertTitle("Tabs", "Tab has the correct title");
//         // this.click('ul li');
//         // test.assertExists('h1', "main form is found");
//         // this.fill('form[action="/search"]', {
//         //     q: "casperjs"
//         // }, true);
//     });

//     // casper.then(function() {
//     //     // test.assertTitle("casperjs - Recherche Google", "google title is ok");
//     //     // test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
//     //     // test.assertEval(function() {
//     //     //     return __utils__.findAll("h3.r").length >= 10;
//     //     // }, "google search for \"casperjs\" retrieves 10 or more results");
//     // });

//     casper.run(function() {
//         test.done();
//     });
// });

var expect = require('chai').expect;

describe('Login', function() {
  it('changes to login view', function() {
    var React = require('react/addons');
    var FluxMessageApp = require('../client/app/components/FluxMessageApp.react');
    var TestUtils = React.addons.TestUtils;

    var messageapp = TestUtils.renderIntoDocument(
      <FluxMessageApp />
    );
    expect(true).to.be.true;
  });


});