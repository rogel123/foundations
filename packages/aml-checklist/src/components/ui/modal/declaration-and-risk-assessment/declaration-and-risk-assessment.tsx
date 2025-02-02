import React from 'react'
import { Input, Button, CameraImageInput, SelectBox, Formik, Form, ButtonGroup } from '@reapit/elements-legacy'
import { connect } from 'react-redux'
import { RISK_ASSESSMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { checklistDetailShowModal, updateDeclarationAndRisk } from '@/actions/checklist-detail'
import { STEPS } from '../modal'
import { Dispatch } from 'redux'
import FormFields from './form-schema/form-fields'
import validationSchema from './form-schema/validation-schema'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'

const { declarationFormField, typeField, reasonField, riskAssessmentFormField } = FormFields

const optionsRiskAssessmentType = [
  { label: 'Please select...', value: '' },
  { label: RISK_ASSESSMENT_TYPE.SIMPLIFIED, value: RISK_ASSESSMENT_TYPE.SIMPLIFIED },
  { label: RISK_ASSESSMENT_TYPE.NORMAL, value: RISK_ASSESSMENT_TYPE.NORMAL },
  { label: RISK_ASSESSMENT_TYPE.ENHANCED, value: RISK_ASSESSMENT_TYPE.ENHANCED },
]

export type DeclarationAndRiskAssessmentProps = StateProps & DispatchProps

export const DeclarationAndRiskAssessment: React.FC<DeclarationAndRiskAssessmentProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit,
  isSubmitting,
}) => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const metadata = {
    declarationRisk: {
      type: contact?.metadata?.declarationRisk?.type || '',
      reason: contact?.metadata?.declarationRisk?.reason || '',
      declarationForm: contact?.metadata?.declarationRisk?.declarationForm || '',
      riskAssessmentForm: contact?.metadata?.declarationRisk?.riskAssessmentForm || '',
    },
  }

  const initialValues = React.useMemo(
    () => ({
      metadata,
    }),
    [contact],
  )

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={onHandleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isValid }) => {
          return (
            <Form>
              <div>
                <div>
                  <label className="label">Declaration Form</label>
                  <CameraImageInput
                    labelText={declarationFormField.label}
                    id={declarationFormField.name}
                    name={declarationFormField.name}
                    allowClear={true}
                    isNarrowWidth
                  />
                  <p className="mb-5">
                    <strong>
                      {connectIsDesktop ? (
                        <a
                          href={`agencycloud://process/webpage?url=${values.metadata?.declarationRisk?.declarationForm}`}
                        >
                          View in browser
                        </a>
                      ) : (
                        <a
                          href={values.metadata?.declarationRisk?.declarationForm}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View in browser
                        </a>
                      )}
                    </strong>
                  </p>
                </div>
                <SelectBox
                  labelText={typeField.label}
                  id={typeField.name}
                  name={typeField.name}
                  options={optionsRiskAssessmentType}
                  required
                />
                <Input
                  type="text"
                  labelText={reasonField.label}
                  id={reasonField.name}
                  name={reasonField.name}
                  required
                />
                <div>
                  <label className="label">Risk Assessment Form</label>
                  <CameraImageInput
                    labelText={riskAssessmentFormField.label}
                    id={riskAssessmentFormField.name}
                    name={riskAssessmentFormField.name}
                    allowClear={true}
                    required
                    accept="image/*"
                  />
                  <p className="mb-5">
                    <strong>
                      {connectIsDesktop ? (
                        <a
                          href={`agencycloud://process/webpage?url=${values.metadata?.declarationRisk?.declarationForm}`}
                        >
                          View in browser
                        </a>
                      ) : (
                        <a
                          href={values.metadata?.declarationRisk?.riskAssessmentForm}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View in browser
                        </a>
                      )}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="field pb-2">
                <div className={`columns ${styles.reverseColumns}`}>
                  <ButtonGroup hasSpacing isCentered>
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                      className="mr-2"
                      variant="success"
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      className="mr-2"
                      variant="secondary"
                      type="button"
                      onClick={onPrevHandler}
                    >
                      Previous
                    </Button>
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                      variant="primary"
                      type="button"
                      onClick={onNextHandler(values)}
                    >
                      Finish
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  }
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export type DispatchProps = {
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export type OwnPropsProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onHandleSubmit: (values) => dispatch(updateDeclarationAndRisk({ contact: values })),
    onNextHandler: (values: any) => () => dispatch(updateDeclarationAndRisk({ contact: values })),
    onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.ADDRESS_INFORMATION)),
  }
}

export const DeclarationAndRiskAssessmentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeclarationAndRiskAssessment)

DeclarationAndRiskAssessmentWithRedux.displayName = 'DeclarationAndRiskAssessmentWithReduxWithRedux'

export default DeclarationAndRiskAssessmentWithRedux
