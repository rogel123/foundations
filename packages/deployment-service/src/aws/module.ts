import roleCredentials, { RoleCredentialsType } from '../config/role-credentials'
import { getRoleCredentials } from './assumed-role-credentials'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CodeBuild, Credentials, S3, SSM } from 'aws-sdk'

export const ROLE_CREDENTIALS = 'ROLE_CREDENTIALS'

@Module({
  imports: [ConfigModule.forFeature(roleCredentials)],
  providers: [
    {
      provide: ROLE_CREDENTIALS,
      useFactory: async (config: ConfigService) =>
        getRoleCredentials(config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType),
      inject: [ConfigService],
    },
    {
      provide: CodeBuild,
      useFactory: async (credentials: Credentials) =>
        new CodeBuild({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: S3,
      useFactory: async (credentials: Credentials) => {
        return new S3({
          credentials,
        })
      },
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: SSM,
      useFactory: async (credentials: Credentials) =>
        new SSM({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: CloudFrontClient,
      useFactory: async (credentials: Credentials) =>
        new CloudFrontClient({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
  ],
  exports: [S3, CodeBuild, SSM, ROLE_CREDENTIALS, CloudFrontClient],
})
export class AwsModule {}
