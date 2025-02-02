import { DeveloperModel, MemberModel, MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { logger, useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'
import { useSnack } from '@reapit/elements'
import Routes from '../constants/routes'
import { History } from 'history'
import { useHistory } from 'react-router'

export const PERMISSION_ERROR =
  'The identity attached to this request does not have the required group membership interact with this endpoint'

export interface GlobalDataState {
  currentMember: MemberModel | null
  currentDeveloper: DeveloperModel | null
}

export interface GlobalRefreshState {
  members: [boolean, Dispatch<SetStateAction<boolean>>]
}

export interface GlobalStateHook {
  globalDataState: GlobalDataState
  globalRefreshState: GlobalRefreshState
  globalRefreshCurrentMember: () => void
  globalRefreshCurrentDeveloper: () => void
}

export const handlePermissionError = (snack: (message: string) => void, history: History) => (error: string) => {
  if (error.includes(PERMISSION_ERROR)) {
    return history.push(Routes.CUSTOMER_REGISTER)
  }

  logger(new Error(error))
  snack(error)
}

export const GlobalStateContext = createContext<GlobalStateHook>({} as GlobalStateHook)

const { Provider } = GlobalStateContext

export const GlobalProvider: FC = ({ children }) => {
  const membersRefresh = useState<boolean>(false)
  const history = useHistory()
  const { error } = useSnack()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email

  const [members, , , refreshMembers] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    queryParams: { email: encodeURIComponent(email ?? ''), pageSize: 1 },
    uriParams: { developerId },
    fetchWhenTrue: [email, developerId],
    onError: handlePermissionError(error, history),
  })

  const [currentDeveloper, , , refreshCurrentDeveloper] = useReapitGet<DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
    onError: handlePermissionError(error, history),
  })

  const globalDataState: GlobalDataState = {
    currentMember: members?.data && members.data[0] ? members.data[0] : null,
    currentDeveloper,
  }

  const globalRefreshState: GlobalRefreshState = {
    members: membersRefresh,
  }

  return (
    <Provider
      value={{
        globalRefreshCurrentMember: refreshMembers,
        globalRefreshCurrentDeveloper: refreshCurrentDeveloper,
        globalDataState,
        globalRefreshState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useGlobalState = (): GlobalStateHook => {
  return useContext(GlobalStateContext)
}
