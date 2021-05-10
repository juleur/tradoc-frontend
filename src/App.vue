<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Spinner from "@/components/Spinner.vue";
import { showNotification, useNotification } from "@/composables/useNotification";
import { updateAuthStatus } from "@/composables/useAuth";
import { useLogout } from "@/composables/useLogout";
import { loading } from "@/composables/useLoadingSpinner";
import { refreshToken } from "@/services/auth-api";
import { isTokensRefreshing } from "@/composables/useRefreshToken";
import { AuthStatus } from "@/models/auth_status";
import { getJWT, isJwtExpired } from "@/utils/jwt";
import { setTokens } from "./utils/local-storage";
import router from "@/router/index";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    Spinner
  },
  data() {
    const title = "trad'òc";
    return {
      title: title
    };
  },
  setup() {
    onBeforeMount(() => {
      const jwt = getJWT();

      if (!jwt) return;

      if (isJwtExpired(jwt)) {
        loading.value = true;
        isTokensRefreshing.value = true;
        refreshToken().then(result => {
          result
            .map(tokens => {
              setTokens(tokens);
              updateAuthStatus(AuthStatus.loggedIn);
              const jwt = getJWT();
              console.log(jwt);
              isTokensRefreshing.value = false;
            })
            .mapErr(err => {
              const { addNotification } = useNotification();
              const { logout } = useLogout();

              addNotification(err.errorCode, err.message);
              logout();
              isTokensRefreshing.value = false;
              router.push("/connexion");
            });
        });
        loading.value = false;
      }
      updateAuthStatus(AuthStatus.loggedIn);
    });

    const toast = useToast();
    const { resetNotification } = useNotification();
    watch(showNotification, (error, _) => {
      if (error.status !== 0 && error.msg !== "") {
        switch (error.status) {
          case 200:
          case 202:
            toast.success(error.msg);
            resetNotification();
            break;
          case 400:
          case 401:
          case 403:
          case 404:
            toast.warning(error.msg);
            resetNotification();
            break;
          default:
            toast.error(error.msg);
            resetNotification();
            break;
        }
      }
    });

    return { loading };
  }
});
</script>

<template>
  <Spinner :loading="loading"></Spinner>
  <div class="toaster"></div>
  <Header :title="title"></Header>
  <main>
    <router-view />
  </main>
  <Footer></Footer>
</template>

<style>
@font-face {
  font-family: "Cera Pro";
  src: url("~@/assets/fonts/Cera-Pro-Regular.otf");
  font-display: swap;
}
@font-face {
  font-family: "Cera Pro Medium";
  src: url("~@/assets/fonts/Cera-Pro-Medium.otf");
  font-display: swap;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: "Cera Pro", sans-serif;
}
body {
  background: #ffffff;
  font-size: 18px;
  max-width: 1280px;
  max-height: 980px;
  margin: 0 auto;
}
header,
main {
  margin: 0 5rem 0 5rem;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
@media only screen and (max-width: 1000px) {
  header,
  main {
    margin: 0 3rem 0 3rem;
  }
}
@media only screen and (max-width: 850px) {
  header,
  main {
    margin: 0 1.75rem 0 1.75rem;
  }
}
@media only screen and (max-width: 550px) {
  header,
  main {
    margin: 0 1rem 0 1rem;
  }
}
@media only screen and (max-width: 400px) {
  header,
  main {
    margin: 0 0.5rem 0 0.5rem;
  }
}
@media only screen and (max-width: 350px) {
  header,
  main {
    margin: 0 0.2rem 0 0.2rem;
  }
}
</style>
