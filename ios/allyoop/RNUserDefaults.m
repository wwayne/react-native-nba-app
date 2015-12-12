//
//  RNUserDefaults.m
//  allyoop
//
//  Created by wayne on 15/12/11.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RNUserDefaults, NSObject)

RCT_EXTERN_METHOD(setObject:(NSString *)key forValue:(NSString *)value callback:(RCTResponseSenderBlock *)cb)

RCT_EXTERN_METHOD(getString:(NSString *)key callback:(RCTResponseSenderBlock *)cb)

RCT_EXTERN_METHOD(removeObject:(NSString *)key callback:(RCTResponseSenderBlock *)cb)

@end
