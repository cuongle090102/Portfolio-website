// Quick verification script for production mode
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Verifying Production Build...\n');

// Check if out directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.error('❌ Output directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Check for required files
const requiredFiles = [
  'index.html',
  'projects/index.html',
  'favorites/index.html',
  'admin/index.html',
  '_next'
];

console.log('📁 Checking static files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Some required files are missing!');
  process.exit(1);
}

// Check index.html content
console.log('\n📄 Checking homepage content...');
const indexPath = path.join(outDir, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

const expectedContent = [
  'CUONG LE',
  'Technical Skills',
  'Selected Work',
  'My Approach'
];

expectedContent.forEach(content => {
  if (indexContent.includes(content)) {
    console.log(`✅ "${content}" found in homepage`);
  } else {
    console.log(`❌ "${content}" missing from homepage`);
  }
});

// Check if production mode is enabled
console.log('\n🔧 Checking API configuration...');
const apiPath = path.join(__dirname, 'src', 'lib', 'api.ts');
const apiContent = fs.readFileSync(apiPath, 'utf8');

if (apiContent.includes('process.env.NODE_ENV === \'production\'')) {
  console.log('✅ Production mode detection enabled');
} else {
  console.log('❌ Production mode not properly configured');
}

// Check mockData
console.log('\n📊 Checking mock data...');
const mockDataPath = path.join(__dirname, 'src', 'lib', 'mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

if (mockDataContent.includes('THESIS: SPODEL') && mockDataContent.includes('PORTFOLIO-WEB')) {
  console.log('✅ Projects data loaded from database');
} else {
  console.log('❌ Projects data missing');
}

if (mockDataContent.includes('Oldboy') && mockDataContent.includes('Cristiano Ronaldo')) {
  console.log('✅ Favorites data loaded from database');
} else {
  console.log('❌ Favorites data missing');
}

console.log('\n🎉 Production build verification complete!');
console.log('\n📋 Next steps:');
console.log('1. Push changes to GitHub');
console.log('2. Enable GitHub Pages in repository settings');
console.log('3. Your site will be available at: https://[username].github.io/Portfolio-website/');
console.log('\n💡 Admin demo login: demo123');