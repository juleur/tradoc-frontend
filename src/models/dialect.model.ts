interface Subdialect {
  subdialect_id: string
  subdialect: string
  total_translations: number
  total_translation_by_translator: number
}

export class Dialect {
  dialect_id: string
  dialect: string
  subdialects: Subdialect[]

  constructor() {
    this.dialect_id = ''
    this.dialect = ''
    this.subdialects = []
  }
}
