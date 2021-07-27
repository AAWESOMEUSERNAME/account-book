import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {NormalText} from '../../../components/Text'
import CustomModal from '../../../components/CustomModal'

const style = StyleSheet.create({
  type: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    borderWidth: 1,
    backgroundColor: 'white'
  }
})

export interface SelectorProps {
  visible: boolean
  onClose: () => void
}

const Select: React.FC<SelectorProps> = (props) => {
  return <CustomModal visible={props.visible} onClose={props.onClose}>
    <Pressable style={style.type} onPress={() => console.log('打开普通流水')}><NormalText>普通流水</NormalText></Pressable>
    <Pressable style={style.type} onPress={() => console.log('打开分期流水')}><NormalText>分期流水</NormalText></Pressable>
    <Pressable style={style.type} onPress={() => console.log('打开储蓄流水')}><NormalText>储蓄流水</NormalText></Pressable>
  </CustomModal>
}

export default Select
