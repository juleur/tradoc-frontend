import { Tokens } from "@/models/tokens";

function setTokens(tokens: Tokens) {
  localStorage.clear();
  localStorage.setItem("jwt", tokens.jwt);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

function deleteTokens() {
  localStorage.clear();
}

export { setTokens, deleteTokens };
