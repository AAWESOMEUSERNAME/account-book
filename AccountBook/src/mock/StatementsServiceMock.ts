import {injectable} from 'inversify'
import {AnyStatement, StatementsService} from '../types/services'
import {DepositStatement, NormalStatement, PreStatement, Statement} from '../types/domain'
import {StatementType} from '../constants'
import moment from 'moment'

const baseStatement: Statement = {
  id: 0,
  createAt: new Date(),
  sum: 1000.10,
  tags: [
    {id: 1, name: '标签1'},
    {id: 2, name: '标签2'},
    {id: 3, name: '标签3'},
    {id: 4, name: '标签4'},
  ],
  accountId: 1,
  accountName: 'mock的账户名',
  comment: '虚假的流水备注'
}

const preStatement: PreStatement = {
  ...baseStatement,
  type: StatementType.pre,
  scheduleDate: new Date(),
  direction: 'in',
  depositAccountId: 2,
  paid: false
}
const normalStatement: NormalStatement = {
  ...baseStatement,
  type: StatementType.normal,
  direction: 'out'
}
const depositStatement: DepositStatement = {
  ...baseStatement,
  type: StatementType.deposit
}

const data: AnyStatement[] = [
  {...preStatement} as PreStatement,
  {...normalStatement} as NormalStatement,
  {...normalStatement, direction: 'out'} as NormalStatement,
  {...depositStatement} as DepositStatement,
  {...preStatement, createAt: new Date(2021, 5, 10)} as PreStatement,
  {...normalStatement, createAt: new Date(2021, 5, 8)} as NormalStatement,
  {...normalStatement, createAt: new Date(2021, 5, 8)} as NormalStatement,
  {...normalStatement, createAt: new Date(2021, 5, 8)} as NormalStatement,
  {...depositStatement, createAt: new Date(2021, 4, 10)} as DepositStatement,
  {...depositStatement, createAt: new Date(2021, 4, 10)} as DepositStatement,
  {...normalStatement, createAt: new Date(2021, 4, 6)} as NormalStatement,
  {...normalStatement, createAt: new Date(2021, 3, 6)} as NormalStatement
].map((value, index) => {
  value.id = index
  return value
})

@injectable()
export class StatementsServiceMock implements StatementsService {
  async fetchMonthStatements(size: number, page: number, keyword?: string): Promise<AnyStatement[]> {
    console.log('size',size)
    console.log('page',page)
    const start = size * (page - 1)
    if (!data[start]) {
      return []
    }
    return data.slice(start, start + size > data.length - 1 ? undefined : start + size)
  }
}