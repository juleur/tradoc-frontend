/* eslint-disable import/named */
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useAuth } from '~/composables'

const { isAuth } = useAuth()

export async function alreadyLoggedIn(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  if (isAuth.value && to.name === 'connexion')
    return next('/')

  return next()
}
