import React, { useEffect } from 'react'
import { H3, H5, Section, Content } from '@reapit/elements'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { configurationAppointmentsApiService } from '@/services/configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export type SettingsProps = {}

export const Settings: React.FC<SettingsProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appointmentConfigTypes, setAppointmentConfigTypes] = React.useState([] as ListItemModel[])

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      const serviceResponse = await configurationAppointmentsApiService(connectSession as ReapitConnectSession)
      if (serviceResponse) {
        setAppointmentConfigTypes(serviceResponse)
      }
    }
    if (connectSession) {
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  console.log('Appointment Config Types are: ', appointmentConfigTypes)
  return (
    <>
      <Content>
        <H3 isHeadingSection>Settings</H3>
        <Section>
          <H5>Next steps:</H5>
        </Section>
      </Content>
    </>
  )
}

export default Settings
