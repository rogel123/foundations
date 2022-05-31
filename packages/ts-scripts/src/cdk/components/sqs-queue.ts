import * as cdk from 'aws-cdk-lib'
import { aws_sqs as sqs, Duration } from 'aws-cdk-lib'

export const createSqsQueue = (
  stack: cdk.Stack,
  name: string,
  visibilityTimeout?: number,
  receiveMessageWaitTime?: Duration,
): sqs.Queue => {
  return new sqs.Queue(stack, name, {
    visibilityTimeout: cdk.Duration.seconds(visibilityTimeout || 30),
    receiveMessageWaitTime,
  })
}
export type Queue = sqs.Queue
