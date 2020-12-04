module.exports = {

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Ben Mayer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ben Mayer - Product Manager, currently in Berlin. This is a collection of tings I\'ve learnt and thoughts I\'ve thought.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
      '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
      '@nuxtjs/pwa',
      '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_CONFIG_DATABASE_URL,
      projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
      storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_CONFIG_APP_ID,
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false,
        },
        ssr: true,
      },
      storage: true,
      firestore: {
        // memoryOnly: false, // default
        // chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
        // enablePersistence: true,
        // emulatorPort: 8080,
        // emulatorHost: 'localhost',
        // settings: {   
        //   render: {
        //     bundleRenderer: {
        //       runInNewContext: false
        //     }
        //   },
        // }
      }
    }
  },
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,
    workbox: {
      importScripts: [
        // ...
        'firebase-auth-sw.js',
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: true,
    }
  },
  tailwindcss: {
    config: {
      theme: {
        fontFamily: {
          'sans': ['Source Sans Pro','Helvetica Neue','Arial', 'ui-sans-serif', 'system-ui'],
          'serif': ['ui-serif', 'Georgia'],
          'mono': ['ui-monospace', 'SFMono-Regular'],
          'display': ['Quicksand'],
          'body': ['Source Sans Pro','Helvetica Neue','Arial'],
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}