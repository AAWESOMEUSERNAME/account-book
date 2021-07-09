import React from 'react'

import CenterView from '../CenterView/index'
import {ScrollView, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 200,
    // height: 200,
    borderColor: 'black',
    borderWidth: 1
  }
})

const ScrollArea: React.FC = (props) => {
  return <CenterView>
    <ScrollView style={styles.container}>
      {props.children}
    </ScrollView>
  </CenterView>
}

export default ScrollArea
