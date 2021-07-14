import {StyleSheet, View, ViewProps} from 'react-native'
import React, {ReactElement} from 'react'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    width: 100,
    borderRightWidth: 1
  },
  right: {
    flex: 1,
  }
})

export const TwoColumnsContainer: React.FC<TwoColumnsContainerProps & ViewProps> = (props) => {
  return <View style={[styles.container,props.style]}>
    <View style={styles.left}>{props.left}</View>
    <View style={styles.right}>{props.right}</View>
  </View>
}

export interface TwoColumnsContainerProps {
  left?: ReactElement,
  right?: ReactElement,
}
