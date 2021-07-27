import React, {ReactElement} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {NormalText} from '../Text'
import {theme} from '../../config'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.color.white,
    height: 600,
    width: 350
  },
  left: {
    flex: 1
  },
  right: {
    flex: 3.75
  },
  item: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1
  }
})

const withSideBar = (left: ReactElement, right: ReactElement) => {
  return <View style={styles.container}>
    <View style={styles.left}>{left}</View>
    <View style={styles.right}>{right}</View>
  </View>
}

export default withSideBar

export interface GroupItemProps {
  id: number
  value: string
  active?: boolean
  onPress?: () => void
}

export const GroupItem: React.FC<GroupItemProps> = (props )=>{
  return <Pressable style={styles.item} onPress={props.onPress}>
    <NormalText>{props.value}</NormalText>
  </Pressable>
}
