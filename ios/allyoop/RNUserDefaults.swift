//
//  RNUserDefaults.swift
//  allyoop
//
//  Created by wayne on 15/12/11.
//  Copyright © 2015年 Facebook. All rights reserved.
//

import Foundation
@objc(RNUserDefaults)

class RNUserDefaults: NSObject {
  
  let defaults: NSUserDefaults = NSUserDefaults.standardUserDefaults()
  
  @objc func setObject(key: String, forValue value: String, callback cb: RCTResponseSenderBlock) -> Void {
    self.defaults.setObject(value, forKey: key)
    cb(["Success"])
  }
  
  @objc func getString(key:String, callback cb: RCTResponseSenderBlock) -> Void {
    if let value = self.defaults.stringForKey(key) {
      cb([value])
    } else {
      cb([false])
    }
  }
  
  @objc func removeObject(key: String, callback cb: RCTResponseSenderBlock) -> Void {
    self.defaults.removeObjectForKey(key)
    cb(["Remove success"])
  }
  
}
