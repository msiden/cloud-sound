const express = require('express')
const app = express()
const port = 3000
const { promises: fs } = require('fs')
const fileUpload = require('express-fileupload')

const basePath = './data'

async function initFolders() {
  await fs.mkdir(basePath, { recursive: true })
}

app.use(fileUpload())

app.post('/files', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400)
    res.send('No files provided')
  }
  for (let fileId of Object.keys(req.files)) {
    await fs.writeFile(`${basePath}/${fileId}`, req.files[fileId].data)
  }
  res.status(201)
  res.send()
})

app.get('/files/:fileId', async (req, res) => {
  const { fileId } = req.params
  try {
    const thing = await fs.readFile(`${basePath}/${fileId}`)
    res.send(thing)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send('File not found')
    } else {
      throw err
    }
  }
})

app.delete('/files/:fileId', async (req, res) => {
  const { fileId } = req.params
  try {
    await fs.unlink(`${basePath}/${fileId}`)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send('File not found')
    } else {
      throw err
    }
  }
  res.status(204)
  res.send()
})

app.listen(port, async () => {
  await initFolders()
  console.log(`Listening on port ${port}`)
})
