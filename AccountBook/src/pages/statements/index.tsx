import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import {FlatList, Pressable, StyleSheet, View, ViewToken, Modal} from 'react-native'
import StatementsHeader from './components/StatementsHeader'
import AddStatementButton from './components/AddStatementBottun'
import {statementsService} from '../../utils/container'
import DateCard from './components/DateCard'
import StatementLine from './components/StatementLine'
import {AnyStatement} from '../../types/services'
import {BigText} from '../../components/Text'
import Select from './components/StatementTypesSelector'


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
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 2,
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

  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => fetchPageData(), [page])
  const onViewChange = useCallback((info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
    const {viewableItems} = info
    const first = viewableItems.find(value => value.key.match(/^line-.+/))?.item
    if (first) {
      const createAt = (first as AnyStatement).createAt;
      setMonth(createAt.getMonth() + 1)
      setYear(createAt.getFullYear())
    }
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
    {showSelector && <Select visible={showSelector} onClose={() => setShowSelector(false)}/>}
    <View style={styles.timeline}/>
    <AddStatementButton style={styles.addButton} onPressStatement={() => setShowSelector(true)}
                        onPressTransfer={() => console.log('show transfer')}/>
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
                  return `data-${item.month}-${item.year}`
                }
                return `line-${item.id}`
              }}
              onEndReached={hasMore ? () => {
                setPage(page + 1)
              } : null}
              onViewableItemsChanged={onViewChange}
              onEndReachedThreshold={0}/>
  </>
}

export default StatementsPage
