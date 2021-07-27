import React from 'react'
import {Modal, Pressable, StyleSheet, View} from 'react-native'
import {tagManagementVisibleSelector, useAppDispatch, useAppSelector, toggleTagManagement} from '../store'
import {BigText} from './Text'
import TagsManagePage from './TagsManagePage'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export interface ModalProps {
  visible: boolean
  onClose: () => void
  onRequestClose?: () => void
}

const CustomModal: React.FC<ModalProps> = (props) => {
  return <Modal
    animationType="fade"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onRequestClose}
  >
    <Pressable style={styles.bg} onPress={() => props.onClose()}>
      {props.children}
    </Pressable>
  </Modal>
}

export default CustomModal


export const TagManagementModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const visible = useAppSelector(tagManagementVisibleSelector)
  return <CustomModal visible={visible} onClose={() => dispatch(toggleTagManagement())}>
    <TagsManagePage/>
  </CustomModal>
}
