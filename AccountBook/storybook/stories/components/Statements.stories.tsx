import {storiesOf} from '@storybook/react-native'
import CenterView from '../views/CenterView/index'
import React from 'react'
import StatementsHeader from '../../../src/pages/statements/components/StatementsHeader'
import DateCard from '../../../src/pages/statements/components/DateCard'
import {Pressable, TouchableWithoutFeedback, View} from 'react-native'
import StatementLine from '../../../src/pages/statements/components/StatementLine'
import {DepositStatement, NormalStatement, Statement} from '../../../src/types/domain'
import {boolean, select} from '@storybook/addon-knobs'
import {StatementType} from '../../../src/constants'

storiesOf('Components/DateCard', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <DateCard year={2020} month={12}/>
  ))

storiesOf('Components/StatementsHeader', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <StatementsHeader year={2020} month={12} onPressBudget={() => console.log('choose budget')}/>
  ))
  .add('withBudget', () => (
    <StatementsHeader year={2020} month={12} budget={[2000.00, 100.00]}
                      onPressBudget={() => console.log('choose budget')}/>
  ))

const baseStatement: Statement = {
  createAt: new Date(),
  sum: 1000.10,
  tags: [
    {id: 1, name: '标签1'},
    {id: 2, name: '标签2'},
    {id: 3, name: '标签3'},
    {id: 4, name: '标签4'},
  ],
  accountId: 1,
  accountName: 'mock的账户名',
  comment: '虚假的流水备注'
}

const direction = select('direction', {in: 'in', out: 'out'}, 'in')

const preStatement = {
  ...baseStatement,
  type: StatementType.pre,
  scheduleDate: new Date(),
  direction: direction,
  depositAccountId: 2
}
const normalStatement: NormalStatement = {
  ...baseStatement,
  type: StatementType.normal,
  direction: direction
}
const depositStatement: DepositStatement = {
  ...baseStatement,
  type: StatementType.deposit
}
storiesOf('Components/StatementLine', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('preStatement', () => (
    <StatementLine withDay={boolean('withDay', false)} statement={{...preStatement, paid: boolean('paid', false)}}/>))
  .add('normalStatement', () => (<StatementLine withDay={boolean('withDay', false)} statement={normalStatement}/>))
  .add('depositStatement', () => (<StatementLine withDay={boolean('withDay', false)} statement={depositStatement}/>))


storiesOf('Components/Press', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Pressable', () =>
    (<Pressable onPress={() => console.log('press')} onLongPress={() => console.log('long press')}>
      <View style={{width: 100, height: 100, borderWidth: 1, backgroundColor: 'green'}}/>
    </Pressable>))
  .add('TouchableWithoutFeedback', () =>
    (<TouchableWithoutFeedback onPress={() => console.log('press')} onLongPress={() => console.log('long press')}>
      <View style={{width: 100, height: 100, borderWidth: 1, backgroundColor: 'red'}}/>
    </TouchableWithoutFeedback>))
