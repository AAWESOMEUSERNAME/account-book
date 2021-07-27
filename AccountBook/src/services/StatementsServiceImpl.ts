import {injectable} from 'inversify'
import {AnyStatement, StatementsService} from '../types/services'
import {DepositStatement, NormalStatement, PreStatement, Statement, TagGroup} from '../types/domain'
import {StatementType} from '../constants'


@injectable()
export class StatementsServiceImpl implements StatementsService {
  async fetchStatementTags(): Promise<TagGroup[]>{
    console.log('run fetch tags')
    return []
  }

  async fetchMonthStatements(size: number, page: number, keyword?: string): Promise<AnyStatement[]> {
    console.log('run fetch',size,page,keyword)
    return []
  }
}