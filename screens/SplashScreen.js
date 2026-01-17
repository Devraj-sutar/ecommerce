import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('home') 
    }, 3000) 

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.maincontainer}>
        <Image source={require('../images/images.jpg')} style={{ width: 76, height: 70 }} />
      <Text style={styles.logo}>Mini</Text>
      <Text style={styles.logo}>E-Commers</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  maincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
  },
  logo: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
})
