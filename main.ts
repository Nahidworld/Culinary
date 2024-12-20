import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Set up session middleware
   app.use(
    session({
      secret: 'your-secret-key',  // Change this to a real secret key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },  // In production, set secure to true
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
