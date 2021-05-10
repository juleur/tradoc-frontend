import { onMounted, ref, readonly } from "vue";
import { useNotification } from "@/composables/useNotification";
import { fetchTranslatationFiles } from "@/services/dialectes-api";
import { AllFiles } from "@/models/dialect_file";

function useDialectFiles() {
  const allFiles = ref<AllFiles>({} as AllFiles);

  function filepath(filename: string) {
    const serverFile = "https://files.trad-oc.xyz";
    return serverFile + "/" + filename;
  }

  onMounted(async () => {
    const { addNotification } = useNotification();

    const result = await fetchTranslatationFiles();
    result
      .map(data => {
        data.dialectFiles.map(dialectFile => {
          dialectFile.subdialectFiles.map(sub => {
            if (sub.filepathFr !== null) {
              sub.filepathFr = filepath(sub.filepathFr);
            }
            if (sub.filepathEn !== null) {
              sub.filepathEn = filepath(sub.filepathEn);
            }
          });
        });
        allFiles.value.dialectFiles = data.dialectFiles;

        if (data.lastDatetimeGenFile === null) {
          allFiles.value.lastDatetimeGenFile = "pas cap";
        } else {
          allFiles.value.lastDatetimeGenFile = `${data.lastDatetimeGenFile.substring(8, 10)}/${data.lastDatetimeGenFile.substring(5, 7)}/${data.lastDatetimeGenFile.substring(0, 4)}`;
        }
      })
      .mapErr(err => addNotification(err.errorCode, err.message));
  });

  return { allFiles: readonly(allFiles) };
}

export { useDialectFiles };
