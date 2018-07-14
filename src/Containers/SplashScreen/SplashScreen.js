import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

class SplashScreen extends Component {
  componentDidMount() {
    this.requestMicPermission();
  }

  async requestMicPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'StoryFile App Mic Permission',
          message: 'StoryFile needs access to your Mic ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the mic');
        // alert('Mic Permission granted!');
      } else {
        console.log('Mic permission denied');
        alert('Mic permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2C3942" />
        <View style={styles.logo}>
          <Image
            style={{ resizeMode: 'contain', height: 100 }}
            source={require('../../Assets/logo.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MainView')}
            style={styles.button}>
            <Text style={styles.text}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C3942',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#9E7AC2',
    width: 240,
    height: 40,
    borderRadius: 5,
    shadowColor: 'rgba(159, 120, 196, 0.25)',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  },
});

export default SplashScreen;
