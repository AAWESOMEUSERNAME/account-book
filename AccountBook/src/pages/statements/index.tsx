import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import StatementsHeader from './components/StatementsHeader';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
})

const StatementsPage: React.FC = () => {
  const [year, setYear] = useState(2020)
  const [month, setMonth] = useState(10)

  const handlePressOnBudget = () => {
    console.log('press')
  }

  const data = [
    {id: 0, name: 'name1'},
    {id: 1, name: 'name2'},
    {id: 2, name: 'name3'},
    {id: 3, name: 'name4'},
    {id: 4, name: 'name5'},
  ]

  return <FlatList style={styles.container}
                   data={data}
                   renderItem={({item, index}) => (
                     <View>
                       <Text>
                         {`item:${item},index:${index}`}
                       </Text>
                     </View>
                   )
                   }
                   ListHeaderComponent={<StatementsHeader year={year} month={month}
                                                          onPressBudget={handlePressOnBudget}/>}/>
}

export default StatementsPage
