import {Container} from 'inversify'
import {INJECT_TYPES} from '../constants'
import {StatementsService} from '../types/services'
import {StatementsServiceImpl} from '../services/StatementsServiceImpl'
import {global_config} from '../config'
import {StatementsServiceMock} from '../mock/StatementsServiceMock'


const container = new Container({
  defaultScope: 'Singleton',
  // autoBindInjectable: true
})

container.bind<StatementsService>(INJECT_TYPES.StatementsService).to(global_config.enableMock ? StatementsServiceMock : StatementsServiceImpl)

export default container

export const statementsService = container.get<StatementsService>(INJECT_TYPES.StatementsService)
