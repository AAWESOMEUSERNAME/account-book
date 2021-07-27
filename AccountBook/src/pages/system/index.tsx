import React from 'react';
import {Alert, Pressable, StyleSheet} from 'react-native';
import {NormalText} from '../../components/Text'
import {theme} from '../../config'
import {TagManagementModal} from '../../components/CustomModal'
import {toggleTagManagement, useAppDispatch} from '../../store'

const styles = StyleSheet.create({
  item: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  odd: {
    backgroundColor: theme.color.main.light
  },
})

const SystemPage: React.FC = () => {
  const dispatch = useAppDispatch()

  return <>
    <Pressable style={[styles.item, styles.odd]}
               onPress={() => dispatch(toggleTagManagement())}><NormalText>流水标签</NormalText></Pressable>
    <Pressable style={styles.item} onPress={() => Alert.alert('辅助平账')}><NormalText>辅助平账</NormalText></Pressable>
    <Pressable style={[styles.item, styles.odd]}
               onPress={() => Alert.alert('预算模板')}><NormalText>预算模板</NormalText></Pressable>
    <Pressable style={styles.item} onPress={() => Alert.alert('数据库导入')}><NormalText>数据库导入</NormalText></Pressable>
    <Pressable style={[styles.item, styles.odd]}
               onPress={() => Alert.alert('数据库导出')}><NormalText>数据库导出</NormalText></Pressable>
    <TagManagementModal/>
  </>
}

export default SystemPage
