import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  ListView
} from 'react-native';
import moment from 'moment';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AudioPlayer, AudioRecorder, AudioUtils} from 'react-native-audio-player-recorder';

const {dHeight, dWidth} = Dimensions.get('window');
const Constants = {
  MAX_AUDIO_LENGTH: 120,
  AUDIO_PATH: AudioUtils.DocumentDirectoryPath + '/example.aac',
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: '00:00'
    }

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
  }

  componentDidMount() {
    if (this.props.rehydrated) {
      // this.props.addTempData()
    }
  }

  prepareRecordingPath() {
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  _record() {
    AudioRecorder.startRecording()
    this.setState({isPlaying: false, isRecording: true, isFinishRecorded: false, audioLength: 0, currentTime: 0})
    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({currentTime: time})
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  _stopRecording() {
    const {isRecording} = this.state
    if (!isRecording) 
      return

    AudioRecorder.stopRecording()
    this.setState({
      audioLength: this.state.currentTime + 1
    })
    clearInterval(this.timer)
    this.setState({isRecording: false, isFinishRecorded: true, currentTime: 0})
  }

  _startPlaying() {
    if (this.state.isPaused) {
      AudioPlayer.unpause()
      this.setState({isPlaying: true, isPaused: false})
      return
    }
    AudioPlayer.play(Constants.AUDIO_PATH)
    this.setState({isPlaying: true})
  }

  _pausePlaying() {
    AudioPlayer.pause()
    this.setState({isPaused: true, isPlaying: false})
  }

  _stopPlaying() {
    AudioPlayer.stop()
    this.setState({isPlaying: false})
  }

  _playAudio() {
    Actions.player({durationSeconds: this.state.audioLength})
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={{
        backgroundColor: 'white'
      }}>
        <View style={{
          paddingLeft: 20,
          height: 50,
          justifyContent: 'center'
        }}>
          <Text style={{
            paddingTop: 25,
            color: '#616161'
          }}>{rowData.title}</Text>
        </View>
        <View style={{
          marginLeft: 20,
          height: 1,
          backgroundColor: '#616161'
        }}/>
      </View>
    )
  }

  render() {
    let dataSource = this.dataSource.cloneWithRows(this.props.recordList);
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} hidden={false}/>
        <View style={{
          paddingTop: 20,
          height: 60,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 18
          }}>{'Record'}</Text>
        </View>
        <View style={{
          height: 80,
          backgroundColor: 'black'
        }}>
          <TouchableHighlight underlayColor={'transparent'} onPress={() => {}}>
            <View style={{
              alignSelf: 'center',
              height: 44,
              width: 44,
              borderRadius: 22,
              borderColor: 'white',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: '#F22335'
              }}/>
            </View>
          </TouchableHighlight>
          <Text style={{
            alignSelf: 'center',
            marginTop: 10,
            color: 'white'
          }}>{this.state.timer}</Text>
        </View>
        <ListView enableEmptySections={true} dataSource={dataSource} renderRow={this._renderRow.bind(this)} showsVerticalScrollIndicator={false}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});