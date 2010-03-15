package au.com.sensis.mobile.web.component.devicelocation.showcase.selenium.fixture;

import static junit.framework.Assert.assertTrue;

import com.thoughtworks.selenium.Selenium;

/**
 * Assertions and actions for the Home Page.
 *
 * @author Adrian.Koh2@sensis.com.au (based on Heather's work in Whereis Mobile)
 */
public class HomePage extends AbstractPageFixture {

    public HomePage(final Selenium selenium) {
        super(selenium);
    }

    public void clickOnGetAMap() {
        getBrowser().click("TODO");
        waitForPage();
    }

    @Override
    protected void assertBody() {
        // top links
        assertTrue(getBrowser().isTextPresent("TODO"));
    }
}
