<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GithubCard",
  props: {
    name: String,
    repoUrl: String,
    description: String,
    color: String,
    language: String
  }
});
</script>

<template>
  <div class="github-card">
    <div class="github-repo">
      <img src="@/assets/repo.webp" alt="github repo" width="16" height="16" />
      <a
        class="github-repo-name"
        :href="repoUrl"
        rel="noreferrer"
        target="_blank"
      >{{ name }}
      </a>
    </div>
    <p class="github-description">{{ description }}</p>
    <div class="github-language">
      <div
        class="github-color-lang"
        :style="{
          'background-color': color
        }"
      ></div>
      <p class="language">{{ language }}</p>
    </div>
  </div>
</template>

<style scoped>
.github-card {
  height: 120px;
  width: 360px;
  min-width: 300px;
  border: 1.5px solid #dadde3;
  border-radius: 5px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem 0.8rem 1rem;
}
.github-repo {
  display: flex;
  margin-bottom: 0.4rem;
  align-items: center;
}
.github-repo-name {
  font-size: 0.98rem;
  margin-left: 0.4rem;
  color: #0049d0;
  font-weight: 600;
}
.github-repo-name:hover {
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
}
.github-description {
  font-size: 0.92rem;
  margin-bottom: 0.6rem;
  color: #535963;
}
.github-language {
  display: flex;
  align-items: center;
}
.github-color-lang {
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
.language {
  font-size: 0.9rem;
  margin-left: 0.25rem;
  color: #464d56;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
