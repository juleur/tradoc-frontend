import { useToast } from 'vue-toastification'
import { Dataset } from '~/models'
import { getDatasets } from '~/services/private_requests'

export function useDatasets(fullDialect: string) {
  const toast = useToast()

  const datasets = reactive({
    sentences: [] as Dataset[],
  })

  const currentDataset = ref<Dataset>({
    _id: '',
    sentence: '',
  })

  onMounted(async() => {
    const result = await getDatasets(fullDialect)
    result.map((data) => {
      datasets.sentences = data
      currentDataset.value = datasets.sentences[0]
    }).mapErr(err => toast.error(err.msg))
  })

  watchEffect(async() => {
    if (datasets.sentences.length === 2) {
      const result = await getDatasets(fullDialect)
      result.map(newDatasets => datasets.sentences.push(...newDatasets)).mapErr(err => toast.error(err.msg))
    }
  })

  function skipDataset(): void {
    if (datasets.sentences.length > 1) {
      datasets.sentences.shift()
      currentDataset.value = datasets.sentences[0]
    }
  }

  return {
    currentDataset,
    skipDataset,
  }
}
