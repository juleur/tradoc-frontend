import { Result, ok, err } from "neverthrow";
import { Sentence } from "@/models/sentence";
import { Failure } from "@/models/failure";
import { Translation } from "@/models/translator";
import { MainMenu } from "@/models/main_menu";
import { getJWT } from "@/utils/jwt";
import { AllFiles } from "@/models/dialect_file";
import { loading } from "@/composables/useLoadingSpinner";
import apiInstance from "@/services/url-api";

const dialectInstance = apiInstance;

dialectInstance.interceptors.request.use(config => {
  const newConfig = config;
  const jwt = getJWT();
  if (jwt) {
    newConfig.headers["Authorization"] = `Bearer ${jwt}`;
  }
  return newConfig;
});

const fetchSentences = async (
  dialectAbbr: string
): Promise<Result<Sentence[], Failure>> => {
  try {
    loading.value = true;
    const response = await dialectInstance.get(`auth/sentences/${dialectAbbr}`);
    const sentences: Sentence[] = await response.data;

    loading.value = false;

    return ok(sentences);
  } catch (error) {
    loading.value = false;

    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
};

const newTraduction = async (
  translation: Translation
): Promise<Result<boolean, Failure>> => {
  try {
    await dialectInstance.post("auth/new_translation", {
      translation
    });

    return ok(true);
  } catch (error) {
    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
};

const fetchDialectes = async (): Promise<Result<MainMenu, Failure>> => {
  try {
    loading.value = true;
    const response = await dialectInstance.get("auth/dialects");

    const mainMenu: MainMenu = await response.data;

    loading.value = false;

    return ok(mainMenu);
  } catch (error) {
    loading.value = false;

    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
};

const fetchTranslatationFiles = async(): Promise<Result<AllFiles, Failure>> => {
  try {
    loading.value = true;
    const response = await dialectInstance.get("dialect_files");

    const allFiles: AllFiles = await response.data;

    loading.value = false;

    return ok(allFiles);
  } catch (error) {
    loading.value = false;
    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
};

export {
  fetchSentences,
  newTraduction,
  fetchDialectes,
  fetchTranslatationFiles
};
