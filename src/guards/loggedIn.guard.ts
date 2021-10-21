/* eslint-disable import/named */
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables'
import { isYourDialects } from '~/helpers'
import { capitalize } from '~/logic'

const { isAuth } = useAuth()
const toast = useToast()

const pathNameAuthOnly: string[] = [
  'menut-principau',
  'espaci-traduccion-dialect',
]

export async function loggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const jwt = localStorage.getItem('accessToken') ?? ''

  if ((isAuth.value || !!jwt) && pathNameAuthOnly.includes(to.name as string)) {
    if (to.name === 'espaci-traduccion-dialect') {
      const fullDialect = (to.params.dialect as string).split('-')
      if (isYourDialects(fullDialect[0], fullDialect[1]))
        return next()

      toast.warning(`Ès pas autorizat a far las traduccions en ${capitalize(fullDialect[0])} ${capitalize(fullDialect[1])}`)
      return next('/menut-principau')
    }
    return next()
  }

  return next()
}
