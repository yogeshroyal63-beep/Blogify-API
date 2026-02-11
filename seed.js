// seed.js
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from './models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
const NUM_USERS = 1000;
const BATCH_SIZE = 100;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
}

function generateFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    username: faker.internet.username({ firstName, lastName }).toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
    phone: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    createdAt: faker.date.past({ years: 2 }),
    isActive: faker.datatype.boolean({ probability: 0.9 })
  };
}

async function seedDatabase() {
  try {
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('✓ Cleared existing users');

    const batches = Math.ceil(NUM_USERS / BATCH_SIZE);
    console.log(`Generating ${NUM_USERS} users in ${batches} batches...`);

    for (let i = 0; i < batches; i++) {
      const usersInBatch = Math.min(BATCH_SIZE, NUM_USERS - (i * BATCH_SIZE));
      const users = [];

      for (let j = 0; j < usersInBatch; j++) {
        users.push(generateFakeUser());
      }

      await User.insertMany(users, { ordered: false });
      console.log(`✓ Batch ${i + 1}/${batches} complete (${users.length} users)`);
    }

    console.log(`✓ Successfully seeded ${NUM_USERS} users`);
  } catch (error) {
    console.error('✗ Seeding error:', error);
    throw error;
  }
}

async function main() {
  await connectDB();
  await seedDatabase();
  await mongoose.connection.close();
  console.log('✓ Database connection closed');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});