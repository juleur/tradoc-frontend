interface Subdialect {
  nom: string;
  total_sentences_translated?: number;
  abbr: string;
}

export class Dialect {
  nom: string;
  subdialects: Subdialect[];

  constructor() {
    this.nom = "";
    this.subdialects = [];
  }
}
