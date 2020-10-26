import React, { FC, ReactElement, useEffect, useCallback, useState, useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

type SpinnerPropType = {
  backgroundColor: string
  percent: number
}

const MAX_DIVISIONS = 8

const divisionsArrayGenerator = (points: number): Array<number> => {
  const divisions = new Array<number>()
  for (let i = 0; i < MAX_DIVISIONS; i++) {
    divisions[i] = i <= points - 1 ? 1 : 0
  }

  return divisions
}

export const Spinner: FC<SpinnerPropType> = (props: SpinnerPropType): ReactElement => {
  const percent = props.percent >= 100 ? 100 : props.percent
  const points = Math.floor(percent / (100.0 / MAX_DIVISIONS)) || 1

  const [offset, setOffset] = useState(0)
  const divisions = divisionsArrayGenerator(points)
  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((offs) => (offs + 1 >= MAX_DIVISIONS ? 0 : offs + 1))
    }, 120)

    return () => {
      clearInterval(timer)
    }
  }, [])

  let newArr = divisions

  if (offset > 0) {
    const newArr1 = divisions.slice(0, offset)
    const newArr2 = divisions.slice(offset, divisions.length)
    newArr = [...newArr2, ...newArr1]
  }

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
      <Svg height="58" width="58" viewBox="0 0 58 58">
        <G fill="none" fillRule="evenodd">
          <G transform="translate(2 1)" stroke={props.backgroundColor} stroke-width="1.5">
            <Circle
              cx="42.601"
              cy="11.462"
              r="5"
              fillOpacity={String(newArr[0])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="49.063"
              cy="27.063"
              r="5"
              fillOpacity={String(newArr[1])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="42.601"
              cy="42.663"
              r="5"
              fillOpacity={String(newArr[2])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="27"
              cy="49.125"
              r="5"
              fillOpacity={String(newArr[3])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="11.399"
              cy="42.663"
              r="5"
              fillOpacity={String(newArr[4])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="4.938"
              cy="27.063"
              r="5"
              fillOpacity={String(newArr[5])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="11.399"
              cy="11.462"
              r="5"
              fillOpacity={String(newArr[6])}
              fill={props.backgroundColor}
            ></Circle>
            <Circle
              cx="27"
              cy="5"
              r="5"
              fillOpacity={String(newArr[7])}
              fill={props.backgroundColor}
            ></Circle>
          </G>
        </G>
      </Svg>
      <Text style={styles.textPercents}>{percent}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  textPercents: {
    fontSize: 18,
  },
})
