import {DepositStatement, NormalStatement, PreStatement} from '../types/domain'
import {StatementType} from '../constants'
import {AnyStatement} from '../types/services'

export const StatementAssert = {
  isPre: (statement: DepositStatement | NormalStatement | PreStatement): statement is PreStatement =>
    statement.type === StatementType.pre,
  isNormal: (statement: DepositStatement | NormalStatement | PreStatement): statement is NormalStatement =>
    statement.type === StatementType.normal,
  isDeposit: (statement: DepositStatement | NormalStatement | PreStatement): statement is DepositStatement =>
    statement.type === StatementType.deposit,
  isStatement: (o: any): o is AnyStatement => o.type in [StatementType.deposit, StatementType.normal, StatementType.pre]
}
