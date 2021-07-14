FROM node:latest
RUN mkdir -p /home/app/build/
RUN npm i -g serve
COPY build/ /home/app/build/
EXPOSE 5000
CMD serve -s /home/app/build/

