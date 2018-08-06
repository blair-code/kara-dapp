import IpfsApi from 'ipfs-api'
import {store} from '../store/'

function uploadToIPFS (state, files) {
  store.state.ipfsInstance.files.add(files, { wrapWithDirectory: true }, (err, filesAdded) => {
    if (err) { throw err }

    return filesAdded.find(function (file) { return file.path === '' })
  })
}

export default uploadToIPFS
