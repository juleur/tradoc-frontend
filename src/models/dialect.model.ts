interface Subdialect {
  name: string
  totalTranslated: number
  totalTranslatedByTranslator: number
}

export class Occitan {
  dialect: string
  subdialects: Subdialect[]

  constructor() {
    this.dialect = ''
    this.subdialects = []
  }
}
