import { Dialect } from "./dialect";

export class MainMenu {
  dialects: Dialect[];
  totalOnlineTranslators: number;

  constructor() {
    this.dialects = [];
    this.totalOnlineTranslators = 0;
  }
}
