import React from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native'

// Card reutilizável: usado na busca, nos residentes e nos personagens do episódio
const CharacterCard = ({ character, onPress }) => {
  const { name, status, species, image } = character

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.image} source={{ uri: image }} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text>{status}</Text>
        <Text>{species}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 6
  },
  name: {
    fontWeight: 'bold'
  }
})

export default CharacterCard