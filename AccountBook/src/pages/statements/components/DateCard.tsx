import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {NormalText} from '../../../components/Text'
import {theme} from '../../../config'

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: theme.color.black,
    borderBottomWidth: 1,
    justifyContent: 'center'
  }
})

export default (props: DateCardProps) => {
  return <View style={[styles.container, props.style]}>
    {props.year && <NormalText>{props.year}年</NormalText>}
    <NormalText>{props.month}月</NormalText>
  </View>
}

export interface DateCardProps {
  year?: number,
  month: number,
  style?: StyleProp<ViewStyle>
}
