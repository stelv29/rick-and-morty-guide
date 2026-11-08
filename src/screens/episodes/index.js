import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import { getManyByUrls } from '../../api/rick-and-morty'

const EpisodesScreen = ({ navigation, route }) => {
  const { episodeUrls } = route.params

  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      try {
        const result = await getManyByUrls('episode', episodeUrls)
        if (!ignore) setEpisodes(result)
      } catch (e) {
        if (!ignore) setError('Could not load episodes.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [episodeUrls])

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />
  if (error) return <Text style={styles.error}>{error}</Text>

  return (
    <FlatList
      style={styles.mainView}
      data={episodes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.air_date}</Text>
          <Text>{item.episode}</Text>
          <View style={styles.button}>
            <Button
              title="CHARACTERS"
              onPress={() => navigation.push('Characters', { characterUrls: item.characters })}
            />
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  button: {
    marginTop: 8
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

export default EpisodesScreen