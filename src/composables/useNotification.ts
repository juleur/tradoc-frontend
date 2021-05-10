import { reactive, readonly } from "vue";

const err = reactive({
  status: 0,
  msg: ""
});

const showNotification = readonly(err);

function useNotification() {
  function addNotification(status = 0, msg = ""): void {
    err.status = status;
    err.msg = msg;
  }

  function resetNotification(): void {
    err.status = 0;
    err.msg = "";
  }

  return { addNotification, resetNotification };
}

export { showNotification, useNotification };
