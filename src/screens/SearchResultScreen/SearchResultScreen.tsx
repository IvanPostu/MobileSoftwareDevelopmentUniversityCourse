import React, { ReactElement, PropsWithChildren, FC } from 'react'
import { ScrollView, Text } from 'react-native'
import { DateAndDescriptionBox } from '@/components/DateAndDescriptionBox'
import { DateType } from '@/store/Calendar/types'

type SearchResultScreenPropType = PropsWithChildren<unknown> & {
  route: {
    params: {
      dates: Array<DateType>
    }
  }
}

export const SearchResultScreen: FC<SearchResultScreenPropType> = (props): ReactElement => {
  const arrayIsNotEmpty: boolean = props.route.params.dates && props.route.params.dates.length > 0

  const element = arrayIsNotEmpty ? (
    props.route.params.dates.map((item, index) => <DateAndDescriptionBox {...item} key={index} />)
  ) : (
    <Text>Not found...</Text>
  )

  return <ScrollView>{element}</ScrollView>
}
