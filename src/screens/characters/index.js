import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import CharacterCard from '../../components/CharacterCard'
import { getCharacter, getNextCharacterPage, getManyByUrls } from '../../api/rick-and-morty'



// 1) Busca (padrão): campo de texto + botão SEARCH
// 2) Lista recebida: quando outra tela manda route.params.characterUrls

//    (residentes de um local ou personagens de um episódio)


const CharactersScreen = ({ navigation, route }) => {
  const characterUrls = route.params?.characterUrls
  const isListMode = Array.isArray(characterUrls)

  const [nameSearch, setNameSearch] = useState('')
  const [characters, setCharacters] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Modo lista: carrega os personagens assim que a tela monta
  useEffect(() => {
    if (!isListMode) return

    let ignore = false

    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const result = await getManyByUrls('character', characterUrls)
        if (!ignore) setCharacters(result)
      } catch (e) {
        if (!ignore) setError('Could not load characters.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [isListMode, characterUrls])

  const search = async () => {
    setLoading(true)
    setError('')
    try {
      const { info, results } = await getCharacter({ name: nameSearch })
      setPageInfo(info)
      setCharacters(results)
    } catch (e) {
      // A API responde 404 quando nenhum personagem é encontrado
      setPageInfo({})
      setCharacters([])
      setError('No characters found.')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    try {
      const { info, results } = await getNextCharacterPage(pageInfo.next)
      setPageInfo(info)
      setCharacters((current) => [...current, ...results])
    } catch (e) {
      setError('Could not load more characters.')
    }
  }

  return (
    <View style={styles.mainView}>
      {!isListMode && (
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="char name"
            onChangeText={setNameSearch}
            value={nameSearch}
            onSubmitEditing={search}
          />
          <Button title="SEARCH" onPress={search} />
        </View>
      )}

      {loading && <ActivityIndicator size="large" style={styles.feedback} />}
      {!!error && <Text style={[styles.feedback, styles.error]}>{error}</Text>}

      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.push('CharacterDetail', { id: item.id })}
          />
        )}
      />

      {!isListMode && pageInfo.next && (
        <Button title="Load More..." onPress={loadMore} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: 'white',
    height: 40,
    padding: 8,
    marginBottom: 8
  },
  feedback: {
    marginVertical: 10
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

export default CharactersScreen