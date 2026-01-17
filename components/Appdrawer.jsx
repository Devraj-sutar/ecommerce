import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native';


const Appdrawer = () => {
  const navigation = useNavigation()
  const currentRoute = useNavigationState((state) => state.routes[state.index]?.name);


  return (
    <View style={styles.navbarcontainer}>
      <Image source={require('../images/appshadow.png')} style={styles.gradient} />

      <TouchableOpacity
        style={styles.drawerbutton1}
        onPress={() => navigation.navigate('home')}
      >
        <Image
          source={require('../images/lucide_home2x.png')}
          style={[
            styles.navbar,
            { tintColor: currentRoute === 'home' ? '#8917C6' : '#242424' },
          ]}
        />
        <Text
          style={[
            styles.appdrawebutton,
            { color: currentRoute === 'home' ? '#8917C6' : '#242424' },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerbutton}
        onPress={() => navigation.navigate('shopall')}
      >
        <Image
          source={require('../images/material-symbols_explore-outline2x.png')}
          style={[
            styles.navbar,
            { tintColor: currentRoute === 'shopall' ? '#8917C6' : '#242424' },
          ]}
        />
        <Text
          style={[
            styles.appdrawebutton,
            { color: currentRoute === 'shopall' ? '#8917C6' : '#242424' },
          ]}
        >
          Shop All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerbutton}
        onPress={() => navigation.navigate('shopall')}
      >
        <Image
          source={require('../images/iconamoon_category-light2x.png')}
          style={[
            styles.navbar,
            { tintColor: currentRoute === 'categories' ? '#8917C6' : '#242424' },
          ]}
        />
        <Text
          style={[
            styles.appdrawebutton,
            { color: currentRoute === 'categories' ? '#8917C6' : '#242424' },
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerbutton2}
      >
        <Image
          source={require('../images/material-symbols_account-circle-outline2x.png')}
          style={[
            styles.navbar,
            { tintColor: currentRoute === 'account' ? '#8917C6' : '#242424' },
          ]}
        />
        <Text
          style={[
            styles.appdrawebutton,
            { color: currentRoute === 'account' ? '#8917C6' : '#242424' },
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Appdrawer

const styles = StyleSheet.create({
  navbarcontainer: {
    backgroundColor: '#fff',
    // elevation: 5,
    // marginHorizontal:20,
    // paddingHorizontal: 20,
    position: 'relative',
    borderColor: '#000',
    flexDirection: 'row',
    paddingTop: 13,
    // marginRight:5,
    justifyContent: 'space-between'
  },
  gradient: {
    // height: 20,
    width: '100%',
    position: 'absolute'
  },
  navbar: {
    marginBottom: 10,
    height: 24,
    width: 24
  },
  drawerbutton: {
    alignItems: "center"
  },
  drawerbutton1: {
    paddingLeft: 20,
    alignItems: "center"
  },
  drawerbutton2: {
    paddingRight: 20,
    alignItems: "center"
  },
  appdrawebutton: {
    fontSize: 12,
    fontWeight: '300',
    color: '#242424',
    lineHeight: 21
  },
})