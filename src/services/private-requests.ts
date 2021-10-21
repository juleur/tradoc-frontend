import { Result, ok, err } from 'neverthrow'
import { privateAPI } from './instance-api'
import { Dataset, Occitan, Error, Translation } from '~/models'
import { isFetching } from '~/stores'

async function getOccitan(): Promise<Result<Occitan[], Error>> {
  isFetching.value = true
  try {
    const response = await privateAPI.get('occitan')
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function getDatasets(fullDialect: string): Promise<Result<Dataset[], Error>> {
  isFetching.value = true
  try {
    const response = await privateAPI.get(`/datasets/${encodeURI(fullDialect)}`)
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function addNewTranslation(translations: Translation[]): Promise<Result<null, Error>> {
  isFetching.value = true
  try {
    const _ = await privateAPI.post('new_translations', { translations })
    return ok(null)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function getOnlineTranslators(): Promise<Result<number, Error>> {
  isFetching.value = true
  try {
    const response = await privateAPI.get('online_tanslators')
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function logout(): Promise<Result<null, Error>> {
  isFetching.value = true
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
    isFetching.value = false
  }
}

export {
  getOccitan,
  getDatasets,
  addNewTranslation,
  getOnlineTranslators,
  logout,
}
