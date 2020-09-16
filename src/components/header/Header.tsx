import React, { FC, ReactElement } from 'react'
import { StatusBar, StyleSheet, ScrollView, GestureResponderEvent } from 'react-native'
import { StackHeaderProps } from '@react-navigation/stack'

import { HeaderButton } from '@/components/header/HeaderButton'

import { routes } from '@/routes/routes'

export type HeaderPropsType = StackHeaderProps

export const Header: FC<HeaderPropsType> = ({ navigation }): ReactElement => {
  const buttonOnClickFunc = function (e: GestureResponderEvent, routeName: string) {
    navigation.navigate(routeName)
  }

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollWrapper}
      contentContainerStyle={styles.elementsContainer}
    >
      <StatusBar hidden={true} />

      {Object.keys(routes)
        .filter((key) => routes[key].isHeaderButton)
        .map((key) => (
          <HeaderButton key={key} routeDir={key} title={key} onClickHandler={buttonOnClickFunc} />
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollWrapper: {
    width: '100%',
    backgroundColor: '#256E7B',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementsContainer: {
    backgroundColor: 'transparent',
  },
})
