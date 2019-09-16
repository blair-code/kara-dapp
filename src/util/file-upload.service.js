/*
  Uploading files via front-end
*/

function upload (formData) {
  const photos = formData.getAll('photos')
  const promises = photos.map((x) => getImage(x)
    .then(img => ({
      id: img,
      originalName: x.name,
      fileName: x.name,
      url: img,
      deg: 0,
      needVal: false
    })))
  return Promise.all(promises)
}

function getImage (file) {
  return new Promise((resolve, reject) => {
    const fReader = new FileReader()
    const img = document.createElement('img')
    fReader.onload = () => {
      img.src = fReader.result
      resolve(img.src)
    }
    fReader.readAsDataURL(file)
  })
}

function extractInfos (imgData, coords) {
  const promises = coords.map((x) => cropImage(imgData, x)
    .then(dataURL => ({
      id: dataURL,
      url: dataURL
    })))
  return Promise.all(promises)
}

// Crops image according to relative position specified in a literal coords object
function cropImage (imgData, coords) {
  return new Promise((resolve, reject) => {
    // crop image
    var img = new Image()
    img.onload = function () {
      console.log(img.width, img.height)
      // convert into absolute values
      var absWidth = img.width * coords.sourceWidth
      var absHeight = img.height * coords.sourceHeight
      var absX = img.width * coords.sourceX
      var absY = img.height * coords.sourceY
      const canvas = document.createElement('canvas')
      canvas.width = absWidth
      canvas.height = absHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, absX, absY, absWidth, absHeight, 0, 0, canvas.width, canvas.height)
      const dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
    }
    img.src = imgData
    // return dataURL
  })
}

export { upload, extractInfos }
