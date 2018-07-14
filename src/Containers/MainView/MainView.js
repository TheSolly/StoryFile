import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

class MainView extends Component {
  state = {
    videoURL: null,
    loading: true,
    waitingImageURL: null,
  };
  componentDidMount() {
    axios
      .get('https://api-stg.story-file.optima.io/api/v1/admin/users/1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token APPLICANT_LOVES_STORYFILE',
        },
      })
      .then(response => {
        if (response.data.has_default_waiting_video) {
          this.setState({
            videoURL: response.data.waiting_video,
            waitingImageURL: response.data.personal_image,
          });
        } else {
          this.setState({
            videoURL:
              'https://s3.amazonaws.com/storyfile-dev-output/uploads/720OutCannotAnswerUser1',
          });
        }
      });
  }
  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    let loading = null;
    let waitingVideo = null;
    if (!this.state.videoURL) {
      loading = (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    } else {
      waitingVideo = (
        <Video
          source={{
            uri: this.state.videoURL,
          }}
          resizeMode="cover"
          style={styles.backgroundVideo}
          repeat
          onLoad={this.stopLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity style={styles.bottomBar}>
          <Icon name="microphone" size={50} color="#fff" />
          <Text style={styles.title}>Hold to Talk..</Text>
          <Text style={styles.subtitle}>Start speaking after you hold</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  bottomBar: {
    alignSelf: 'stretch',
    height: 75,
    backgroundColor: '#53C399',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    paddingLeft: 64,
    marginTop: -50,
    fontSize: 17,
    color: '#fff',
  },
  subtitle: {
    paddingLeft: 64,
    fontSize: 15,
    color: '#fff',
  },
});

export default MainView;
