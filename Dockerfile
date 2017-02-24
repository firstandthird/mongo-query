FROM firstandthird/node:prod-6.7-2

RUN npm run clientkit:prod

CMD ["npm", "start"]
