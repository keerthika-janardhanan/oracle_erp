import { Page, Locator } from '@playwright/test';
import HelperClass from "../util/methods.utility.ts";
import locators from "../locators/testsss.ts";

class Testssspage {
  page: Page;
  helper: HelperClass;
  navigator: Locator;
  me: Locator;
  volunteering: Locator;
  createViewAndFindTeamsToJoin: Locator;
  clickTheElementElement: Locator;
  name: Locator;
  private: Locator;
  privatePrivate: Locator;
  submit: Locator;
  collapseMyTeams: Locator;
  loadMoreItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helper = new HelperClass(page);
    this.navigator = page.locator(locators.navigator);
    this.me = page.locator(locators.me);
    this.volunteering = page.locator(locators.volunteering);
    this.createViewAndFindTeamsToJoin = page.locator(locators.createViewAndFindTeamsToJoin);
    this.clickTheElementElement = page.locator(locators.clickTheElementElement);
    this.name = page.locator(locators.name);
    this.private = page.locator(locators.private);
    this.privatePrivate = page.locator(locators.privatePrivate);
    this.submit = page.locator(locators.submit);
    this.collapseMyTeams = page.locator(locators.collapseMyTeams);
    this.loadMoreItems = page.locator(locators.loadMoreItems);
  }

  private coerceValue(value: unknown): string {
    if (value === undefined || value === null) {
      return '';
    }
    if (typeof value === 'number') {
      return `${value}`;
    }
    if (typeof value === 'string') {
      return value;
    }
    return `${value ?? ''}`;
  }

  private normaliseDataKey(value: string): string {
    return (value || '').replace(/[^a-z0-9]+/gi, '').toLowerCase();
  }

  private resolveDataValue(formData: Record<string, any> | null | undefined, key: string, fallback: string = ''): string {
    const target = this.normaliseDataKey(key);
    if (formData) {
      for (const entryKey of Object.keys(formData)) {
        if (this.normaliseDataKey(entryKey) === target) {
          const candidate = this.coerceValue(formData[entryKey]);
          if (candidate.trim() !== '') {
            return candidate;
          }
        }
      }
    }
    return this.coerceValue(fallback);
  }

  async setName(value: unknown): Promise<void> {
    const finalValue = this.coerceValue(value);
    await this.name.fill(finalValue);
  }

  async setPrivatePrivate(value: unknown): Promise<void> {
    const finalValue = this.coerceValue(value);
    await this.privatePrivate.fill(finalValue);
  }

  async applyData(formData: Record<string, any> | null | undefined, keys?: string[]): Promise<void> {
    const fallbackValues: Record<string, string> = {
      "Name": "",
      "Private, Private": "",
    };
    const targetKeys = Array.isArray(keys) && keys.length ? keys.map((key) => this.normaliseDataKey(key)) : null;
    const shouldHandle = (key: string) => {
      if (!targetKeys) {
        return true;
      }
      return targetKeys.includes(this.normaliseDataKey(key));
    };
    if (shouldHandle("Name")) {
      await this.setName(this.resolveDataValue(formData, "Name", fallbackValues["Name"] ?? ''));
    }
    if (shouldHandle("Private, Private")) {
      await this.setPrivatePrivate(this.resolveDataValue(formData, "Private, Private", fallbackValues["Private, Private"] ?? ''));
    }
  }
}

export default Testssspage;
