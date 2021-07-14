import React, {ReactElement, useEffect, useState} from 'react';
import moment from 'moment'
import {FlatList, StyleSheet, Text, View} from 'react-native';
import StatementsHeader from './components/StatementsHeader';
import {statementsService} from '../../utils/container'
import DateCard from './components/DateCard'
import StatementLine from './components/StatementLine'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

const StatementsPage: React.FC = () => {
  const [year, setYear] = useState(moment().year()) // 头部展示年
  const [month, setMonth] = useState(moment().month()) // 头部展示月
  const [earliest, setEarliest] = useState(moment())
  const [data, setData] = useState<ReactElement[]>([]);

  useEffect(() => handleEndReached(), [])

  const handleEndReached = () => {
    statementsService.fetchMonthStatements(earliest.year(), earliest.month() + 1).then(statements => {
      console.log('run then')
      if (statements.length > 0) {
        const newData = new Array(...data)
        const first = moment(statements[0].createAt)
        let currentDay = -1
        newData.push(<DateCard key={first.format('yyyy-MM')} year={first.year() !== year ? first.year() : undefined} month={first.month()}/>)
        statements.forEach(statement => {
          if (currentDay !== statement.createAt.getDate()) {
            currentDay = statement.createAt.getDate()
            newData.push(<StatementLine key={statement.id} withDay={true} statement={statement}/>)
          }
          newData.push(<StatementLine key={statement.id} statement={statement}/>)
        })

        setData(data.concat(newData))
        if (data.length < 10) {
          setEarliest(earliest.subtract(1, 'M'))
        }
      }
    }).catch(reason => console.log('error fetch statements', reason))
  }

  const handlePressOnBudget = () => {
    console.log('press')
  }

  return <>
    <StatementsHeader year={year} month={month}
                      onPressBudget={handlePressOnBudget}/>
    <FlatList style={styles.container}
              data={data}
              renderItem={({item}) => item}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0}/>
  </>
}

export default StatementsPage
