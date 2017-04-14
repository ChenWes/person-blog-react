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

## mongo db dev environment docker setting
```
docker pull mongo
docker run -d --name mongo-docker-dev --restart=always -p 27018:27017  -v /home/docker/mongo/dev/data/configdb:/data/configdb  -v /home/docker/mongo/dev/data/db:/data/db  mongo
```