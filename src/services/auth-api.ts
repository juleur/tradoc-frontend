import { Result, ok, err } from "neverthrow";
import apiInstance from "@/services/url-api";
import { Tokens } from "@/models/tokens";
import { Failure } from "@/models/failure";
import { getRefreshToken, getUserID } from "@/utils/jwt";
import { useNotification } from "@/composables/useNotification";
import { loading } from "@/composables/useLoadingSpinner";

const authInstance = apiInstance;

authInstance.interceptors.request.use(config => {
  const newConfig = config;
  newConfig.headers["Cache-Control"] = "no-store";
  return newConfig;
});

const NO_REFRESH_TOKEN =
  "Error al moment de l'autentificacion, ensaja de te tornar connectar.";
const ACCOUNT_REGISTERED = "Ton compte es validat, te pòs tre ara connectar !";

async function login(
  username: string,
  password: string
): Promise<Result<Tokens, Failure>> {
  try {
    loading.value = true;
    const response = await authInstance.post("login", {
      username: username,
      password: password
    });

    const tokens: Tokens = await response.data;

    loading.value = false;

    return ok(tokens);
  } catch (error) {
    loading.value = false;

    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
}

async function refreshToken(): Promise<Result<Tokens, Failure>> {
  try {
    const refToken = getRefreshToken();

    if (!refToken) {
      return err({
        errorCode: 401,
        message: NO_REFRESH_TOKEN
      });
    }

    const response = await authInstance.get("refresh_token", {
      headers: {
        "X-User-ID": getUserID(),
        "X-Refresh-Token": refToken
      }
    });

    const tokens: Tokens = response.data;

    return ok(tokens);
  } catch (error) {
    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
}

async function register(
  username: string,
  code: number,
  password: string
): Promise<Result<boolean, Failure>> {
  try {
    loading.value = true;

    const response = await authInstance.post("register", {
      username: username,
      code: code,
      password: password
    });

    const { addNotification } = useNotification();
    addNotification(response.status, ACCOUNT_REGISTERED);

    loading.value = false;

    return ok(true);
  } catch (error) {
    loading.value = false;
    return err({
      errorCode: error.errorCode,
      message: error.message
    });
  }
}
export { login, refreshToken, register };
