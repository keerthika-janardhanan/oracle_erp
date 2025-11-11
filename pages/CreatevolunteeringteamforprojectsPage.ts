import { Page, Locator } from '@playwright/test';
import HelperClass from "../util/methods.utility.ts";
import locators from "../locators/create-volunteering-team-for-projects.ts";

class Createvolunteeringteamforprojectspage {
  page: Page;
  helper: HelperClass;
  navigator: Locator;
  me: Locator;
  volunteering: Locator;
  volunteeringTeams: Locator;
  add: Locator;
  createATeam: Locator;
  name: Locator;
  private: Locator;
  private2: Locator;
  submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helper = new HelperClass(page);
    this.navigator = page.locator(locators.navigator);
    this.me = page.locator(locators.me);
    this.volunteering = page.locator(locators.volunteering);
    this.volunteeringTeams = page.locator(locators.volunteeringTeams);
    this.add = page.locator(locators.add);
    this.createATeam = page.locator(locators.createATeam);
    this.name = page.locator(locators.name);
    this.private = page.locator(locators.private);
    this.private2 = page.locator(locators.private2);
    this.submit = page.locator(locators.submit);
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

  async applyData(formData: Record<string, any> | null | undefined, keys?: string[]): Promise<void> {
    const fallbackValues: Record<string, string> = {
      "Name": "",
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
  }
}

export default Createvolunteeringteamforprojectspage;
