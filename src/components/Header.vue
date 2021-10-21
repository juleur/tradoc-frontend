<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables'
import { logout } from '~/services'

const title: string = 'Occitanofòn'

const toast = useToast()

const { isAuth, AuthSignedOut } = useAuth()

async function disconnect(): Promise<void> {
  const result = await logout()
  result.mapErr(err => toast.error(err.msg))
  AuthSignedOut()
}
</script>

<template>
  <header>
    <div class="left-box">
      <router-link to="/">
        <img class="oc-flag" src="../../public/assets/img/occitan.webp" width="50" height="35" alt="drapeau" />
        <h1>{{ title }}</h1>
      </router-link>
    </div>
    <nav role="navigation">
      <ul>
        <li>
          <router-link class="home-page" to="/">
            Acuelh
          </router-link>
        </li>
        <li>
          <router-link
            class="translations-page"
            :to="'/traduccions'"
          >
            Traduccions
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isAuth"
            class="mainmenu-page"
            :to="'/menut-principau'"
          >
            Menut Principau
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!isAuth"
            class="login-page"
            :to="'/connexion'"
          >
            Connexion
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isAuth"
            class="desconnexion-page"
            :to="'/'"
            @click.prevent="disconnect"
          >
            Desconnexion
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem 0 0.8rem 0;
  justify-content: space-between;
  margin: 0 2vw 0 2vw;
}
.left-box > a {
  display: flex;
}
.oc-flag {
  align-self: center;
}
img {
  border-radius: 5px;
  border: 2px solid#5d5d5d;
  margin-right: 0.3rem;
  max-width: 50px;
  max-height: 35px;
}
h1 {
  align-self: center;
  text-transform: uppercase;
  color: #5d5d5d;
  font-size: 1.4rem;
}
nav ul {
  list-style: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0 20px;
  align-self: center;
}
li > .login-page {
  border: 2px solid #e53718;
  border-radius: 20px 20px 20px 20px;
  padding: 4px 15px 4px 15px;
}
li > .desconnexion-page {
  background-color: #e53718;
  border-radius: 20px 20px 20px 20px;
  padding: 4px 15px 4px 15px;
}
.home-page,
.translations-page,
.mainmenu-page,
.desconnexion-page {
  color: #5d5d5d;
}
.login-page {
  color: #e53718;
}
.desconnexion-page {
  color: #ffff;
}
.login-page,
.desconnexion-page {
  text-transform: uppercase;
  font-size: 0.9rem;
}
a:link {
  text-decoration: none;
}
@media screen and (-webkit-min-device-pixel-ratio:0) {
  .oc-flag {
    margin-left: -1px;
  }
}
@media only screen and (max-width: 1000px) {
  header {
    gap: 20px 0;
    flex-direction: column;
    font-size: 1rem;
    align-items: center;
    margin: 0 1vw 0 1vw;
  }
  .left-box {
    justify-content: center;
  }
  nav {
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 800px) {
  header {
    margin: 0 0.7vw 0 0.7vw;
  }
}

@media only screen and (max-width: 500px) {
  header {
    gap: 20px 0;
    flex-wrap: nowrap;
    flex-direction: column;
    font-size: 1rem;
    margin: 0 0.2vw 0 0.2vw;
  }
  .left-box {
    justify-content: center;
  }
  nav {
    display: flex;
    justify-content: center;
  }
}
@media only screen and (max-width: 450px) {
  ul {
    gap: 1rem 20px;
  }
}
</style>
