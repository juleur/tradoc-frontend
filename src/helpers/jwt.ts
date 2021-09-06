import type { JwtPayload } from 'jwt-decode'
import jwtDecode from 'jwt-decode'

interface JWTPayload extends JwtPayload {
  dperms: string[]
}

function checkJWTFormat(jwt: string): boolean {
  const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
  return regex.test(jwt)
}

function getAccessToken(): string {
  const jwToken = localStorage.getItem('accessToken') as string
  return checkJWTFormat(jwToken) ? jwToken : ''
}

function isJwtExpired(jwt: string): boolean {
  const payload = jwtDecode<JwtPayload>(jwt)
  const currentTime = Date.now() / 1000
  if ((payload.exp as number) < currentTime)
    return true

  return false
}

function isYourDialects(dialect: string, subdialect: string): boolean {
  const dialectAbbre = dialect.substring(0, 3)
  const subdialectAbbre = subdialect.substring(0, 3)
  const fullDialectAbbre = `${dialectAbbre}_${subdialectAbbre}`
  const jwt = getAccessToken()
  const payload = jwtDecode<JWTPayload>(jwt)
  return payload.dperms.includes(fullDialectAbbre)
}

function getTranslatorID(): number {
  const jwt = getAccessToken()
  const payload = jwtDecode<JWTPayload>(jwt)
  return parseInt(payload.sub as string, 10)
}

export {
  getAccessToken,
  isJwtExpired,
  isYourDialects,
}
