import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import StackNavigatorPublic from "./StackNavigatorPublic";
import Logout from "../screens/Logout";
import firebase from "firebase";

import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}
        screenOptions={{
          headerShown: false, 
          drawerActiveTintColor: "#e91e63",
          drawerInactiveTintColor: "grey",
          itemStyle: { marginVertical: 5 }
        }}
      >
        <Drawer.Screen
          name="My Thought Diary"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Public thoughts"
          component={StackNavigatorPublic}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
