import Web3 from 'web3'
import {address, ABI} from './constants/databaseAssociationContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let dbaContractInstance = new web3.eth.Contract(ABI, address)
  console.log(dbaContractInstance)
  resolve(dbaContractInstance)
})

export default getContract
