import puppeteer from "puppeteer";

import { ExecutionEnvironment } from "@/types/executor";

import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";

//datacenter proxy features disabled

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website url");
    const browser = await puppeteer.launch({
      headless: true,
      //args: ["--proxy-server=brd.superproxy.io:33335"],
    });
    environment.log.info("Browser launched successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    /*await page.authenticate({
      username: "brd-customer-hl_d157d69e-zone-flowscrapper",
      password: "hpxd0378peyg",
    });*/
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Navigated to ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
