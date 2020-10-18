# ben-mayer-nuxt-firebase

## Build Setup

``` bash
# install dependencies in /src 
$ cd src 
$ yarn install

# install dependencies in /functions for firebase functions 
$ cd functions 
$ yarn install


# serve nuxt on dev server at localhost:3000
$ cd src 
$ yarn dev



# build for production and launch server
$ cd src 
$ npm run build
$ npm start

# generate static project
$ cd src 
$ npm run generate

# serve firebase functions locally at localhost:5000
$ firebase serve --only functions, hosting


# build firebase for productions
$ firebase deploy


```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
