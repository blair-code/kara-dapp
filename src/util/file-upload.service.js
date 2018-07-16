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
      url: img
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

export { upload }
