import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import { getLocationByUrl } from '../../api/rick-and-morty'

const LocationDetailScreen = ({ navigation, route }) => {
  const { url } = route.params

  const [place, setPlace] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      try {
        const result = await getLocationByUrl(url)
        if (!ignore) setPlace(result)
      } catch (e) {
        if (!ignore) setError('Could not load this location.')
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [url])

  if (error) return <Text style={styles.error}>{error}</Text>
  if (!place) return <ActivityIndicator size="large" style={styles.loading} />

  const { name, type, dimension, residents } = place

  return (
    <View style={styles.mainView}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.info}>{type}</Text>
      <Text style={styles.info}>{dimension}</Text>

      <View style={styles.button}>
        <Button
          title={`RESIDENTS (${residents.length})`}
          disabled={residents.length === 0}
          onPress={() => navigation.push('Characters', { characterUrls: residents })}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 18,
    marginTop: 4
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

export default LocationDetailScreen