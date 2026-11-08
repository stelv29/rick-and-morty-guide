import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import { getCharacterById } from '../../api/rick-and-morty'

const CharacterDetailScreen = ({ navigation, route }) => {
  const { id } = route.params

  const [character, setCharacter] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      try {
        const result = await getCharacterById(id)
        if (!ignore) setCharacter(result)
      } catch (e) {
        if (!ignore) setError('Could not load this character.')
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [id])

  if (error) return <Text style={styles.error}>{error}</Text>
  if (!character) return <ActivityIndicator size="large" style={styles.loading} />

  const { name, status, species, type, gender, image, origin, location, episode } = character

  // Alguns personagens têm origin/location "unknown" e url vazia: não dá para clicar
  const openLocation = (place) => {
    if (place.url) navigation.push('LocationDetail', { url: place.url })
  }

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>

      <Text>Species: {species}</Text>
      <Text>Type: {type || '-'}</Text>
      <Text>Gender: {gender}</Text>

      <Pressable onPress={() => openLocation(origin)} style={styles.link}>
        <Text style={origin.url ? styles.linkText : null}>Origin: {origin.name}</Text>
      </Pressable>
      <Pressable onPress={() => openLocation(location)} style={styles.link}>
        <Text style={location.url ? styles.linkText : null}>Location: {location.name}</Text>
      </Pressable>

      <View style={styles.button}>
        <Button
          title={`EPISODES (${episode.length})`}
          onPress={() => navigation.push('Episodes', { episodeUrls: episode })}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    backgroundColor: 'white',
    flexGrow: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  headerText: {
    flex: 1
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginRight: 12
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  status: {
    fontSize: 18
  },
  link: {
    marginTop: 12
  },
  linkText: {
    color: '#1E6FD9',
    textDecorationLine: 'underline'
  },
  button: {
    marginTop: 24
  },
  loading: {
    marginTop: 40
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40
  }
})

export default CharacterDetailScreen