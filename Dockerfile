FROM node:16.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/ .

RUN mkdir ./keys

RUN cd keys && ssh-keygen -q -N '' -t rsa -b 4096 -m PEM -f private.pem && openssl rsa -in private.pem -pubout -outform PEM -out public.pem && rm private.pem.pub

EXPOSE 3000

CMD ["node", "server"]