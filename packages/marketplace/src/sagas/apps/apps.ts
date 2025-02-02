import { put, fork, takeLatest, call, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements-legacy'
import {
  fetchAppsSuccess,
  fetchAppsFailed,
  fetchAppDetailSuccess,
  fetchAppDetailFailed,
  fetchAppsInfiniteSuccess,
  fetchFeatureAppsSuccess,
  fetchFeatureAppsFailed,
} from '@/actions/apps'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { fetchAppByIdApi, FetchAppByIdParams, fetchAppsApi, FetchAppsParams } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { fetchApiKeyInstallationById } from '@/services/installations'
import { fetchDeveloperAppsSuccess } from '../../actions/apps/apps'
import { filterAdminRestrictedApps, filterClientHiddenApps, filterOrgAdminRestrictedApps } from '../../utils/browse-app'

export const fetchApps = function* ({ data }) {
  try {
    const { isInfinite, developerId } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const clientId = yield call(selectClientId, connectSession)

    const response = yield call(fetchAppsApi, {
      clientId,
      developerId,
      ...data,
    })

    const filteredOfOrgAdminApps = filterOrgAdminRestrictedApps(response, connectSession)
    const filteredOfAdminApps = filterAdminRestrictedApps(filteredOfOrgAdminApps, connectSession)
    const filteredOfClientHiddenApps = filterClientHiddenApps(filteredOfAdminApps, connectSession)

    if (isInfinite) {
      yield put(fetchAppsInfiniteSuccess(filteredOfClientHiddenApps))
      return
    }

    yield put(fetchAppsSuccess(filteredOfClientHiddenApps))
  } catch (err: any) {
    yield put(fetchAppsFailed(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const fetchDeveloperApps = function* ({ data }) {
  try {
    const { developerId } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const clientId = yield call(selectClientId, connectSession)
    const defaultParams = {
      clientId,
      developerId,
      ...data,
    }
    const response = yield call(fetchAppsApi, defaultParams)

    yield put(fetchDeveloperAppsSuccess(response))
  } catch (err: any) {
    yield put(fetchAppsFailed(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const fetchFeatureApps = function* ({ data }) {
  try {
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const clientId = yield call(selectClientId, connectSession)

    const response = yield call(fetchAppsApi, {
      clientId,
      isFeatured: true,
      ...data,
    })

    yield put(fetchFeatureAppsSuccess(response))
  } catch (err: any) {
    yield put(fetchFeatureAppsFailed(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const fetchAppDetailSagas = function* ({ data }: Action<FetchAppByIdParams>) {
  try {
    const appDetailResponse = yield call(fetchAppByIdApi, { ...data })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(fetchAppDetailSuccess(appDetailResponse))
  } catch (err: any) {
    yield put(fetchAppDetailFailed(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const appSagasListen = function* () {
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.FETCH_APP_DETAIL, fetchAppDetailSagas)
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_FEATURE_APPS, fetchFeatureApps)
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_APPS, fetchApps)
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_DEVELOPER_APPS, fetchDeveloperApps)
}

export const appsSagas = function* () {
  yield all([fork(appSagasListen)])
}
