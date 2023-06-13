import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';

import Spinner from '../component/ui/Spinner';
import * as Location from 'expo-location';
import { getWeather, addAsFavourite, getWeatherBycity } from '../utilities/http';

const MainScreen = () => {
  const { styles } = myStyles();

  const [searchedCity, setSearchedCity] = useState('');
  const [searchedLatitude, setSearchedLatitude] = useState('');
  const [searchedLongitude, setSearchedLongitude] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync();
        const currentGPStLocation = await getWeather(
          location.coords.latitude,
          location.coords.longitude
        );

        setCurrentLocation(currentGPStLocation);

        // setCurrentCity(currentLocation.name);
        // setCurrentTemp(currentLocation.main.temp);
        // setCurrentFeelsLike(currentLocation.main.feels_like);
      }
      setIsLoading(false);
    })();

    // async function getCurrentWeather() {
    //   const weatherData = await getWeather(currentCity);
    //   console.log(weatherData);
    //   setCurrentTemp(Math.round(weatherData.main.temp));
    //   setCurrentFeelsLike(Math.round(weatherData.main.feels_like));
    // }

    // getCurrentWeather();
  }, []);

  const onSearchHandler = async () => {
    const location = await getWeatherBycity(searchedCity);
    if (!location) {
      Alert.alert('Hittar inte', `Kan inte hitta någon stad med namnet ${city}`);
      return;
    }
    setSearchedLocation(location);
  };

  const onChangeSearchText = (text) => {
    setSearchedCity(text);
  };

  const onSaveAsFavourite = async () => {
    const weatherData = {
      city: searchedCity,
      latitude: searchedLatitude,
      longitude: searchedLongitude,
    };
    await addAsFavourite(weatherData);
  };

  const { width } = useWindowDimensions();

  let content = (
    <ImageBackground
      source={require('../assets/images/bakgrund.jpg')}
      resizeMode="cover"
      style={styles.screen}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.screen}>
        <View style={styles.weatherContainer}>
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.currentCity}>{currentLocation?.name}</Text>
            <Text style={styles.currentCityData}>Aktuell Temperatur</Text>
            <Text style={styles.currentCityData}>{currentLocation?.main.temp}°C</Text>
            <Text style={styles.currentCityData}>Känns som</Text>
            <Text style={styles.currentCityData}>{currentLocation?.main.feels_like}°C</Text>
          </View>

          <View style={styles.searchedWeatherContainer}>
            <TextInput
              style={styles.inputCity}
              placeholder="Ange ort"
              value={searchedCity}
              onChangeText={onChangeSearchText}
            />
            <Pressable onPress={onSearchHandler}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sök</Text>
              </View>
            </Pressable>
            <Text>Temperatur Sökt Ort</Text>
            <Text>{searchedLocation?.name}</Text>
            <Text>Temp</Text>
            <Text>{searchedLocation?.main.temp}</Text>
          </View>

          <Pressable onPress={onSaveAsFavourite}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Spara som Favorit</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );

  if (isLoading) {
    return <Spinner text="Vänta hämtar GPS Position" />;
  }

  return <View style={styles.screen}>{content}</View>;
};

export default MainScreen;

const myStyles = () => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    weatherContainer: {
      flex: 1,
      marginTop: 150,
      alignItems: 'center',
    },
    currentWeatherContainer: {
      marginBottom: 25,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      padding: 4,
    },
    currentCity: {
      fontSize: Platform.select({ ios: 32, android: 24 }),
      textAlign: 'center',
    },
    currentCityData: {
      fontSize: 24,
      marginVertical: 2,
      textAlign: 'center',
    },
    searchedWeatherContainer: {},
    inputCity: {
      fontSize: 28,
      borderColor: '#000000',
      borderRadius: 5,
      borderWidth: 1,
      padding: 5,
      width: 200,
      textAlign: 'center',
    },
    buttonContainer: {
      borderColor: '#000000',
      borderRadius: 10,
      backgroundColor: Platform.select({ ios: '#002aff', android: '#3bae0d' }),
      padding: 8,
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 18,
      color: '#f4f4f4',
    },
    backgroundImage: {
      opacity: 0.9,
    },
  });

  return { styles };
};
