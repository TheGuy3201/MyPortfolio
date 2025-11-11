#!/usr/bin/env node

/**
 * Generate Secure JWT Secret
 * 
 * This script generates a cryptographically secure random string
 * suitable for use as a JWT secret.
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Secure JWT Secret...\n');

// Generate 64 bytes of random data and convert to hex string
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your new JWT secret:');
console.log('═'.repeat(80));
console.log(secret);
console.log('═'.repeat(80));
console.log('\n✅ Copy this value and add it to your .env file as JWT_SECRET\n');
console.log('Example:');
console.log(`JWT_SECRET=${secret}\n`);

console.log('⚠️  IMPORTANT:');
console.log('  - Never share this secret');
console.log('  - Never commit it to git');
console.log('  - Use a different secret for each environment (dev/staging/prod)');
console.log('  - Store it securely in your environment variables\n');
