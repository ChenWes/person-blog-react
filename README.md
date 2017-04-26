# person-blog-react
## back end create project
```
npm install -g generator-express
yo express
MVC
Jade
None
MongoDB
Gulp
```

## mongo db dev 环境 docker 配置选项
```
docker pull mongo
docker run -d --name mongo-docker-dev --restart=always -p 27018:27017  -v /home/docker/mongo/dev/data/configdb:/data/configdb  -v /home/docker/mongo/dev/data/db:/data/db  mongo
```

## person blog backend环境docker配置选项

镜像
```
docker build -t person-blog-dev-backend .
```

容器
```
docker run -d --name person-blog-dev-backend --restart=always -p 4001:4000 person-blog-dev-backend
```

## person blog fontend本地环境运行
项目生成
```
yarn febuild
```
项目运行
```
yarn bestart
```
