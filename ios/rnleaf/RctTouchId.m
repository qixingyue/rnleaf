//
//  RctTouchId.m
//  rnleaf
//
//  Created by qixingyue on 16/2/26.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RctTouchId.h"

@implementation RctTouchId

RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

RCT_EXPORT_METHOD(hello) {
  LAContext *context = [LAContext new];
  NSError *error;
  context.localizedFallbackTitle = @"";
  
  if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
    NSLog(@"Touch ID is available.");
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
            localizedReason:NSLocalizedString(@"Use Touch ID to log in.", nil)
                      reply:^(BOOL success, NSError *error) {
                        if (success) {
                          NSLog(@"Authenticated using Touch ID.");
                        } else {
                          if (error.code == kLAErrorUserFallback) {
                            NSLog(@"User tapped Enter Password");
                          } else if (error.code == kLAErrorUserCancel) {
                            NSLog(@"User tapped Cancel");
                          } else {
                            NSLog(@"Authenticated failed.");
                          }
                        }
                      }];
  } else {
    NSLog(@"Touch ID is not available.");
  }
}

@end
