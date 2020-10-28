import React, { SetStateAction, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements'
import { disableAccountsService, getAccountsService } from '../../../services/accounts'
import { AccountModel } from '../../../types/accounts'
import { MessageContext, MessageState } from '../../../context/message-context'
import { Dispatch } from 'react'
import { PagedApiResponse } from '../../../types/core'
import AccountUpdateModal from './account-update-modal'

export interface AccountsTableProps {
  accounts: AccountModel[]
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const disableAccount = (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
  value: string,
) => async () => {
  const disabled = await disableAccountsService(value)

  if (!disabled) {
    return setMessageState({
      visible: true,
      variant: 'danger',
      message: 'Something went wrong disabling account, please try again',
    })
  }

  setMessageState({
    visible: true,
    variant: 'info',
    message: 'Account successfully disabled',
  })

  const accounts = await getAccountsService()

  if (accounts) {
    return setAccounts(accounts)
  }

  return setMessageState({
    visible: true,
    variant: 'danger',
    message: 'Something went wrong fetching accounts, please try again',
  })
}

export const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, setAccounts }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedAccountId(null)
  }
  const handleModalOpen = (accountId: string) => () => {
    setModalVisible(true)
    setSelectedAccountId(accountId)
  }

  const DeleteButton: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setMessageState } = useContext(MessageContext)

    return (
      <Button variant="danger" onClick={disableAccount(setMessageState, setAccounts, value)}>
        Delete
      </Button>
    )
  }

  const UpdatePasswordButton: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    return <Button onClick={handleModalOpen(value)}>Update</Button>
  }

  const columns = [
    {
      Header: 'User Name',
      accessor: 'username',
    },
    {
      Header: 'Update Password',
      accessor: 'id',
      id: 'created',
      Cell: UpdatePasswordButton,
    },
    {
      Header: 'Delete Account',
      accessor: 'id',
      Cell: DeleteButton,
    },
  ]

  return (
    <>
      <AccountUpdateModal visible={modalVisible} handleClose={handleModalClose} accountId={selectedAccountId} />
      <Table columns={columns} data={accounts} scrollable />
    </>
  )
}

export default AccountsTable
