import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import DateCard from './DateCard'
import {BigText, SmallText} from '../../../components/Text'
import {TwoColumnsContainer} from '../layout'

const styles = StyleSheet.create({
  right: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
  }
})

const Right: React.FC<{ onPressBudget: () => void, budget?: [number, number] }> = ({budget, onPressBudget}) => {
  return <Pressable onPress={onPressBudget}>
    <View style={styles.right}>
      {budget && <SmallText>预算剩余/储蓄缺口</SmallText>}
      {budget && <BigText>{budget[0].toFixed(2)}/{budget[1].toFixed(2)}</BigText>}
      {!budget && <BigText>点击初始化本月预算</BigText>}
    </View>
  </Pressable>
}

const Header: React.FC<StatementsHeaderProps> = ({year, month, budget, onPressBudget}) => {
  return <TwoColumnsContainer left={<DateCard year={year} month={month}/>}
                              right={<Right onPressBudget={onPressBudget} budget={budget}/>}/>
}

export default Header

export interface StatementsHeaderProps {
  year: number
  month: number
  budget?: [number, number]
  onPressBudget: () => void
}

