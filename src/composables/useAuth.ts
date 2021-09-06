const authStatus = ref<boolean>(false)

export function useAuth() {
  const AuthSignedIn = () => authStatus.value = true
  const AuthSignedOut = () => authStatus.value = false

  return {
    isAuth: readonly(authStatus),
    AuthSignedIn,
    AuthSignedOut,
  }
}
