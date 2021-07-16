import React, {useState} from 'react'
import {Image, Pressable, StyleSheet, View, ViewProps} from 'react-native'
import {SmallText} from '../../../components/Text'
import {theme} from '../../../config'

const styles = StyleSheet.create({
  top: {
    top: -40
  },
  side: {
    left: -40
  },
  addButton: {
    height: 50,
    width: 50
  },
  subButton: {
    height: 30,
    width: 30,
    backgroundColor: theme.color.assist.light,
    borderRadius: 25,
    borderWidth: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const AddStatementButton: React.FC<ViewProps> = (props) => {

  const [unfold, setUnfold] = useState(false)

  return <View style={props.style}>
    {unfold && <View style={[styles.subButton, styles.side]}><SmallText>流水</SmallText></View>}
    {unfold && <View style={[styles.subButton, styles.top]}><SmallText>转账</SmallText></View>}
    <Pressable onPress={() => setUnfold(!unfold)}>
      <Image style={styles.addButton} source={require('../../../assets/statements/statement-add-button.png')}/>
    </Pressable>
  </View>
}

export default AddStatementButton