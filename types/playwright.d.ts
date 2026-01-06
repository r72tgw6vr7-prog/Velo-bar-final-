// Type definitions for Playwright
// This file ensures proper type imports when working with Playwright

declare module '@playwright/test' {
  export type Page = import('@playwright/test').Page;
  export type Browser = import('@playwright/test').Browser;
  export type BrowserContext = import('@playwright/test').BrowserContext;
  export type Locator = import('@playwright/test').Locator;
  export type Request = import('@playwright/test').Request;
  export type Response = import('@playwright/test').Response;
  export type TestInfo = import('@playwright/test').TestInfo;
  export type APIRequestContext = import('@playwright/test').APIRequestContext;
}
