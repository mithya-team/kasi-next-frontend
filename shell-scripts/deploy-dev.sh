#!/bin/sh

checkout_script="source ~/.nvm/nvm.sh && cd ~/workspace/kasi-stag-fe && git pull origin develop";
build_script="nvm use && yarn && yarn build && pm2 restart kasi-stag-fe && pm2 logs kasi-stag-fe";

final_script="$checkout_script && $build_script";

ssh -t ubuntu@64.227.132.76 $final_script