import { Result, ok, err } from 'neverthrow'
import { privateAPI } from './instance_api'
import { useFetching } from '~/composables'
import { Dataset, Dialect, Error } from '~/models'

async function getDatasets(fullDialect: string): Promise<Result<Dataset[], Error>> {
  try {
    const response = await privateAPI.get(`get_datasets/${encodeURI(fullDialect)}`)
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally getDatasets')
  }
}

async function getDialectsSubdialects(): Promise<Result<Dialect[], Error>> {
  try {
    const response = await privateAPI.get('dialects_subdialects')
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally getDialectsSubdialects')
  }
}

async function logout(): Promise<Result<null, Error>> {
  try {
    const _ = await privateAPI.get('logout', { withCredentials: true })
    return ok(null)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    console.log('finally logout')
  }
}

export {
  getDatasets,
  getDialectsSubdialects,
  logout,
}
