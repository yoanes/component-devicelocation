package au.com.sensis.mobile.web.component.devicelocation.showcase.selenium;

import au.com.sensis.mobile.web.component.devicelocation.showcase.selenium.fixture.HomePage;

/**
 * Tests the home page.
 *
 * TODO
 *
 * In order to run this test start tomcat, then start the selenium server, run this as a JUnit test.
 *
 * @author Adrian.Koh2@sensis.com.au (based on Heather's work in Whereis Mobile)
 */
public class HomePageIntegrationTestCase extends AbstractSeleniumIntegrationTestCase {

    /**
     * Opens the map page for an address.
     */
    public void testGetMap() throws Exception {
        openHome();

        final HomePage homePage =
            (HomePage) getPageFixtureFactory().createPageFixture(HomePage.class);
//        homePage.clickOnGetMap();
    }
}
