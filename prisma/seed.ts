import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma with adapter
const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

async function main() {
  console.log('🌱 Seeding database...\n');

  try {
    // Clear existing sessions
    await prisma.session.deleteMany({});
    console.log('🗑️  Cleared old sessions\n');

    // Create admin user
    const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@aryamadam.com' },
      update: {
        password: hashedAdminPassword,
        role: 'ADMIN',
        name: 'Admin User',
      },
      create: {
        email: 'admin@aryamadam.com',
        name: 'Admin User',
        password: hashedAdminPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Admin user created:');
    console.log('   📧 Email:', admin.email);
    console.log('   🔑 Password: Admin@123');
    console.log('   👤 Role:', admin.role);
    console.log('   🆔 ID:', admin.id);
    console.log('');

    // Create test user
    const hashedUserPassword = await bcrypt.hash('User@123', 10);
    
    const user = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {
        password: hashedUserPassword,
        role: 'USER',
      },
      create: {
        email: 'user@test.com',
        name: 'Test User',
        password: hashedUserPassword,
        role: 'USER',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Test user created:');
    console.log('   📧 Email:', user.email);
    console.log('   🔑 Password: User@123');
    console.log('   👤 Role:', user.role);
    console.log('   🆔 ID:', user.id);
    console.log('');

    console.log('🎉 Database seeded successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });