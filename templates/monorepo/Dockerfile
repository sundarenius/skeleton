FROM node:16.0.0

RUN apt-get update

# OWN CONTENT
RUN useradd -m myuser
WORKDIR /app
COPY package.json .
COPY . .

RUN yarn install
RUN sh -c 'cd /app/workspaces/frontend && yarn build'

CMD ["yarn", "start"]
