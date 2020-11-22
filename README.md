# ben-mayer-nuxt-firebase

[Demo](https://benmayer-firebase-node-test.web.app/)

## Build Setup

``` bash
# install dependencies in /src 
$ cd src 
$ yarn install

# install dependencies in /functions for firebase functions 
$ cd functions 
$ yarn install


# serve nuxt on dev server at localhost:3000
$ yarn dev

# build for production and serve firebase functions locally at localhost:5000
$ yarn deploy 

# generate static project
$ yarn predeploy

# build firebase for productions
$ yarn deploy


```

## Firebase installation

install firebase cli and login using your firebase account

``` bash 
$ curl -sL https://firebase.tools | bash

```
then create a .env file in the `src` directory your firebase config


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
