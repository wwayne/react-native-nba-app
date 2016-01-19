## This is why we play 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master.svg?style=svg)](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master)

![group](https://cloud.githubusercontent.com/assets/5305874/12059257/dacf1ad0-af92-11e5-920c-ba4818d8dc1d.png)

**The project is under performance improvement and trying to compatible with Android**

## Demonstration
### Games
![game](https://cloud.githubusercontent.com/assets/5305874/12422631/e33d57ca-bf02-11e5-8bdf-e10df77fc1fb.gif)

### Players
![player](https://cloud.githubusercontent.com/assets/5305874/12422675/19ae6696-bf03-11e5-87d5-6abc805b62b8.gif)

### Teams
![team](https://cloud.githubusercontent.com/assets/5305874/12422777/7dc6d870-bf03-11e5-82eb-634b14d34f16.gif)



## Develop
1. `$ npm install`
2. `$ npm run clean` react-native unsupport for .babelrc since 0.16, so you have to remove all .babelrc in your project(includes packages)
3. `$ npm start`
4. Open your Xcode, select a simulator, click the play button or `cmd + R`

## Design
The design is made by Sketch, you can find the original design file in [Dropbox](https://www.dropbox.com/s/3hn1o5xgk7bzjpa/Allyoop.sketch?dl=0), it may help if someone wants to design new features.

## Run in device
1. Check the [official doc](http://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle) first, the following steps are based on official doc

2. Comment `console` in `lib/middleware/logger.js`, because native environment doesn't support for `console.group`

3. Generate js bundle: **$ react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./main.jsbundle**

4. Add js bundle into your project: open Xcode, select **Files** -> **Add Files to...** -> select the main.jsbundle file that just generated

5. In Xcode, select your device, then click the play button or `cmd + R`

## License

MIT
