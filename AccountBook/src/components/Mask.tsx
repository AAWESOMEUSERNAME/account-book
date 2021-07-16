import React from 'react'
import {StyleSheet, View} from 'react-native'
import {theme} from '../config'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    backgroundColor: theme.color.black
  },
  content: {
    position: 'absolute',
    margin: 0
  }
})

const Mask: React.FC = (props) => {
  return <View style={styles.container}>
    <View style={styles.mask}/>
    {props.children}
  </View>
}

export default Mask