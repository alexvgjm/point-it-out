function createStore() {
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
    }
  }
}

export const generalStore = createStore()
