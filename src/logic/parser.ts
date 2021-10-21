function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function capitalize(word: string): string {
  return word.trim().replace(/^\w/, c => c.toUpperCase())
}

function normalize(word: string): string {
  return word.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}


export {
  validateEmail,
  capitalize,
  normalize,
}
