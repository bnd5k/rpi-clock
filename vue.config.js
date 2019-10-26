module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'us-west-2',
      bucket: 'rpi-clock',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      pwaFiles: 'service-worker.js',
      enableCloudfront: false,
      cloudfrontId: 'ditro',
      cloudfrontMatchers: '/*',
      uploadConcurrency: 5,
      pluginVersion: '4.0.0-rc2',
      overrideEndpoint: false
    }
  }
}
