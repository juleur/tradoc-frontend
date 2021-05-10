function hideInfo(nb: number): void {
  sessionStorage.setItem(`_info_${nb}`, "");
}

function showInfo(nb: number): boolean {
  if (sessionStorage.getItem(`_info_${nb}`) !== null) {
    return false;
  }
  return true;
}

function deleteSessionStorage(): void {
  sessionStorage.clear();
}

export { hideInfo, showInfo, deleteSessionStorage };
