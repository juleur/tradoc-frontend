<script lang="ts">
import { defineComponent } from "vue";
import GithubCard from "@/components/GithubCard.vue";
import { useGithubRepos } from "@/composables/useGithubRepos";

export default defineComponent({
  name: "OpenSource",
  components: {
    GithubCard
  },
  setup() {
    return { ...useGithubRepos() };
  }
});
</script>

<template>
  <div class="open-source">
    <h1>Còdi fònt</h1>
    <div class="github-cards">
      {{ githubRepos.repos }}
      <GithubCard
        v-for="(repo, idx) in githubRepos"
        :key="`githubrepo-${idx}`"
        :name="repo.name"
        :repoUrl="repo.repoUrl"
        :description="repo.description"
        :color="repo.color"
        :language="repo.language"
      ></GithubCard>
    </div>
  </div>
</template>

<style scoped>
.open-source {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 380px;
  gap: 2rem 0;
}
h1 {
  color: #e53718;
}
.github-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0 3rem;
}
@media only screen and (max-width: 820px) {
  .github-cards {
    gap: 2rem 0;
  }
}
</style>
