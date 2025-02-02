import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '../../utils/pipeline-helpers'
import Routes from '@/constants/routes'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  StatusIndicator,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { useHistory } from 'react-router'
import { navigate, openNewPage } from '../../utils/navigation'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { handlePipelineEvent } from '../apps/pipeline/pipeline-info'
import { useChannel, useEvent } from '@harelpls/use-pusher'

interface PipelineRowProps {
  pipeline: PipelineModelInterface
}

export const PipelineRow: FC<PipelineRowProps> = ({ pipeline }) => {
  const history = useHistory()
  const [appPipeline, setAppPipeline] = useState<PipelineModelInterface>(pipeline)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const channel = useChannel(`private-${connectSession?.loginIdentity.developerId}`)
  useEvent<PipelineModelInterface>(
    channel,
    'pipeline-update',
    handlePipelineEvent(
      appPipeline,
      setAppPipeline as Dispatch<SetStateAction<PipelineModelInterface | null>>,
      pipeline.id ?? null,
    ),
  )

  return (
    <TableRowContainer>
      <TableRow>
        <TableCell>{appPipeline.name}</TableCell>
        <TableCell>
          <StatusIndicator intent={buildStatusToIntent(appPipeline.buildStatus as string)} />
          {buildStatusToReadable(appPipeline.buildStatus as string)}
        </TableCell>
        <TableCell>
          <a target="_blank" href={appPipeline.repository} rel="noreferrer">
            {appPipeline.repository}
          </a>
        </TableCell>
        <TableExpandableRowTriggerCell
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        ></TableExpandableRowTriggerCell>
      </TableRow>
      <TableExpandableRow isOpen={isOpen}>
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          <ButtonGroup>
            <Button
              intent="secondary"
              onClick={navigate(history, Routes.APP_PIPELINE_CONFIGURE.replace(':appId', appPipeline.appId as string))}
            >
              Configure
            </Button>
            <Button
              intent="primary"
              onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', appPipeline.appId as string))}
            >
              Deployments
            </Button>
            {pipelineViewable(appPipeline.buildStatus as string) && (
              <Button
                intent="critical"
                chevronRight
                onClick={openNewPage(`https://${appPipeline.subDomain}.iaas.paas.reapit.cloud`)}
              >
                View App
              </Button>
            )}
          </ButtonGroup>
        </FlexContainer>
      </TableExpandableRow>
    </TableRowContainer>
  )
}
