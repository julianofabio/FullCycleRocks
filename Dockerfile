#Compartilha o volume e executa container: docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash
#Entrando no container: usr/src/app
##Instalando o módulo node dentro do container:
# npn init
# npm install express --save
# Executar Index criado: node index.js
##Instalando o módulo mysql no container:
# npm install --save mysql
#npm un mysql && npm i mysql2
##Criando image:
#Compila: docker build -t julianomiranda/nodefull .
#Executa: docker run -p 3000:3000 julianomiranda/nodefull
FROM node:15

WORKDIR /usr/src/app
#RUN npm install express && \
#    npm i mysql2

COPY . .

EXPOSE 3000:52618

CMD ["node","index.js"]
