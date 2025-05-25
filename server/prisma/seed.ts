// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (existingAdmin) {
        console.log('✅ Admin user already exists:', adminEmail);
    } else {
        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                name: 'System Administrator',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', adminEmail);
        console.log('🔑 Password:', adminPassword);
        console.log('👤 Role:', admin.role);
    }

    // Create some sample users for testing
    const sampleUsers = [
        {
            name: 'John Agent',
            email: 'agent@example.com',
            password: 'agent123',
            role: 'AGENT' as const,
        },
        {
            name: 'Jane User',
            email: 'user@example.com',
            password: 'user123',
            role: 'USER' as const,
        },
    ];

    for (const userData of sampleUsers) {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
            });

            console.log(`✅ Sample ${userData.role.toLowerCase()} created:`, userData.email);
        } else {
            console.log(`✅ Sample ${userData.role.toLowerCase()} already exists:`, userData.email);
        }
    }

    console.log('🌱 Database seed completed!');
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Agent: agent@example.com / agent123');
    console.log('User: user@example.com / user123');
}

main()
    .catch((e) => {
        console.error('❌ Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
