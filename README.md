## This is why we play 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master.svg?style=svg)](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master)

![group](https://cloud.githubusercontent.com/assets/5305874/12059257/dacf1ad0-af92-11e5-920c-ba4818d8dc1d.png)

## Info
* **Platform:** iOS & Android
* **State Management:** Redux
* **Code Style:** Standard
* **Unit Test:** None, take a look at [snowflake](https://github.com/bartonhammond/snowflake) for learning
* **Related Articles:** [Let’s drawing charts in React-Native without any library](https://medium.com/@wwayne_me/let-s-drawing-charts-in-react-native-without-any-library-4c20ba38d8ab#.kyyxnrb9s)

## Demonstration
### Games
![game](https://cloud.githubusercontent.com/assets/5305874/12422631/e33d57ca-bf02-11e5-8bdf-e10df77fc1fb.gif)
![game_android](https://cloud.githubusercontent.com/assets/5305874/12530667/eb14e1c2-c220-11e5-864d-971e62646afa.gif)

### Players
![player](https://cloud.githubusercontent.com/assets/5305874/12422675/19ae6696-bf03-11e5-87d5-6abc805b62b8.gif)
![player_android](https://cloud.githubusercontent.com/assets/5305874/12530668/f42c16b8-c220-11e5-82a5-a886cd0cfd65.gif)

### Teams
![team](https://cloud.githubusercontent.com/assets/5305874/12422777/7dc6d870-bf03-11e5-82eb-634b14d34f16.gif)
![team_android](https://cloud.githubusercontent.com/assets/5305874/12530753/dc968fd0-c223-11e5-98ed-a55771ce5333.gif)


## Develop
#### iOS
1. `$ npm install`
2. `$ npm run clean` react-native unsupport for .babelrc since 0.16, so you have to remove all .babelrc in your project(includes packages)
3. `$ npm start`
4. Open your Xcode, select a simulator, click the play button or `cmd + R`

#### Android
1. Same to [official doc](http://facebook.github.io/react-native/docs/android-setup.html#content)
2. `$ react-native run-android`
3. It's a bit complicated to those who are not familiar with Android development, like me

## Design
The design is made by Sketch, you can find the original design file in [Dropbox](https://www.dropbox.com/s/3hn1o5xgk7bzjpa/Allyoop.sketch?dl=0), it may help if someone wants to design new features.

## Run in device
#### iOS：
1. Check the [official doc](http://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle) first, the following steps are based on official doc

2. Comment `console` in `lib/middleware/logger.js`, because native environment doesn't support for `console.group`

3. Generate js bundle: **$ react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./main.jsbundle**

4. Add js bundle into your project: open Xcode, select **Files** -> **Add Files to...** -> select the main.jsbundle file that just generated

5. In Xcode, select your device, then click the play button or `cmd + R`

#### Android:
I never tried

## To Be Continue
1. Fix UI in Android
2. Find a better way to organize css
3. Unit test


## License

MIT
