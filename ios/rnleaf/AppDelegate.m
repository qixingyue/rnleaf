/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

@implementation AppDelegate {
  NSTimer *timer;
  NSInteger _count;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
//  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/app/loading/loading.ios.bundle?platform=ios&dev=true"];
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.114:8081/app/loading/loading.ios.bundle?platform=ios&dev=true"];
  
// curl -o ./rnleaf/loading.jsbundle "http://localhost:8081/app/loading/loading.ios.bundle"
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"loading" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"rnleaf"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url  {
  NSLog(@"%@", [url absoluteString]);
  
  // 在 host 等于 item.rnleaf 时，说明一个宝贝详情的 url，
  // 那么就使用本地的 TBItemDetailViewController 来显示
  if ([[url host] isEqualToString:@"item.rnleaf"]) {
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    [self.window makeKeyAndVisible];
  }
  return YES;
}


@end
