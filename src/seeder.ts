import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@example.com';
  const existingAdmin = await usersService.findByEmail(adminEmail);

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await usersService.create({
      name: 'Admin User',
      email: adminEmail,
      password: passwordHash,
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  await app.close();
}

bootstrap();
