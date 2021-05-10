class Default {
  occitan: string;
  french: string;
  english: string;

  constructor() {
    this.occitan = "";
    this.french = "";
    this.english = "";
  }
}

class Feminize {
  occitan: string;
  french: string;
  english: string;

  constructor() {
    this.occitan = "";
    this.french = "";
    this.english = "";
  }
}

class Translation {
  id: number;
  abbr: string;
  default: Default;
  feminize?: Feminize;

  constructor() {
    this.id = 0;
    this.abbr = "";
    this.default = new Default();
  }
}

export { Translation, Feminize };
