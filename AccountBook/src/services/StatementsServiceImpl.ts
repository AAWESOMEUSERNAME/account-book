import {StatementsOfMonthDTO, StatementsService} from '../types/services'
import {DepositStatement, NormalStatement, PreStatement, Statement} from '../types/domain'
import {StatementType} from '../constants'


const baseStatement: Statement = {
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

class StatementsServiceImpl implements StatementsService {
  async fetchMonthStatements(year: number, month: number, day?: number, keyword?: string): Promise<StatementsOfMonthDTO> {
    return {
      year: year,
      month: month,
      statements: [
        {
          day: 1,
          statements: [
            preStatement,normalStatement
          ]
        },
        {
          day: 2,
          statements: [
            depositStatement
          ]
        }
      ]
    }
  }
}