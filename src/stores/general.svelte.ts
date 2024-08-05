import type { HLJSApi } from 'highlight.js'

function createStore(hljsInstance: HLJSApi) {
  let inTestPage = $state(false)
  let headerId = $state<string>('')

  return {
    get inTestPage() {
      return inTestPage
    },
    get headerId() {
      return headerId
    },
    set inTestPage(val) {
      inTestPage = val
    },
    set headerId(val) {
      headerId = val
    },
    get hljs() {
      return hljsInstance
    }
  }
}

let storeInstance: ReturnType<typeof createStore>

export const useStore = (hljs?: HLJSApi) => {
  if (storeInstance) {
    return storeInstance
  }
  if (!hljs) {
    throw new Error('hljs required to init general store')
  }

  storeInstance = createStore(hljs)
  return storeInstance
}
