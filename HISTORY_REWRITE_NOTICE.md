# Git History Rewrite Notice

## ⚠️ IMPORTANT: Repository History Has Been Rewritten

The git history of this repository has been rewritten to remove sensitive information (`.env` file containing secrets) that was accidentally committed.

### What happened?

- The `.env` file containing sensitive credentials (MongoDB credentials, JWT secrets, email addresses) was accidentally committed to the repository
- We used BFG Repo-Cleaner to remove this file from all commits in the git history
- The git history has been rewritten and force-pushed to the remote repository

### What you need to do as a collaborator:

1. **⚠️ DO NOT PULL OR MERGE** - Your local repository is now out of sync with the remote

2. **Back up any uncommitted local changes:**
   ```bash
   # If you have uncommitted changes, save them
   git stash save "backup before history rewrite"
   ```

3. **Delete your local repository and re-clone:**
   ```bash
   # Navigate to parent directory
   cd ..
   
   # Delete the old local repository
   rm -rf MyPortfolio
   
   # Clone fresh from remote
   git clone https://github.com/TheGuy3201/MyPortfolio.git
   cd MyPortfolio
   ```

4. **If you stashed changes, apply them to the new clone:**
   ```bash
   # Copy your stashed changes from the old repo backup
   ```

### Alternative: Force reset your local repository

If you prefer to keep your local directory:

```bash
# WARNING: This will discard all local changes and commits!
git fetch origin
git reset --hard origin/copilot/remove-secrets-from-git-history
git clean -fdx
```

### Important Security Notes:

- **The old credentials have been rotated** - Any secrets that were in the old `.env` file have been changed
- **Update your local `.env` file** - Make sure you have the new credentials from the team
- **Never commit `.env` files** - The `.env` file is already in `.gitignore` and should never be committed

### Questions?

If you have any questions or issues with this process, please contact the repository maintainer.

---

**Date of history rewrite:** November 11, 2025  
**Tool used:** BFG Repo-Cleaner 1.14.0  
**Commits affected:** All commits containing `.env` file
