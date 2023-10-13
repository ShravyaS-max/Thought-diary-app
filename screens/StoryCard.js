import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    let story = this.state.story_data;
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate('StoryScreen', {
              story: this.props.story,
            })
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text style={styles.storyTitleText}>{story.title}</Text>
                <Text style={styles.storyAuthorText}>{story.author}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#59788e',
    borderRadius: RFValue(20),
  },
  storyAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: '#FFFFFF',
  },
  storyTitleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: '#FFFFFF',
  },
});
