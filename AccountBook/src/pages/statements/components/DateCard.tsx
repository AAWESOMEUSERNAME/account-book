import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {NormalText} from '../../../components/Text'
import {theme} from '../../../config'
import {TwoColumnsContainer} from '../layout'

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: theme.color.black,
    borderBottomWidth: 1,
    justifyContent: 'center',
    zIndex: -1,
    backgroundColor: theme.color.white,
  }
})

const DataCard = (props: DateCardProps) => {
  return <View style={[styles.container, props.style]}>
    {props.year && <NormalText>{props.year}年</NormalText>}
    <NormalText>{props.month}月</NormalText>
  </View>
}

export const DateCardLine: React.FC<DateCardProps> = (props) =>
  <TwoColumnsContainer left={<DataCard {...props}/>}/>

export default DataCard

export interface DateCardProps {
  year?: number,
  month: number,
  style?: StyleProp<ViewStyle>
}
