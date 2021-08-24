#!/bin/bash
cd /home/ubuntu/ssg-ga/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export SERVER_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_PORT --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REST_API=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REST_API --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export CRYPTOJS_SECRETKEY=$(aws ssm get-parameters --region ap-northeast-2 --names CRYPTOJS_SECRETKEY --query Parameters[0].Value | sed 's/"//g')
export S3_ACCESS_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names S3_ACCESS_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export S3_SECRET_ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_SECRET_ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js