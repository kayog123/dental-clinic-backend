LATEST_SHA=$(git rev-parse HEAD)
docker build -t dental-express-eks:$LATEST_SHA .
docker tag dental-express-eks:$LATEST_SHA 754071320815.dkr.ecr.ap-southeast-1.amazonaws.com/dental-express-eks:$LATEST_SHA
docker push 754071320815.dkr.ecr.ap-southeast-1.amazonaws.com/dental-express-eks:$LATEST_SHA
kubectl set image deployment/dental-backend-app dental-backend-app=754071320815.dkr.ecr.ap-southeast-1.amazonaws.com/dental-express-eks:$LATEST_SHA -n default