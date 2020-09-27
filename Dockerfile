FROM node
RUN mkdir /opt/module/lingxi-vue
WORKDIR /opt/module/lingxi-vue
COPY . ./
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm run build
RUN tar -zcf dist.tar.gz dist
