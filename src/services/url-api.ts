import axios from "axios";
import { updateAuthStatus } from "@/composables/useAuth";
import { useNotification } from "@/composables/useNotification";
import { useLogout } from "@/composables/useLogout";
import { loading } from "@/composables/useLoadingSpinner";
import { refreshToken } from "./auth-api";
import { setTokens } from "@/utils/local-storage";
import { AuthStatus } from "@/models/auth_status";
import { Failure } from "@/models/failure";
import router from "@/router";
import { isTokensRefreshing } from "@/composables/useRefreshToken";
import { getJWT } from "@/utils/jwt";

const backendUrlAPI = "https://backend.trad-oc.xyz";
// const backendUrlAPI = "http://localhost:8010/proxy";

const apiInstance = axios.create({
  baseURL: backendUrlAPI,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

const NO_INTERNET_ACCESS = "Semblariá qu'ajas pas accès a Internet.";

apiInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return Promise.reject<Failure>({
        errorCode: 503,
        message: NO_INTERNET_ACCESS
      });
    }

    if (error.response.status === 401) {
      if (error.response.data.errorCode === 41) {
        return new Promise((resolve, reject) => {
          if (isTokensRefreshing.value) {
            const intervalId = setInterval(() => {
              if (!isTokensRefreshing.value) {
                clearInterval(intervalId);
                const originalReq = error.config;
                const jwt = getJWT();
                originalReq.headers.Authorization = `Bearer ${jwt}`;
                axios(originalReq)
                  .then(data => resolve(data))
                  .catch(err =>
                    reject({
                      errorCode: err.response.status,
                      message: err.response.data.message
                    })
                  );
              }
            }, 100);
          } else {
            refreshToken().then(result => {
              result
                .map(tokens => {
                  setTokens(tokens);
                  updateAuthStatus(AuthStatus.loggedIn);

                  const originalReq = error.config;
                  originalReq.headers.Authorization = `Bearer ${tokens.jwt}`;
                  axios(originalReq)
                    .then(data => resolve(data))
                    .catch(err =>
                      reject({
                        errorCode: err.response.status,
                        message: err.response.data.message
                      })
                    );
                })
                .mapErr(err => {
                  const { addNotification } = useNotification();
                  const { logout } = useLogout();

                  loading.value = false;

                  addNotification(err.errorCode, err.message);
                  logout();
                  router.push("/connexion");
                });
            });
          }
        });
      } else {
        const { logout } = useLogout();

        loading.value = false;

        logout();
        router.push("/connexion");
        return Promise.reject<Failure>({
          errorCode: error.response.status,
          message: error.response.data.message
        });
      }
    }

    return Promise.reject<Failure>({
      errorCode: error.response.status,
      message: error.response.data.message
    });
  }
);

export default apiInstance;

// const originalReq = error.config;
// const jwt = getJWT();
// originalReq.headers.Authorization = `Bearer ${jwt}`;
// axios(originalReq)
//   .then(data => resolve(data))
//   .catch(err =>
//     reject({
//       errorCode: err.response.status,
//       message: err.response.data.message
//     })
//   );
// return new Promise((resolve, reject) => {
//           refreshToken().then(result => {
//               result
//                 .map(tokens => {
//                   setTokens(tokens);
//                   updateAuthStatus(AuthStatus.loggedIn);

//                   const originalReq = error.config;
//                   originalReq.headers.Authorization = `Bearer ${tokens.jwt}`;
//                   axios(originalReq)
//                     .then(data => resolve(data))
//                     .catch(err =>
//                       reject({
//                         errorCode: err.response.status,
//                         message: err.response.data.message
//                       })
//                     );
//                 })
//                 .mapErr(err => {
//                   const { addNotification } = useNotification();
//                   const { logout } = useLogout();

//                   loading.value = false;

//                   addNotification(err.errorCode, err.message);
//                   logout();
//                   router.push("/connexion");
//                   return;
//                 });
//             });
//         });