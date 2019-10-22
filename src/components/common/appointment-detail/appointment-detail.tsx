import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { oc } from 'ts-optchain'
import { TiTimes, TiTick, TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { Dispatch } from 'redux'
import {
  Modal,
  Loader,
  getTime,
  getDate,
  isSameDay,
  H4,
  IconList,
  AcLink,
  EntityType,
  LoginMode,
  SubTitleH6
} from '@reapit/elements'
import { AppointmentModel, CommunicationModel, AttendeeModel, AddressModel } from '@/types/appointments'
import { ReduxState } from '@/types/core'
import { appointmentDetailHideModal } from '@/actions/appointment-detail'
import { FaStreetView, FaStickyNote, FaMale, FaClock, FaDirections, FaHandshake } from 'react-icons/fa'
import { ListItemModel } from '../../../types/configuration'
import styles from '@/styles/ui/appoinments-detail.scss?mod'

const { appointmentDetailTextContainer } = styles

export type AppointmentModalProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  afterClose: () => void
}

export const renderCommunicationType = (communicationLabel: string | undefined) => {
  switch (communicationLabel) {
    case 'E-Mail':
      return <TiMail className="icon-list-icon" />
    case 'Home':
      return <TiHome className="icon-list-icon" />
    case 'Mobile':
      return <TiDevicePhone className="icon-list-icon" />
    case 'Work':
      return <TiPhoneOutline className="icon-list-icon" />
    default:
      return null
  }
}

export const renderHrefLink = (communicationLabel: string | undefined) => {
  switch (communicationLabel) {
    case 'E-Mail':
      return 'mailto:'
    default:
      return 'tel:'
  }
}

export const renderCommunicationDetail = (communicationDetails: CommunicationModel[] | undefined) => {
  if (!communicationDetails) {
    return null
  }
  return (
    <IconList
      items={communicationDetails.map((communicationDetail: CommunicationModel) => {
        return {
          icon: renderCommunicationType(communicationDetail.label),
          text: (
            <a href={`${renderHrefLink(communicationDetail.label)}${communicationDetail.detail}`}>
              {communicationDetail.detail}
            </a>
          )
        }
      })}
    />
  )
}

export const renderCheckMark = (isConfirmed: boolean | undefined) => {
  if (!isConfirmed) {
    return <TiTimes />
  }
  return <TiTick />
}

// export const renderAttendees = (appointment: AppointmentModel, loginMode: LoginMode) => {
//   const attendees = appointment.attendees
//   const address = oc(appointment).property.address()
//   const propertyId = oc(appointment).property.id()

//   if (!attendees) {
//     return null
//   }
//   return attendees.map((attendee: AttendeeModel) => {
//     return (
//       <Tile
//         hightlight={false}
//         heading={oc(attendee).name('No Attendee Name')}
//         key={appointment.id}
//         icon={<FaMale className="media-icon" />}
//       >
//         {renderAddress(loginMode, address, propertyId)}
//         <div className="my-5">{renderCommunicationDetail(attendee.communicationDetails)}</div>
//       </Tile>
//     )
//   })
// }

// export const renderAddress = (
//   loginMode: LoginMode,
//   address: AddressModel | undefined,
//   propertyId: string | undefined
// ) => {
//   if (!address) {
//     return null
//   }
//   return (
//     <AcLink
//       dynamicLinkParams={{
//         appMode: loginMode,
//         entityType: EntityType.PROPERTY,
//         entityCode: propertyId
//       }}
//     >
//       <div>
//         {address.buildingName} {address.buildingNumber} {address.line1} {address.line2} {address.line3} {address.line4}{' '}
//         {address.postcode} {address.country}
//       </div>
//     </AcLink>
//   )
// }

export const renderDateTime = (address: AddressModel | undefined, appointment: AppointmentModel) => {
  if (!address) {
    return null
  }
  return (
    <div className={appointmentDetailTextContainer}>
      <H4>Time</H4>
      <SubTitleH6>{renderStartAndEndDate(appointment.start || '', appointment.end || '')}</SubTitleH6>
    </div>
  )
}

// export const renderNotes = (description: string | undefined) => {
//   if (!description) {
//     return null
//   }
//   return (
//     <Tile hightlight={false} heading="Notes" icon={<FaStickyNote className="media-icon" />}>
//       {description}
//     </Tile>
//   )
// }

