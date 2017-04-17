# 使用基础镜像
From node:boron

# 创建目录，并且指定工作目录
RUN mkdir -p /usr/src/app
WORKDIR /user/src/app

# 将当前目录所有文件复制至工作目录，此处会忽略.dockerignore中的文件或文件夹，COPY和ADD命令都会忽略
COPY . /user/src/app

# 使用npm安装依赖包及打包
RUN npm install
RUN npm install -g webpack
RUN webpack

#映射4000端口(已经修改项目的默认端口为4000)(指定容器需要映射到宿主机器的端口)
EXPOSE 4000

# 运行命令npm start
CMD ["npm","start"]