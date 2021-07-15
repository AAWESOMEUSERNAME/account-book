import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import moment from 'moment'
import {FlatList, StyleSheet, Text, View, ViewToken} from 'react-native';
import StatementsHeader from './components/StatementsHeader';
import {statementsService} from '../../utils/container'
import DateCard, {DateCardLine} from './components/DateCard'
import StatementLine from './components/StatementLine'
import {AnyStatement} from '../../types/services'
import {StatementAssert} from '../../utils/typeUtils'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  timeline: {
    height: '100%',
    width: 100,
    borderRightWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dataCard: {
    borderTopWidth: 1
  }
})

class DateData {
  year: number
  month: number
  showYear: boolean

  constructor(month: number, year: number, showYear: boolean) {
    this.year = year
    this.month = month
    this.showYear = showYear
  }
}

const StatementsPage: React.FC = () => {
  const [year, setYear] = useState(moment().year()) // 头部展示年
  const [month, setMonth] = useState(moment().month()) // 头部展示月
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 5
  const [data, setData] = useState<((AnyStatement & { withDay?: boolean }) | DateData)[]>([]);

  useEffect(() => fetchPageData(), [page])
  const onViewChange = useCallback((info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
    const {viewableItems} = info
    const firstStatement = viewableItems.filter(value => StatementAssert.isStatement(value.item))
      .map(value => value.item as AnyStatement)[0]
    setMonth(firstStatement.createAt.getMonth() + 1)
    setYear(firstStatement.createAt.getFullYear())
  }, [setYear, setMonth])

  const fetchPageData = () => {
    statementsService.fetchMonthStatements(pageSize, page).then(statements => {
      if (statements.length > 0) {
        let headerYear = year
        let headerMonth = month
        const newData = new Array(...data)
        let lastDate: Date
        if (data.length === 0) {
          lastDate = statements[0].createAt
          setYear(lastDate.getFullYear())
          setMonth(lastDate.getMonth() + 1)
          headerYear = lastDate.getFullYear()
          headerMonth = lastDate.getMonth() + 1
        } else {
          lastDate = (data[data.length - 1] as AnyStatement).createAt
        }

        statements.forEach(statement => {
          const createAt = statement.createAt
          if ((createAt.getFullYear() !== headerYear || createAt.getMonth() + 1 !== headerMonth) &&
            (lastDate.getFullYear() !== createAt.getFullYear() || lastDate.getMonth() !== createAt.getMonth())) {
            newData.push(new DateData(createAt.getMonth() + 1, createAt.getFullYear(),
              createAt.getFullYear() !== lastDate.getFullYear()))
          }
          if (lastDate.getDate() !== createAt.getDate()) {
            newData.push({...statement, withDay: true})
          } else {
            newData.push(statement)
          }
          lastDate = createAt
        })

        setData(newData)
      } else {
        console.log('no more')
        setHasMore(false)
      }
    }).catch(reason => console.log('error fetch statements', reason))
  }

  const handlePressOnBudget = () => {
    console.log('press')
  }

  return <>
    <View style={styles.timeline}/>
    <StatementsHeader year={year} month={month}
                      onPressBudget={handlePressOnBudget}/>
    <FlatList style={styles.container}
              data={data}
              renderItem={({item}) => {
                if (item instanceof DateData) {
                  return <DateCard style={styles.dataCard} month={item.month}
                                   year={item.showYear ? item.year : undefined}/>
                }
                return <StatementLine statement={item} withDay={item.withDay}/>
              }}
              keyExtractor={(item) => {
                if (item instanceof DateData) {
                  return `${item.month}-${item.year}`
                }
                return `line-${item.id}`
              }}
              onEndReached={hasMore ? () => {
                console.log('reached')
                setPage(page + 1)
              } : null}
              onViewableItemsChanged={onViewChange}
              onEndReachedThreshold={0}/>
  </>
}

export default StatementsPage