// export const renderArrangements = (description: string | undefined) => {
//   if (!description) {
//     return null
//   }
//   return (
//     <Tile hightlight={false} heading="Arrangements" icon={<FaHandshake className="media-icon" />}>
//       {description}
//     </Tile>
//   )
// }

// export const renderDirections = (direction: string | undefined) => {
//   if (!direction) {
//     return null
//   }
//   return (
//     <Tile hightlight={false} heading="Directions" icon={<FaDirections className="media-icon" />}>
//       {direction}
//     </Tile>
//   )
// }

// export const renderViewingType = (type: string | undefined) => {
//   if (!type) {
//     return null
//   }
//   return (
//     <Tile hightlight={false} heading="Appointment Type" icon={<FaStreetView className="media-icon" />}>
//       {type}
//     </Tile>
//   )
// }

export const renderStartAndEndDate = (startTime: string, endTime: string) => {
  const startDate = dayjs(startTime)
  const isToday = isSameDay(startDate)
  const displayDate = isToday ? 'Today' : getDate(startDate)
  const displayStart = getTime(startDate, false)
  const displayEnd = getTime(endTime, false)
  return `${displayDate} ${displayStart} - ${displayEnd}`
}

export const AppointmentModal: React.FC<AppointmentModalProps & AppointmentDetailMappedProps> = ({
  appointment,
  visible,
  afterClose,
  isLoading,
  appointmentTypes,
  loginMode
}) => {
  const address = oc(appointment).property.address()
  const typeId = oc(appointment).typeId()
  const basicAddress = address ? `${address.buildingName} ${address.buildingNumber} ${address.line1}` : ''
  const type =
    typeId && appointmentTypes ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null
  return (
    <Modal visible={visible} title={`${basicAddress}, Ref: ${appointment.id}`} afterClose={afterClose}>
      {isLoading ? (
        <Loader />
      ) : (
          <>
            {renderDateTime(oc(appointment).property.address(), appointment)}
            {/* {renderViewingType(oc(type).value())}
            {renderAttendees(appointment, loginMode)}
            {renderNotes(appointment.description)}
            {renderArrangements(oc(appointment).property.arrangements())}
            {renderDirections(appointment.directions)} */}
          </>
        )}
    </Modal>
  )
}

export type AppointmentDetailMappedProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  appointmentTypes: ListItemModel[] | null
  loginMode: LoginMode
}

export const filterLoggedInUser = (attendees: AttendeeModel[] | undefined, userCode: string): AttendeeModel[] => {
  if (!attendees) {
    return []
  }
  return attendees.filter((attendee: AttendeeModel) => {
    if (!attendee) {
      return true
    }
    return attendee.id !== userCode
  })
}

// Get attendees types: negotiator, office
export const getAdditionalAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = oc(attendee).type('')
    return ['negotiator', 'office'].includes(attendeeType)
  })
}

// Get attendees types: landlord, contact, applicant, tenant
export const getApplicantAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = oc(attendee).type('')
    return ['landlord', 'contact', 'applicant', 'tenant'].includes(attendeeType)
  })
}

export const mapStateToProps = (state: ReduxState): AppointmentDetailMappedProps => {
  const appointment = oc(state).appointmentDetail.appointmentDetail({})
  const userCode = oc(state).auth.loginSession.loginIdentity.userCode('')
  const newAppointment = {
    ...appointment,
    attendees: filterLoggedInUser(appointment.attendees, userCode)
  }
  return {
    appointment: newAppointment,
    visible: state.appointmentDetail.isModalVisible,
    isLoading: state.appointmentDetail.loading,
    appointmentTypes: state.appointments.appointmentTypes,
    loginMode: oc(state).auth.refreshSession.mode('WEB')
  }
}

export type AppointmentDetailMappedAction = {
  afterClose: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AppointmentDetailMappedAction => ({
  afterClose: () => dispatch(appointmentDetailHideModal())
})

const AppointmentDetailWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentModal)

AppointmentDetailWithRedux.displayName = 'AppointmentDetailWithRedux'

export default React.memo(AppointmentDetailWithRedux)
