import React from 'react'
import {Image, ImageStyle, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'stretch',
    width: 30,
    height: 25,
  },
  info: {
    resizeMode: 'stretch',
    width: 20,
    height: 20,
  }
})

export const AccountIconDark: React.FC = () => <Image style={styles.icon}
                                                      source={require('../assets/common/account-icon-dark.png')}/>
export const AccountIconLight: React.FC = () => <Image style={styles.icon}
                                                       source={require('../assets/common/account-icon-light.png')}/>
export const DataIconDark: React.FC = () => <Image style={styles.icon}
                                                   source={require('../assets/common/data-icon-dark.png')}/>
export const DataIconLight: React.FC = () => <Image style={styles.icon}
                                                    source={require('../assets/common/data-icon-light.png')}/>
export const StatementIconDark: React.FC = () => <Image style={styles.icon}
                                                        source={require('../assets/common/statement-icon-dark.png')}/>
export const StatementIconLight: React.FC = () => <Image style={styles.icon}
                                                         source={require('../assets/common/statement-icon-light.png')}/>
export const SystemIconDark: React.FC = () => <Image style={styles.icon}
                                                     source={require('../assets/common/system-icon-dark.png')}/>
export const SystemIconLight: React.FC = () => <Image style={styles.icon}
                                                      source={require('../assets/common/system-icon-light.png')}/>

export const Warning: React.FC<{ style?: ImageStyle }> = (props) =>
  <Image style={[styles.info, props.style]} source={require('../assets/common/warning.png')}/>