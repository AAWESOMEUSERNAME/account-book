import CenterView from '../views/CenterView'
import Page from '../../../src/pages/statements/index'
import React from 'react'
import {storiesOf} from '@storybook/react-native'

storiesOf('Pages/statements', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <Page/>
  ))
