import {StatementType} from '../constants'

interface Statement {
  id: number
  sum: number
  createAt: Date
  tags: Tag[]
  accountId: number
  accountName: string
  comment: string
}

interface DepositStatement extends Statement {
  type: StatementType.deposit
}

interface NormalStatement extends Statement {
  type: StatementType.normal
  direction: 'in' | 'out'
  depositAccountId?: number
}

interface PreStatement extends Statement {
  type: StatementType.pre
  scheduleDate: Date
  direction: 'in' | 'out'
  depositAccountId?: number
  paid: boolean
}


interface Tag {
  id: number
  name: string
}
