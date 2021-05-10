import jwtDecode, { JwtPayload } from "jwt-decode";

interface JWTPayload extends JwtPayload {
  translatorId: number;
  dialects: string[];
}

function checkJWTFormat(jwt: string): boolean {
  const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  return regex.test(jwt);
}

function checkRefreshTokenFormat(refreshToken: string): boolean {
  const regex = /^([a-zA-Z0-9]+)$/;
  if (refreshToken.length === 32 && regex.test(refreshToken)) {
    return true;
  }
  return false;
}

function getJWT(): string {
  const jwToken = localStorage.getItem("jwt") as string;
  return checkJWTFormat(jwToken) ? jwToken : "";
}

function getRefreshToken(): string {
  const refToken = localStorage.getItem("refreshToken") as string;
  return checkRefreshTokenFormat(refToken) ? refToken : "";
}

function isJwtExpired(jwt: string): boolean {
  const payload = jwtDecode<JwtPayload>(jwt);
  const currentTime = Date.now() / 1000;
  if ((payload.exp as number) < currentTime) {
    return true;
  }
  return false;
}

function isYourDialects(dialect: string): boolean {
  const jwt = getJWT();
  const payload = jwtDecode<JWTPayload>(jwt);
  return payload.dialects.includes(dialect);
}

function getUserID(): number {
  const jwt = getJWT();
  const payload = jwtDecode<JWTPayload>(jwt);
  return payload.translatorId ?? 0;
}

export { getJWT, getRefreshToken, isJwtExpired, isYourDialects, getUserID };
