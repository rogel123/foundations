# Deployment Service

> Deployment service for troy project

## Localstack

### Install required commands 

```bash
$ make
```

### Start localstack

```bash
$ sh ./scripts/start.sh
```

### CDK with localstack

#### bootstrap

```bash
$ yarn rpt-cdk --local bootstrap cdk/cdk.ts
```

#### Deploying to localstack

```bash
$ yarn deploy-local
```

> Under the hood `yarn rpt-cdk deploy --local cdk/cdk.ts`

## TypeORM

### Config

#### Cli

For the typeorm cli, you'll need to make sure you have the `ormconfig.json` file locally first.

> The cli is used for the migration scripts defined below

### Migrations

#### Run

This will run all the migrations and update the database schema.

```bash
$ yarn migration:run
```

#### Generate

The below command will create a new migration for changes made to the entities

```bash
$ yarn migration:generate -n MyNewMigration
```
> Don't forget to give a useful name for your migration!
