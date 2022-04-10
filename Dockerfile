FROM node:16-alpine3.14
# FROM node:16
WORKDIR /app
COPY package.json .

ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         fi
RUN npm install
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "run", "devStart"]