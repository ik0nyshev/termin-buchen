import {By, WebDriver} from 'selenium-webdriver';
import {Utils} from '../utils';
import {config} from '../config';
import {SecondPageScenario} from './second-page-scenario';
import {FirstPageScenario} from './first-page-scenario';
import {UPDATE_INTERVAL, UPDATE_COUNT} from '../const';
/**
 * Returns true if slot found
 * @param wd webdriver
 */
export const findSlot = async (wd: WebDriver): Promise<boolean> => {
  await FirstPageScenario.visitPageAndChangeLanguage(wd);
  await FirstPageScenario.clickConsent(wd);
  await FirstPageScenario.clickNext(wd);

  await SecondPageScenario.setCitizenship(wd, config.mainCitizenship);
  await SecondPageScenario.setNumberOfPeople(wd, config.numberOfPeople);
  await SecondPageScenario.setLiveWith(wd, config.liveWith);
  await SecondPageScenario.setPartnerCitizenship(
    wd,
    config.liveWith,
    config.partnerCitizenship
  );
  await SecondPageScenario.selectApplyPurpose(wd, config.reason);
  await SecondPageScenario.selectApplyCategory(wd);
  await SecondPageScenario.selectApplyReason(wd);
  await SecondPageScenario.waitForLoadingScreen(wd);
  for (var _i = 1; _i <= UPDATE_COUNT; _i++) {
    await SecondPageScenario.clickNext(wd);

    try {
      const box = await Utils.waitUntilVisible(
        wd,
        By.xpath('//*[@id="messagesBox"]/ul/li')
      );
      const text = await box.getText();
      console.log(`[findSlot]: ${text}`);
    } catch (e) {
      console.error(`[findSlot]: error ${e}`);
      return true;
    }
    await wd.sleep(UPDATE_INTERVAL);
    console.log(`[findSlot]: update ${_i}`);

  }
  return false;
};
