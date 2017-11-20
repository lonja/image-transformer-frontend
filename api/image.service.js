import * as axios from 'axios'

const BASE_URL = 'http://localhost:8080'

const HTTP = axios.create({
  baseURL: BASE_URL
})

function rotate (data) {
  const url = `${BASE_URL}/rotate`
  const form = new FormData()
  Array
    .from(new Array(data.files.length).keys())
    .map(x => {
      form.append('file', data.files[x])
    })
  form.append('angle', data.angle)
  return HTTP.post(url, form)
    .then(response => {
      console.info('response', response)
      return response.data.items
    })
    .catch(error => console.error('error', error))
}

function resize (data) {
  const url = `${BASE_URL}/resize`
  const form = new FormData()
  Array
    .from(new Array(data.files.length).keys())
    .map(x => {
      form.append('file', data.files[x])
    })
  form.append('keepRatio', data.keepRatio)
  form.append('width', data.width)
  form.append('height', data.height)
  return HTTP.post(url, form)
    .then(response => {
      console.info('response', response)
      return response.data.items
    })
    .catch(error => console.error('error', error))
}

function crop (data) {
  const url = `${BASE_URL}/crop`
  const form = new FormData()
  Array
    .from(new Array(data.files.length).keys())
    .map(x => {
      form.append('file', data.files[x])
    })
  form.append('width', data.width)
  form.append('height', data.height)
  return HTTP.post(url, form)
    .then(response => {
      console.info('response', response)
      return response.data.items
    })
    .catch(error => console.error('error', error))
}

function flip (data) {
  const url = `${BASE_URL}/flip`
  const form = new FormData()
  Array
    .from(new Array(data.files.length).keys())
    .map(x => {
      form.append('file', data.files[x])
    })
  return HTTP.post(url, form)
    .then(response => {
      console.info('response', response)
      return response.data.items
    })
    .catch(error => console.error('error', error))
}

function flop (data) {
  const url = `${BASE_URL}/flop`
  const form = new FormData()
  Array
    .from(new Array(data.files.length).keys())
    .map(x => {
      form.append('file', data.files[x])
    })
  return HTTP.post(url, form)
    .then(response => {
      console.info('response', response)
      return response.data.items
    })
    .catch(error => console.error('error', error))
}

export {
  rotate,
  resize,
  crop,
  flip,
  flop
}
