import React, {useCallback, useEffect, useState} from 'react'
import withSideBar, {GroupItem} from './layout/WithSideBar'
import {statementsService} from '../utils/container'
import {Tag, TagGroup} from '../types/domain'
import {Button, StyleSheet, View} from 'react-native'
import TagView from './TagView'

const styles = StyleSheet.create({
  addTag: {
    width: 100,
    margin: 10
  },
  groups: {
    borderRightWidth: 1,
    height: '100%'
  },
  tagsContainer: {
    margin: 10
  }
})

const AddTagButton: React.FC = () => {
  return <View style={styles.addTag}>
    <Button title={'+添加标签'} onPress={() => console.log('add tag')}/>
  </View>
}

const TagPage: React.FC<{ data: Tag[] }> = (props) => {
  return <View>
    <AddTagButton/>
    <View style={styles.tagsContainer}>
      {props.data.map((value) => <TagView tag={value} onPress={(tag) => console.log('click tag', tag)}/>)}
    </View>
  </View>
}

export default () => {
  const [data, setData] = useState<TagGroup[]>([])
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    updateData()
  }, [])

  const updateData = useCallback(() => {
    statementsService.fetchStatementTags().then(groups => {
      setData(groups)
      groups.length > 0 && setCurrent(0)
    })
  }, [setData])

  const left = <View style={styles.groups}>
    {data.map((group, index) =>
      <GroupItem id={group.id} value={group.name} onPress={() => setCurrent(index)}/>)}
  </View>

  const right = <TagPage data={data.length > 0 ? data[current].tags : []}/>

  console.log('data', data)
  return withSideBar(left, right)
}
