import React, {ReactElement} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {TwoColumnsContainer} from '../layout'
import {Warning} from '../../../components/Images'
import {DepositStatement, NormalStatement, PreStatement} from '../../../types/domain'
import {NormalText, SmallText} from '../../../components/Text'
import {StatementAssert} from '../../../utils/typeUtils'
import {theme} from '../../../config'

const statementStyles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: 235,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    height: 25,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detail: {
    paddingLeft: 10
  },
  tag: {
    width: 80
  },
  line: {
    width: 230,
    borderBottomWidth: 1,
  },
  longLine: {
    width: 250,
    left: -20
  },
  lightLine: {
    borderBottomColor: theme.color.main.light
  },
  dayCard: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 30.5,
    paddingRight: 25
  },
})

const StatementBody: React.FC<(PreStatement | NormalStatement | DepositStatement) & { withDay?: boolean }> = (props) => {
  let lightLine: boolean = false
  let Waring: ReactElement | undefined
  let onPress: () => void = () => console.log('press')
  let onLongPress: () => void = () => console.log('longPress')

  if (StatementAssert.isDeposit(props)) {
    lightLine = true
  }
  if (StatementAssert.isPre(props)) {
    if (!props.paid) {
      Waring = <Warning/>
    }
  }

  return <Pressable onPress={onPress} onLongPress={onLongPress}>
    <View style={statementStyles.container}>
      <View style={statementStyles.title}>
        <NormalText>{props.sum.toFixed(2) + '  '}{Waring}</NormalText>
        <NormalText style={statementStyles.tag}
                    numberOfLines={1}>{props.tags.map(value => value.name).join(',')}</NormalText>
      </View>
      <View
        style={[statementStyles.line, lightLine ? statementStyles.lightLine : {}, props.withDay ? statementStyles.longLine : {}]}/>
      <View style={statementStyles.detail}>
        <NormalText>{props.accountName}</NormalText>
        <SmallText>{props.comment}</SmallText>
      </View>
    </View>
  </Pressable>
}

const StatementLine: React.FC<StatementLineProps> = (props) => {
  const {withDay, statement} = props
  const {createAt} = statement
  let Left: ReactElement | undefined
  const Right: ReactElement = <StatementBody {...statement} withDay={withDay}/>

  if (withDay) {
    Left = <View style={statementStyles.dayCard}>
      <NormalText>{createAt.getDay()}日</NormalText>
    </View>
  }

  return <TwoColumnsContainer
    left={Left}
    right={Right}
  />
}

export interface StatementLineProps {
  withDay?: boolean
  statement: PreStatement | NormalStatement | DepositStatement
}

export default StatementLine
