## This is why we play 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master.svg?style=svg)](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master)

![group](https://cloud.githubusercontent.com/assets/5305874/12267988/c9942ad8-b985-11e5-8704-0b68b396c2f1.png)

The project is still in highly development, and only tested in iPhone6

**Current function:**

1. Check games of today(live) and yesterday
2. Search and check player's performance

## Demo (in iPhone6)
![demo](https://cloud.githubusercontent.com/assets/5305874/12059946/80c2e626-afa0-11e5-95d5-5fff1ad0558b.gif)


## Develop
1. `$ npm install`
2. `$ npm run clean` react-native unsupport for .babelrc since 0.16, so you have to remove all .babelrc in your project(includes packages)
3. `$ npm start`
4. Open your Xcode, select a simulator, click the play button or `cmd + R`

## Run in device
1. Check the [official doc](http://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle) first, the following steps are based on official doc

2. Comment `console` in `lib/middleware/logger.js`, because native environment doesn't support for `console.group`

3. Generate js bundle: **$ react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./main.jsbundle**

4. Add js bundle into your project: open Xcode, select **Files** -> **Add Files to...** -> select the main.jsbundle file that just generated

5. In Xcode, select your device, then click the play button or `cmd + R`

## License

MIT
