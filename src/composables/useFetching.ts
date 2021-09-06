
export function useFetching() {
  const status = ref<boolean>(false)
  const fetching = () => status.value = true
  const fetched = () => status.value = false

  return {
    isFetching: readonly(status),
    fetching,
    fetched,
  }
}
