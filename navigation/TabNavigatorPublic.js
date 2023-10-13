import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/FeedPublic';
import CreateStory from '../screens/CreateStoryPublic';
import StoryScreen from '../screens/StoryScreen';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false,
    };
  }

  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderStory = (props) => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  componentDidMount() {}

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Create Story') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={'#52b4ca'}
        inactiveColor={'#3686a0'}>
        <Tab.Screen
          name="Feed"
          component={this.renderFeed}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Create Story"
          component={this.renderStory}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#1E3442',
    height: '8%',
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: 'hidden',
    position: 'absolute',
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
