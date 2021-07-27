import React, {useState} from 'react'
import {Image, Pressable, StyleSheet, View, ViewProps} from 'react-native'
import {SmallText} from '../../../components/Text'
import {theme} from '../../../config'

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 90
  },
  top: {
    left: 40,
    top: 0
  },
  side: {
    top: 40,
    left: 0
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  img: {
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

export interface AddStatementButtonProps {
  onPressStatement: () => void
  onPressTransfer: () => void
}

const AddStatementButton: React.FC<ViewProps & AddStatementButtonProps> = (props) => {

  const [unfold, setUnfold] = useState(false)

  return <View style={[styles.container, props.style]}>
    {unfold && <View style={[styles.subButton, styles.side]}>
      <Pressable onPress={props.onPressStatement}>
        <SmallText>流水</SmallText>
      </Pressable>
    </View>}
    {unfold && <View style={[styles.subButton, styles.top]}>
      <Pressable onPress={props.onPressTransfer}>
        <SmallText>转账</SmallText>
      </Pressable>
    </View>}
    <Pressable style={styles.addButton} onPress={() => setUnfold(!unfold)}>
      <Image style={styles.img} source={require('../../../assets/statements/statement-add-button.png')}/>
    </Pressable>
  </View>
}

export default AddStatementButton