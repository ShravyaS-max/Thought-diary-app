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
  TextInput,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      dropdownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addStory() {
    if (this.state.title && this.state.story) {
      var d = new Date();
      let storyData = {
        title: this.state.title,
        story: this.state.story,
        // author: firebase.auth().currentUser.displayName,
        created_on: d.toString(),
        author_uid: firebase.auth().currentUser.uid,
      };
      console.log(storyData);
      await firebase
        .database()
        .ref(
          '/users/' +
            firebase.auth().currentUser.uid +
            '/posts/' +
            this.state.title
        )
        .set(storyData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('Feed');
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

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
              <Text style={styles.appTitleText}>Dear diary...</Text>
            </View>
          </View>

          <View style={styles.fieldsContainer}>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
            </View>
            <ScrollView>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Title: <K.I.S.S summary of thought :)>'}
                placeholderTextColor="#FFFFFF"
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(story) => this.setState({ story })}
                placeholder={'My thought: <Your beautiful thought>'}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="#FFFFFF"
              />
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addStory()}
                  title="Submit"
                  color="#3f3f4e"
                />
              </View>
            </ScrollView>
          </View>
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
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    justifyContent: 'center',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: '#FFFFFF',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: '#FFFFFF',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(5),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
