interface SubdialectFile {
  nom: string;
  filepathFr: string;
  filepathEn: string;
}

class DialectFile {
  nom: string;
  subdialectFiles: SubdialectFile[];
  constructor() {
    this.nom = "";
    this.subdialectFiles = [];
  }
}

class AllFiles {
  dialectFiles: DialectFile[];
  lastDatetimeGenFile: string;

  constructor() {
    this.dialectFiles = [];
    this.lastDatetimeGenFile = "";
  }
}

export { AllFiles, DialectFile };
