import React from 'react'
import { MapPanelContainer, mapPanelContainerExpanded, MapPanelItem } from './__styles__'
import { isIOS } from '@reapit/elements'
import { Button, elIsBoldText, Subtitle, useMediaQuery } from '@reapit/elements/v3'
import { AppState, useAppState } from '../../../core/app-state'
import { cx } from 'linaria'
import { TravelMode } from '../travel-mode/travel-mode'

export type GetMapUrlParams = {
  appState: AppState
  isIOS?: boolean
}

export const getMapUrl = ({ appState, isIOS = true }: GetMapUrlParams) => {
  const { currentLat, currentLng, destinationLat, destinationLng } = appState
  const prefix = isIOS ? 'maps' : 'https'

  const url = '://maps.google.com/maps?'
  const from = `saddr=${currentLat},${currentLng}&`
  const to = `daddr=${destinationLat},${destinationLng}`

  return `${prefix}${url}${from}${to}`
}

export type HandleOpenNativeMapParams = {
  appState: AppState
}
export const handleOpenNativeMap = ({ appState }: HandleOpenNativeMapParams) => () => {
  window.open(getMapUrl({ appState, isIOS: isIOS() }))
}

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
}

export type MapPanelProps = {
  routeInformation: RouteInformation | null
}

export const MapPanel: React.FC<MapPanelProps> = ({ routeInformation }: MapPanelProps) => {
  const { appState } = useAppState()
  const { isDesktop, isWideScreen } = useMediaQuery()

  return (
    <MapPanelContainer className={cx(routeInformation && mapPanelContainerExpanded)}>
      {(isDesktop || isWideScreen) && (
        <MapPanelItem>
          <TravelMode />
        </MapPanelItem>
      )}
      <MapPanelItem>
        <Subtitle className={elIsBoldText}>ETA</Subtitle>
        <p>{routeInformation?.duration?.text}</p>
      </MapPanelItem>
      <MapPanelItem>
        <Subtitle className={elIsBoldText}>Distance</Subtitle>
        <p>{routeInformation?.distance?.text}</p>
      </MapPanelItem>
      <MapPanelItem>
        <Button type="button" intent="critical" onClick={handleOpenNativeMap({ appState })}>
          Start Journey
        </Button>
      </MapPanelItem>
    </MapPanelContainer>
  )
}

export default MapPanel
