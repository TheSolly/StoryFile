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

class AskingState extends Component {
  state = {
    videoURL: null,
    waitingImageURL: null,
    backgroundColor: 'green',
    title: 'Hold to Talk..',
    subtitle: 'Start speaking after you hold',
    iconStatus: 'microphone',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  handleRecord = () => {
    this.setState({
      backgroundColor: 'red',
      title: 'Release to ask..',
      subtitle: 'stop recording when you are ready..',
    });
  };

  handleRelease = () => {
    this.setState({
      backgroundColor: 'rgba(52, 52, 52, 0.3)',
      title: 'loading..',
      subtitle: 'contemplating your question deeply..',
    });
    var postData = {
      params: {
        audio: null,
      },
    };
    let axiosConfig = {
      headers: {
        Authorization: 'Token APPLICANT_LOVES_STORYFILE',
      },
    };
    axios
      .post(
        'https://api-stg.story-file.optima.io/api/v1/admin/audios/1',
        postData,
        axiosConfig,
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {!this.state.videoURL ? (
          <Loading />
        ) : (
          <Assistant
            videoURL={this.state.videoURL}
            stopLoading={this.stopLoading}
          />
        )}
        <TouchableOpacity
          onPressIn={this.handleRecord}
          onPressOut={this.handleRelease}
          activeOpacity={0.75}
          style={[
            styles.bottomBar,
            { backgroundColor: this.state.backgroundColor },
          ]}>
          <Icon
            name={this.state.iconStatus}
            size={50}
            color="#fff"
            style={{ paddingHorizontal: 15 }}
          />
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.subtitle}>{this.state.subtitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loading}>Loading...</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const Assistant = ({ videoURL, stopLoading }) => {
  return (
    <Video
      source={{
        uri: videoURL,
      }}
      bufferConfig={{
        // minBufferMs: 500,
        // maxBufferMs: 50000,
        bufferForPlaybackMs: 2500,
        // bufferForPlaybackAfterRebufferMs: 5000
      }}
      resizeMode="cover"
      style={styles.backgroundVideo}
      repeat
      onLoad={stopLoading}
      // onBuffer={this.stopLoading}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#2C3942',
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
    alignContent: 'center',
    justifyContent: 'center',
    height: 75,
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
    marginTop: -50, // need improvement
    fontSize: 17,
    color: '#fff',
  },
  subtitle: {
    paddingLeft: 64,
    fontSize: 12,
    color: '#fff',
    fontWeight: '100',
  },
});

export default AskingState;
