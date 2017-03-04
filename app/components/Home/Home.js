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
import Ionicon from 'react-native-vector-icons/Ionicons';
import {AudioPlayer, AudioRecorder, AudioUtils} from 'react-native-audio-player-recorder';

const {dHeight, dWidth} = Dimensions.get('window');
const Constants = {
  MAX_AUDIO_LENGTH: 120,
  AUDIO_PATH: '123'
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isPlaying: false,
      isPaused: false,
      currentTime: 0
    }
    this.timer = null;

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
    this.recordTitle = AudioUtils.DocumentDirectoryPath + `/example-${moment().format()}.aac`;
    AudioRecorder.prepareRecordingAtPath(this.recordTitle, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  _record() {
    if (this.state.currentTime == 0) {
      this.prepareRecordingPath();
    }

    AudioRecorder.startRecording();
    this.setState({isRecording: true});
    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({currentTime: time})
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  _pauseRecording() {
    AudioRecorder.pauseRecording();
    clearInterval(this.timer);
    this.setState({isRecording: false});
  }

  _stopRecording() {
    AudioRecorder.stopRecording();
    this.props.saveRecord(this.recordTitle, this.state.currentTime + 1)
    clearInterval(this.timer);
    this.setState({isRecording: false, currentTime: 0});
  }

  _startPlaying(path) {
    AudioPlayer.play(path)
    this.setState({isPlaying: true})
  }

  _stopPlaying() {
    AudioPlayer.stop();
    this.setState({isPlaying: false})
  }

  _deleteRecord(path) {
    this.props.deleteRecord(path);
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={{
        backgroundColor: 'white'
      }}>
        <View style={{
          paddingLeft: 20,
          height: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <TouchableHighlight underlayColor={'transparent'} onPress={() => {
            this._startPlaying(rowData.path);
          }}>
            <View style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              borderColor: 'black',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicon name={'md-play'} size={24} color={'black'}/>
            </View>
          </TouchableHighlight>
          <Text style={{
            color: '#616161'
          }}>{rowData.title}</Text>
          <TouchableHighlight underlayColor={'transparent'} onPress={() => {
            this._deleteRecord(rowData.path);
          }}>
            <View style={{
              marginRight: 20,
              height: 36,
              width: 36,
              borderRadius: 3,
              borderColor: 'red',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicon name={'md-trash'} size={24} color={'red'}/>
            </View>
          </TouchableHighlight>
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
    let timer = moment.duration(this.state.currentTime, 'seconds');
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
          backgroundColor: 'black'
        }}>
          <TouchableHighlight underlayColor={'transparent'} onPress={() => {
            if (this.state.isRecording) {
              this._pauseRecording();
            } else {
              this._record();
            }
          }}>
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
              {this.state.isRecording
                ? <Ionicon name={'md-pause'} size={30} color={'white'}/>
                : <View style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: '#F22335'
                }}/>
              }
            </View>
          </TouchableHighlight>
          <Text style={{
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
            color: 'white'
          }}>{this.state.currentTime == 0
            ? '00:00:00'
            : `${moment.utc(timer.as('milliseconds')).format('HH:mm:ss')}`}</Text>
          {this.state.isRecording
            ? <TouchableHighlight underlayColor={'transparent'} onPress={() => this._stopRecording()}>
              <Text style={{
                  height: 40,
                  width: 60,
                  marginLeft: 20,
                  marginTop: 20,
                  fontSize: 16,
                  color: 'white'
                }}>
                  Done
                </Text>
              </TouchableHighlight>
            : null}
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