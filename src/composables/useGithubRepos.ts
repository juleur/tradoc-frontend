import { onMounted, ref, readonly } from "vue";
import axios from "axios";
import { loading } from "@/composables/useLoadingSpinner";
import { Github } from "@/models/github";
import { useNotification } from "./useNotification";
import { githubLanguageColor } from "@/utils/utils";

export function useGithubRepos() {
  const githubApiUrls = [
    "https://api.github.com/repos/trad-oc/trad-oc-backend",
    "https://api.github.com/repos/trad-oc/trad-oc-frontend"
  ];

  const githubRepos = ref([] as Github[]);

  onMounted(async () => {
    loading.value = true;
    try {
      for (const githubApiUrl of githubApiUrls) {
        const response = await axios.get(githubApiUrl);
        const githubRepo: Github = {
          name: response.data["name"],
          repoUrl: response.data["html_url"],
          description: response.data["description"],
          color: githubLanguageColor(response.data["language"]),
          language: response.data["language"]
        };
        githubRepos.value.push(githubRepo);
      }
      loading.value = false;
    } catch (_) {
      loading.value = false;
      const { addNotification } = useNotification();
      addNotification(400, "Impossible de recobrar lo depaus Github.");
    }
  });

  return { githubRepos: readonly(githubRepos) };
}
