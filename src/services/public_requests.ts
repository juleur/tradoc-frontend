import { Result, ok, err } from 'neverthrow'
import { publicAPI } from './instance_api'
import { Error } from '~/models'

async function login(username: string, password: string): Promise<Result<string, Error>> {
  try {
    const response = await publicAPI.post('login', {
      username,
      password,
    }, { withCredentials: true })
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally login')
  }
}

async function refreshToken(): Promise<Result<string, Error>> {
  try {
    const response = await publicAPI.get('refreshtoken', { withCredentials: true })
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally refreshToken')
  }
}

async function register(username: string, email: string, password: string): Promise<Result<boolean, Error>> {
  try {
    const _ = await publicAPI.post('register', {
      username,
      email,
      password,
    })
    return ok(true)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally register')
  }
}

export {
  login,
  refreshToken,
  register,
}
