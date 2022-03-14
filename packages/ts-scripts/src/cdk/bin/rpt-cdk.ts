import process from 'process'
import { execSync } from 'child_process'
import path from 'path'
import argv from 'process.argv'

const processArgv = argv(process.argv.slice(2))
const commandsArgs = processArgv<any>({})
const params = commandsArgs['--']
const options = commandsArgs

const [command, scriptName = 'cdk-stack.ts'] = params
const cwd = process.cwd()
const templatesDir = path.join(cwd, 'cdk.out')

if (options.local) console.log('Running in dev mode...')

if (command) {
  const cdkCommand = options.local ? 'cdklocal' : 'cdk'
  try {
    execSync(
      `yarn ${cdkCommand} ${command} --require-approval never --output=${templatesDir} -a "cd ${cwd} && yarn dlx ts-node ${scriptName}"`,
      {
        stdio: 'inherit',
        cwd: __dirname,
      },
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
} else {
  console.log(`
    Usage:
      rpt-cdk <command> <scriptName>

      Args: <scriptName> - The name of the script to run, defaults to cdk-stack.ts

      Commands:
        synth - Generate a report of the CDK stack
        deploy - Deploy the CDK stack
        watch - Deploy the CDK stack and watch for changes
        destroy - Destroy the CDK stack

      Options:
        --local - deploy locally using cdklocal command (use with localstack)
  `)
}
