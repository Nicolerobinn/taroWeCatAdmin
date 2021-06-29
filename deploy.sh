#强制推送
#!/usr/bin/env bash
set -e
npm run build
cd dist
touch .nojekyll
git init
git add -A
git commit -m 'deploy'
cd -
exec /bin/bash




