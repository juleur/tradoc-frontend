<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { isJwtExpired } from '~/helpers'
import { refreshToken } from '~/services'
import { useAuth } from '~/composables'
import { isAccessTokenRefreshing } from '~/stores'

const { AuthSignedIn, AuthSignedOut } = useAuth()
const router = useRouter()
const toast = useToast()

onBeforeMount(async() => {
  const jwt = localStorage.getItem('access_token')

  if (!jwt) return

  if (isJwtExpired(jwt)) {
    isAccessTokenRefreshing.value = true
    refreshToken().then((result) => {
      result
        .map((token) => {
          useLocalStorage('accessToken', token)
          AuthSignedIn()
          isAccessTokenRefreshing.value = false
        })
        .mapErr((err) => {
          AuthSignedOut()
          toast.error(err)
          setTimeout(() => router.push('/connexion'))
        })
    }).finally(() => isAccessTokenRefreshing.value = false)
  }
})
</script>

<template>
  <!-- <Spinner :active="fetching" :message="'Cargament'" :opacity="0.75" />
  <Spinner :active="loading" :message="'Autenticacion'" :opacity="1" /> -->
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>
