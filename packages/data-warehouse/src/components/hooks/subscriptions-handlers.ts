import { LoginIdentity, ReapitConnectSession } from '@reapit/connect-session'
import { Dispatch, SetStateAction } from 'react'
import {
  createSubscriptionsService,
  deleteSubscriptionsService,
  getSubscriptionsService,
} from '../../services/subscriptions'
import { MessageState } from '../../context/message-context'
import { SubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export const createSubscription = async (
  loginIdentity: LoginIdentity,
  setMessageState: Dispatch<SetStateAction<MessageState>>,
  setSubscriptions: Dispatch<SetStateAction<SubscriptionModelPagedResult | undefined>>,
) => {
  const { clientId, email } = loginIdentity
  if (!clientId || !email) return setMessageState({ errorMessage: 'The identity associated with this user is invalid' })
  const created = await createSubscriptionsService({
    user: email,
    customerId: clientId,
    type: 'dataWarehouse',
  })

  if (created) {
    const subscriptions = await getSubscriptionsService()
    if (subscriptions) {
      setSubscriptions(subscriptions)
    }
    return setMessageState({ infoMessage: 'Successfully subscribed' })
  }
  return setMessageState({ errorMessage: 'Something went wrong subscribing' })
}

export const deleteSubscription = async (
  currentSubscription: SubscriptionModel,
  setMessageState: Dispatch<SetStateAction<MessageState>>,
  setSubscriptions: Dispatch<SetStateAction<SubscriptionModelPagedResult | undefined>>,
) => {
  const deleted = await deleteSubscriptionsService(currentSubscription.id as string)

  if (deleted) {
    const subscriptions = await getSubscriptionsService()
    if (subscriptions) {
      setSubscriptions(subscriptions)
    }
    return setMessageState({ infoMessage: 'Successfully unsubscribed' })
  }

  return setMessageState({ errorMessage: 'Something went wrong unsubscribing' })
}

export const handleSubscriptionToggle =
  (
    currentSubscription: SubscriptionModel | null,
    loginIdentity: LoginIdentity,
    setMessageState: Dispatch<SetStateAction<MessageState>>,
    setSubscriptions: Dispatch<SetStateAction<SubscriptionModelPagedResult | undefined>>,
  ) =>
  () => {
    const { clientId, email } = loginIdentity

    if (!clientId || !email)
      return setMessageState({ errorMessage: 'The identity associated with this user is invalid' })

    if (currentSubscription && currentSubscription.id) {
      return deleteSubscription(currentSubscription, setMessageState, setSubscriptions)
    }

    return createSubscription(loginIdentity, setMessageState, setSubscriptions)
  }

export const getCurrentSubscription = (subscriptions: SubscriptionModelPagedResult | undefined) => {
  return subscriptions?.data?.length
    ? subscriptions?.data.find((sub) => sub.type === 'dataWarehouse' && !sub.cancelled) ?? null
    : null
}

export const handleGetSubscriptions =
  (
    setSubscriptions: Dispatch<SetStateAction<SubscriptionModelPagedResult | undefined>>,
    setSubscriptionsLoading: Dispatch<SetStateAction<boolean>>,
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    connectSession: ReapitConnectSession | null,
  ) =>
  () => {
    const getSubscriptions = async () => {
      setSubscriptionsLoading(true)
      const subscriptions = await getSubscriptionsService()
      setSubscriptionsLoading(false)
      if (subscriptions) {
        return setSubscriptions(subscriptions)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching subscriptions, please try again' })
    }
    if (connectSession) {
      getSubscriptions()
    }
  }
