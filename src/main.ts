import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Set up session middleware
   app.use(
    session({
      secret: 'your-secret-key',  // Change this to a real secret key
      resave: false,
      saveUninitialized: false,
      //cookie: { secure: false },  // In production, set secure to true
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: 'http://localhost:3001', // or whatever port your Next.js app is running on
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
