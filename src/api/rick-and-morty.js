const baseURL = 'https://rickandmortyapi.com/api/'
const timeout = 5000


const request = async (url) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })

    

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

const getNextCharacterPage = async (url) => {
  return await request(url)
}

const getCharacter = async ({ name = '' }) => {
  const uri = encodeURI(`${baseURL}character/?name=${name}`)
  return await request(uri)
}

// ---------- Funções extras do Exercício 6 ----------

// "https://rickandmortyapi.com/api/character/2" -> "2"
const getIdFromUrl = (url) => url.split('/').pop()

const getCharacterById = async (id) => {
  return await request(`${baseURL}character/${id}`)
}

// Origin e location já vêm com a URL completa na resposta do personagem
const getLocationByUrl = async (url) => {
  return await request(url)
}

// A API aceita vários ids separados por vírgula: /character/1,2,3
// Atenção: com UM id ela devolve um objeto, com vários devolve um array.
const getManyByUrls = async (resource, urls) => {
  if (!urls || urls.length === 0) return []
  const ids = urls.map(getIdFromUrl).join(',')
  const data = await request(`${baseURL}${resource}/${ids}`)
  return Array.isArray(data) ? data : [data]
}

export {
  getCharacter,
  getNextCharacterPage,
  getCharacterById,
  getLocationByUrl,
  getManyByUrls
}