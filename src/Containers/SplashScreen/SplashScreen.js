import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../../Assets/logo.png')} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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
