function capitalize(word: string): string {
  return word.trim().replace(/^\w/, c => c.toUpperCase());
}

function replaceAccent(word: string): string {
  return word
    .trim()
    .normalize("NFD")
    .toLowerCase();
}

function githubLanguageColor(language: string): string {
  switch (language) {
    case "Go":
      return "#00add8";
    case "JavaScript":
      return "#f1e05a";
    case "TypeScript":
      return "#2b7489";
    case "Vue":
      return "#2c3e50";
    default:
      return "#ffffff";
  }
}
export { capitalize, replaceAccent, githubLanguageColor };
