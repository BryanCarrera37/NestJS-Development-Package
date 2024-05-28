# NestJS Development Package

This is a library that can be used in your projects to perform common actions across your Services and Controllers.


## Instructions

### Install
```sh
$ npm install @bryancm/nestjs-development-package
```

### Library Usage
You have to import the main module (DevelopmentPackageModule) in your Application.

#### Reading the Environment File
There's a **Helper** with the name **EnvironmentHelperService** that can be used to read your Environment Variables.

First at all, you have to tell the module where your **Environment File (.env)** is

```ts
import { Module } from '@nestjs/common';
import { DevelopmentPackageModule } from '@bryancm/nestjs-development-package';
import { join } from 'path';

@Module({
  imports: [
    DevelopmentPackageModule.forRoot({
      envFilePath: join(__dirname, '/../.env')
    })
  ],
})
export class AppModule {}

```

After that, you only have to use the helper anywhere:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentHelperService } from '@bryancm/nestjs-development-package/helpers';
import { Logger } from '@nestjs/common';

const environmentHelper: EnvironmentHelperService = new EnvironmentHelperService();

async function bootstrap() {
  const PORT = environmentHelper.getInteger('APP_PORT');
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
  logger.debug(`App running on the PORT ${PORT} for the "${environmentHelper.getString('ENVIRONMENT')}" ENVIRONMENT`);
}
bootstrap();
```

## List of Functionalities

In this library you can find:

- Const Values
- Contracts (Interfaces)
- Helpers (Date, String, Object, Array, Environment, etc)
- Pipes