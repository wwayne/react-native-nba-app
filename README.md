## This is why we play 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master.svg?style=svg)](https://circleci.com/gh/wwayne/react-native-nba-app/tree/master)

![current_design_screenshot](https://cloud.githubusercontent.com/assets/5305874/11449716/3cc44c84-95bb-11e5-8955-b1b16a608951.png)

Still in highly development, both design and code

## Game live
![Game live gif](http://g.recordit.co/FOoJ7YFkTs.gif)


## Run in device
1. See [official doc](http://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle)

1. Comment `console` in `lib/middleware/logger.js`, because native environment don't support for `console.group`

2. $ react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./main.jsbundle

3. xcode: Files -> Add Files to... -> select the main.jsbundle file that just generated

### License

MIT