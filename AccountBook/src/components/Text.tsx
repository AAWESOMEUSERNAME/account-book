import React from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {theme} from '../config'

const fontSize = StyleSheet.create({
  big: {
    fontSize: theme.font.size.big,
    lineHeight: theme.font.lineHeight.big
  },
  normal: {
    fontSize: theme.font.size.normal,
    lineHeight: theme.font.lineHeight.normal
  },
  small: {
    fontSize: theme.font.size.small,
    lineHeight: theme.font.lineHeight.small
  }
})

const fontFamily = StyleSheet.create({
  default: {
    fontFamily: theme.font.family
  }
})


export const BigText: React.FC<TextProps> = (props) =>
  <Text {...props} style={[fontSize.big, fontFamily.default, props.style]}>{props.children}</Text>
export const NormalText: React.FC<TextProps> = (props) =>
  <Text {...props} style={[fontSize.normal, fontFamily.default, props.style]}>{props.children}</Text>
export const SmallText: React.FC<TextProps> = (props) =>
  <Text {...props} style={[fontSize.small, fontFamily.default, props.style]}>{props.children}</Text>

