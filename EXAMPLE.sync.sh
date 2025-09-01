#!/bin/bash

# Configuration
REMOTE_USER="user"
REMOTE_HOST="example.com"
REMOTE_PATH="build"
# SSH_KEY_PATH="$HOME/.ssh/gitlab_deploy_key"

# Sync using rsync over ssh (with password prompt)
# rsync -avz --progress -e ssh "$LOCAL_PATH/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Sync using rsync over ssh key
# rsync -avz --progress -e "ssh -i $SSH_KEY_PATH" "$LOCAL_PATH/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Sync using joost-inspired config
# rsync -rltcOzv --progress -exclude=".*" --exclude node_modules -e "ssh -i $SSH_KEY_PATH" "$LOCAL_PATH/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Include htaccess file
cp htaccess/.htaccess build/.htaccess

# Prompt for password securely
read -sp "Enter FTP Password: " FTPSPASS
echo ""

# Sync SvelteKit Static Site (./build -> / on server)
echo "Syncing SvelteKit Static Site..."
lftp -u "$REMOTE_USER","$FTPSPASS" ftp://$REMOTE_HOST:21 <<EOF
# Set FTPS-specific options
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ftp:passive-mode true
set ssl:verify-certificate no  # Optional for self-signed certs

# Sync contents from ./build to the root directory on the server
mirror -R --exclude "kirby/*" --verbose ./build "$REMOTE_PATH"
EOF

# Check if SvelteKit sync was successful
if [ $? -eq 0 ]; then
	echo "✅ SvelteKit Static Site synced successfully!"
else
	echo "❌ SvelteKit Static Site sync failed."
fi