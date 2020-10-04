import React, { ReactElement, PropsWithChildren, FC, useState, useCallback } from 'react'
import { ScrollView, Text, View, Button, TextInput, StyleSheet } from 'react-native'
import { DateTimeAndDescriptionBox } from '@/components/DateAndDescriptionBox'
import { DateTimeType, DateType } from '@/store/Calendar/types'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { removeDateDescription } from '@/store/Calendar/actionCreators'

type SearchResultScreenPropType = PropsWithChildren<unknown> & {
  route: {
    params: {
      dates: Array<DateType>
    }
  }
}

export const SearchScreen: FC<SearchResultScreenPropType> = (): ReactElement => {
  const datesList = useSelector<GlobalStateType>((state) => state.calendarReducer.dates) as Array<
    DateTimeType
  >
  const dispatch = useDispatch()
  const navigator: NavigationProp<ParamListBase> = useNavigation()
  const [filteredArray, setFilteredArray] = useState<Array<DateTimeType>>(datesList)

  const elements: ReactElement =
    filteredArray.length < 1 ? (
      <Text style={{ textAlign: 'center' }}>Not found...</Text>
    ) : (
      <DateTimeAndDescriptionBox
        arr={filteredArray}
        navigate={navigator.navigate}
        remove={(dateStr: string, hours: number, minutes: number) => {
          dispatch(removeDateDescription(dateStr, hours, minutes))
        }}
      />
    )

  const [searchValue, setSearchValue] = useState('')

  const onFindClick = useCallback(() => {
    setFilteredArray(datesList.filter((item) => item.description.includes(searchValue)))
  }, [searchValue])

  return (
    <ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          defaultValue={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <Button onPress={onFindClick} title="Find" />
      </View>
      {elements}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#eee',
    padding: 15,
  },
  textInputStyle: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'grey',
  },
})
