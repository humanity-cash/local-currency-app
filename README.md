# Berkshares-app
berkshares frontend application

## Dev setup

### Requirements

1. Project is setup with [Expo](https://expo.io/) toolset which needs to be installed globally: ```npm install expo-cli --global```
2. Install local project dependencies: ```yarn install```

### Startup

- iOS*: ```yarn ios```
- Android*: ```yarn android```

(* Requires local available emulator or connected device in development mode)


## Folder Structure

### The main folders are src/api, src/screens, src/hooks, src/stores, src/style, src/common

#### src/api: holde the api setup, api requests and formatters for requests and responses going thro the api
#### src/screens: holds the different screens grouped into: onboarding, user, merchant, auth, transaction. the main motivation here is to keep this as clean as possible, ie only contains the views - any logic the screens are using should be located in src/hooks or src/common.
#### src/hooks: holds functions that use react hooks like useEffect
#### src/stores: holds stores initializations and thier initial state, using react-hooksstore
#### src/style: holds the theme definition, global style vars, global styled components
#### src/common: holds shared components, time utils, crypto utils...

## Deploy
[This guide](https://docs.expo.dev/distribution/uploading-apps/) will help you upload your Expo standalone apps to Apple TestFlight and to Google Play.

## Steps for automating the build process for APK in Android
- upgrade build version and code number in ```app.json```
- ```expo build:android``` on project root directory
- choose the build type as ```apk```
