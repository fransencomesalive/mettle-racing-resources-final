// scripts/setup-database.js
const { execSync } = require('child_process');

async function setupDatabase() {
  try {
    console.log('🔄 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('🔄 Pushing schema to database...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
