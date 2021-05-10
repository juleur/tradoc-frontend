import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  containerClassName: "toaster",
  timeout: 3500
};

createApp(App)
  .use(router)
  .use(Toast, options)
  .mount("#app");
