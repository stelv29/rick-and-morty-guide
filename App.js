import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import MenuScreen from './src/screens/menu'
import EffectIntroductionScreen from './src/screens/effect-introduction'
import MainCharsScreen from './src/screens/main-chars'
import CharsEffectScreen from './src/screens/chars-effect'
import CharactersScreen from './src/screens/characters'
import CharacterDetailScreen from './src/screens/character-detail'
import LocationDetailScreen from './src/screens/location-detail'
import EpisodesScreen from './src/screens/episodes'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="EffectIntroduction" component={EffectIntroductionScreen} />
        <Stack.Screen name="MainChars" component={MainCharsScreen} />
        <Stack.Screen name="CharsEffect" component={CharsEffectScreen} />
        <Stack.Screen name="Characters" component={CharactersScreen} options={{ title: 'Characters' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Character Detail' }} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: 'Location Detail' }} />
        <Stack.Screen name="Episodes" component={EpisodesScreen} options={{ title: 'Episodes' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}