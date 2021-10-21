<script setup lang="ts">
import { useAuth } from '~/composables'
import { isFetching } from '~/stores'
import { getAccessToken } from '~/helpers'

const { AuthSignedIn, isAuth } = useAuth()

const router = useRouter()

onBeforeMount(() => {
  const jwt = getAccessToken()

  if (!jwt) {
    localStorage.clear()
    return
  }

  AuthSignedIn()
})

onMounted(() => {
  watch(isAuth, (currentAuthStatus, _) => {
    if (!currentAuthStatus) {
      localStorage.clear()
      router.push('/')
    }
  })
})
</script>

<template>
  <Fetching :active="isFetching" />
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>
