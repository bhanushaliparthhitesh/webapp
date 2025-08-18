#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Big4India Webapp Deployment Script');
console.log('=====================================\n');

// Check if this is the first deployment
const isFirstDeployment = !fs.existsSync('.vercel');

if (isFirstDeployment) {
    console.log('📋 First-time deployment setup...\n');
    
    // Install Vercel CLI if not present
    try {
        execSync('vercel --version', { stdio: 'ignore' });
        console.log('✅ Vercel CLI already installed');
    } catch (error) {
        console.log('📦 Installing Vercel CLI...');
        execSync('npm install -g vercel', { stdio: 'inherit' });
        console.log('✅ Vercel CLI installed');
    }
    
    console.log('\n🔧 Setting up project...');
    
    // Login to Vercel (if not already logged in)
    try {
        execSync('vercel whoami', { stdio: 'ignore' });
        console.log('✅ Already logged in to Vercel');
    } catch (error) {
        console.log('🔐 Please log in to Vercel...');
        execSync('vercel login', { stdio: 'inherit' });
    }
    
    // Deploy to Vercel
    console.log('\n🚀 Deploying to Vercel...');
    execSync('vercel --prod', { stdio: 'inherit' });
    
} else {
    console.log('🔄 Redeploying existing project...\n');
    
    // Just redeploy
    execSync('vercel --prod', { stdio: 'inherit' });
}

console.log('\n✅ Deployment completed!');
console.log('\n📝 Next steps:');
console.log('1. Update your domain in sitemap.xml');
console.log('2. Update robots.txt with your actual domain');
console.log('3. Set up custom domain in Vercel dashboard (if needed)');
console.log('4. Test all pages and functionality');
console.log('5. Set up analytics (Google Analytics, etc.)');

console.log('\n🔗 Useful commands:');
console.log('- npm run dev          # Start local development server');
console.log('- npm test             # Run Playwright tests');
console.log('- vercel --prod        # Deploy to production');
console.log('- vercel logs          # View deployment logs');
console.log('- vercel domains       # Manage custom domains');
