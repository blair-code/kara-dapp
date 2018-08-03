import Web3 from 'web3'
import {store} from '../store/'

function addProposal(state, ipfs_hash) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  if (web3 && store.state.web3.web3Instance) {
    if (store.state.contractInstance) {

      databaseAddress = process.env.KARA_DATABASE_ADDRESS;
      description = '';
      requestedTokens = 0;
      curator = store.state.web3.coinbase;

      store.state.contractInstance.proposeAddShard.sendTransaction(databaseAddress, description, ipfs_hash, requestedTokens, curator);
      // TODO Handle errors when the transaction has not been sent (e.g. a MetaMask error)
    }
    
  }
}

function uploadToIPFS(state, files) {
  store.state.ipfsInstance.files.add(files, { wrapWithDirectory: true }, (err, filesAdded) => {
    if (err) { throw err }

    return filesAdded.find(function(file) {return "" == file.path;});
  }
}
export {addProposal, uploadToIPFS}
