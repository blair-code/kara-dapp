/* eslint-disable */
import Web3 from 'web3'
import {store} from '../store/'

function addProposal (dataId, cb) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  if (web3 && store.state.web3.web3Instance) {
    if (store.state.contractInstance) {
      let databaseAddress = process.env.KARA_DATABASE_ADDRESS
      let description = ''
      let requestedTokens = 0
      let curator = store.state.web3.coinbase
      console.log(store.state.contractInstance())
      store.state.contractInstance().methods.proposeAddShard(databaseAddress, description, dataId, requestedTokens, curator).send({from: curator}, cb)
    } else {
      console.error('contractInstance not found. Did you configure a contract address?')
    }
  } else {
    console.error('web3 not initialized correctly. Cannot send transaction to blockchain.')
  }
}

export default addProposal
