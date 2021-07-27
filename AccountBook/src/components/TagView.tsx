import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Tag} from '../types/domain'
import {SmallText} from './Text'

const {container} = StyleSheet.create({
  container: {
    height: 23,
    width:38,
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 2,
    marginRight: 2
  }
})

export interface TagViewProps {
  tag: Tag
  onPress?: (tag: Tag) => void
}

export default (props: TagViewProps) => {
  const {tag} = props
  return <Pressable style={container} onPress={() => props.onPress && props.onPress(tag)}>
    <SmallText>{tag.name}</SmallText>
  </Pressable>
}