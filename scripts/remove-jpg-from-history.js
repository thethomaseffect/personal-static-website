// This script will help remove JPG files from git history
// Note: This rewrites git history and requires force push

const { execSync } = require('child_process');
const path = require('path');

console.log('WARNING: This will rewrite git history!');
console.log('Make sure you have a backup and all changes are committed.\n');

// Check if we're in a git repository
try {
  execSync('git rev-parse --git-dir', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: Not in a git repository!');
  process.exit(1);
}

// Check if there are uncommitted changes
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.error('Error: You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }
} catch (error) {
  console.error('Error checking git status:', error.message);
  process.exit(1);
}

console.log('Removing all .jpg files from git history...');
console.log('This may take a while...\n');

try {
  // Use git filter-branch to remove all .jpg files from all commits
  // This will keep the files but remove them from history
  const command = `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch 'for-sale/public/images/*.jpg' 'for-sale/public/images/*.JPG'" --prune-empty --tag-name-filter cat -- --all`;
  
  console.log('Running git filter-branch...');
  execSync(command, { stdio: 'inherit' });
  
  console.log('\n✓ Git history rewritten successfully!');
  console.log('\nNext steps:');
  console.log('1. Run: git reflog expire --expire=now --all');
  console.log('2. Run: git gc --prune=now --aggressive');
  console.log('3. Force push: git push origin --force --all');
  console.log('4. Force push tags: git push origin --force --tags');
  console.log('\n⚠️  WARNING: Force pushing will rewrite remote history!');
  console.log('Make sure all collaborators are aware and re-clone the repository.');
  
} catch (error) {
  console.error('\nError:', error.message);
  console.log('\nIf git filter-branch failed, you may need to:');
  console.log('1. Install git-filter-repo (recommended)');
  console.log('2. Or use BFG Repo-Cleaner');
  process.exit(1);
}





