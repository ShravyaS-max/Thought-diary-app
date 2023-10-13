import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import * as Font from 'expo-font';
import firebase from 'firebase';
import StoryCard from './StoryCard';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: '#00356b',
      speakerIcon: 'volume-high',
      homeIcon: 'home',
      binIcon: 'trash',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async initiateTTS(title, story, moral) {
    console.log(title);
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === '#00356b' ? '#52b4ca' : '#00356b',
    });
    if (current_color === '#00356b') {
      Speech.speak(title);
      Speech.speak(story);
    } else {
      Speech.stop();
    }
  }

  deleteData(title) {
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/posts/' + title)
      .remove();
    this.props.navigation.navigate('Home');
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Thoughtdiary</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.value.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.value.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.value.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.story.value.title,
                        this.props.route.params.story.value.story
                      )
                    }>
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {this.props.route.params.story.value.story}
                </Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Ionicons
                name={this.state.homeIcon}
                size={RFValue(30)}
                color="#3f3f4e"
                style={{ margin: RFValue(15) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.deleteData(this.props.route.params.story.value.title)
              }>
              <Ionicons
                name={this.state.binIcon}
                size={RFValue(30)}
                color="#3f3f4e"
                style={{ margin: RFValue(15) }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59788e',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: '#FFFFFF',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: '#59788e',
    borderRadius: RFValue(20),
  },
  dataContainer: {
    flexDirection: 'row',
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: '#FFFFFF',
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(15),
    color: '#FFFFFF',
  },
  storyTitleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: '#FFFFFF',
  },
});
