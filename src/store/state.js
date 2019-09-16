let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  data: {
    uploadedFiles: [],
    model: null,
    id: 0
  },
  contractInstance: null
}
export default state
