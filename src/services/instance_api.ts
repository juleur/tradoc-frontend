import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables'
import { refreshToken } from '~/services'
import { isAccessTokenRefreshing } from '~/stores'

// const backendUrlAPI = 'https://backend.trad-oc.xyz'
const backendUrlAPI = 'http://127.0.0.1:9321'

const publicAPI = axios.create({
  baseURL: backendUrlAPI,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const privateAPI = axios.create({
  baseURL: `${backendUrlAPI}/p`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

privateAPI.interceptors.request.use((config) => {
  const newConfig = config
  const jwt = localStorage.getItem('accessToken')
  newConfig.headers.Authorization = `Bearer ${jwt}`
  return newConfig
})

privateAPI.interceptors.response.use(
  response => response,
  (err) => {
    if (err.response.status === 401) {
      if (err.response.data.error === 'TOKEN_EXPIRED') {
        return new Promise((resolve, reject) => {
          if (isAccessTokenRefreshing.value) {
            const intervalId = setInterval(() => {
              if (!isAccessTokenRefreshing.value) {
                clearInterval(intervalId)

                const originalReq = err.config

                const jwt = localStorage.getItem('accessToken')
                originalReq.headers.Authorization = `Bearer ${jwt}`

                axios(originalReq)
                  .then(data => resolve(data))
                  .catch(err => reject(err))
              }
            }, 100)
          }
          else {
            refreshToken().then((result) => {
              result
                .map((accessToken) => {
                  const { AuthSignedIn } = useAuth()

                  useLocalStorage('accessToken', accessToken)
                  AuthSignedIn()

                  const originalReq = err.config
                  originalReq.headers.Authorization = `Bearer ${accessToken}`

                  axios(originalReq)
                    .then(data => resolve(data))
                    .catch(err => reject(err))
                })
                .mapErr((err: any) => {
                  return err
                })
            })
          }
        })
      }
      else {
        const router = useRouter()
        const toast = useToast()

        toast.warning('Vous avez été déconnecté suite à une erreur dans votre session d\'authentification.')
        router.push('/connexion')
      }
    }

    return err
  },
)

export { publicAPI, privateAPI }
