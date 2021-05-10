<template>
  <header>
    <div class="left-box">
      <router-link to="/">
        <img class="oc-flag" src="@/assets/flags/occitan.webp" width="50" height="35" alt="Òc" />
        <h1>{{ title }}</h1>
      </router-link>
    </div>
    <nav role="navigation">
      <ul>
        <li>
          <router-link class="home-page" to="/">Acuèlh</router-link>
        </li>
        <li>
          <router-link
            class="opensource-page"
            :to="'/codi-font'"
          >Còdi fònt
          </router-link>
        </li>
        <li>
          <router-link
            class="translations-page"
            :to="'/traduccions'"
          >Traduccions
          </router-link>
        </li>
        <li>
          <router-link
            v-if="authStatus"
            class="mainmenu-page"
            :to="'/menut-principal'"
            >Menut Principal
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!authStatus"
            class="login-page"
            :to="'/connexion'"
            >Connexion
          </router-link>
        </li>
        <li>
          <router-link
            v-if="authStatus"
            @click.prevent="logout"
            class="desconnexion-page"
            :to="'/'"
            >Desconnexion
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { authStatus } from "@/composables/useAuth";
import { useLogout } from "@/composables/useLogout";

export default defineComponent({
  name: "Header",
  props: {
    title: String
  },
  setup() {
    return { authStatus, ...useLogout() };
  }
});
</script>

<style scoped>
header {
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem 0 0.8rem 0;
  justify-content: space-between;
}
.left-box > a {
  display: flex;
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
.opensource-page,
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

@media only screen and (max-width: 500px) {
  header {
    gap: 20px 0;
    flex-wrap: nowrap;
    flex-direction: column;
    font-size: 1rem;
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
