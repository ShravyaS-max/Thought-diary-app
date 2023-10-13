import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';

import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let stories = require('./temp_stories.json');

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      stories: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchStories();
  }

  fetchStories = () => {
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/posts/')
      .on(
        'value',
        (snapshot) => {
          let stories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              stories.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ stories: stories });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
  };

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
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
              <Text style={styles.appTitleText}>Thought Diary</Text>
            </View>
          </View>
          {!this.state.stories[0] ? (
            <View style={styles.noStories}>
              <Text style={styles.noStoriesText}>
                Sorrow emptiness.... fill it beautiful thoughts!!
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.stories}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c7da0',
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
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStoriesText: {
    color: '#FFFFFF',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
  },
});
