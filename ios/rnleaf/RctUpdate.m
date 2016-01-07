//
//  RctUpdate.m
//  rn_simple_music_player
//
//  Created by qixingyue on 16/1/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RctUpdate.h"
#import <RCTRootView.h>

NSString *const DEFAULT_MODULE_NAME = @"rnleaf";

@implementation RctUpdate {
  NSString *jsbundlePath;
}

@synthesize bridge = _bridge;


RCT_EXPORT_MODULE();

- (NSString *) applicationDocumentsDirectory
{
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
  return basePath;
}


//回到最初始化加载的loading.jsbundle
- (void) backToLoadingPanel {
  NSURL *jsCodeLocation ;
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"loading" withExtension:@"jsbundle"];
  [self mainUIShowNSURL:jsCodeLocation : DEFAULT_MODULE_NAME];
}

- (void) mainUIShowNSURL : (NSURL *) jsCodeLocation : (NSString*) moduleName  {
  dispatch_sync(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:moduleName initialProperties:nil launchOptions:nil];
    [[appDelegate.window rootViewController]setView:rootView];
  });
}

//UILongPressGestureRecognizer 长按事件
- (void) addLongPressEvent : (UIView *) rootView {
  UITapGestureRecognizer *longGnizer=nil;
  longGnizer=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(longGo:)];
  [rootView addGestureRecognizer:longGnizer];
}

-(void)longGo:(UILongPressGestureRecognizer *)aGer{
  NSLog(@"%s",__func__);
  if (aGer.state==UIGestureRecognizerStateBegan) {
    NSLog(@"%s",__func__);
  }
}

// 调用demo
// NSString *url = @"http://localhost:8081/index.ios.bundle";
//  [self refreshApplicationViewWithUrl:url];
- (void) _downloadAndRun : (NSString*) url : (NSString*) moduleName {
  
  NSString *savefileName = [moduleName stringByAppendingString:@".jsbundle"];
  NSString *documentPath = [self applicationDocumentsDirectory];

  //下载文件，从URL下载
  NSURL *urlLocation = [NSURL URLWithString:url];
  NSData *data = [NSData dataWithContentsOfURL:urlLocation];
  NSString *path = [[documentPath stringByAppendingString:@"/"] stringByAppendingString:savefileName];
  [data writeToFile:path atomically:YES];
  [self showLocalModuleApp:moduleName];
}

- (void) refreshApplicationViewWithUrl : (NSString*) url : (NSString*) moduleName {
  NSURL *jsCodeLocation = [NSURL URLWithString:url];
  [self mainUIShowNSURL:jsCodeLocation :moduleName ];
}



- (void) showLocalModuleApp : (NSString*) moduleName {
    NSString *savefileName = [moduleName stringByAppendingString:@".jsbundle"];
    NSString *rootPath = [self applicationDocumentsDirectory];
    NSString *jsPath = [[rootPath stringByAppendingString:@"/"] stringByAppendingString:savefileName];
    NSURL *jsCodeLocation ;
    jsCodeLocation = [NSURL fileURLWithPath:jsPath];
    [self mainUIShowNSURL:jsCodeLocation :moduleName ];
}

RCT_EXPORT_METHOD(downloadAndRun : (NSString*) url : (NSString*) moduleName)
{
  [self _downloadAndRun:url:moduleName];
}

RCT_EXPORT_METHOD(loadFromUrl : (NSString*) url : (NSString*) moduleName)
{
  [self refreshApplicationViewWithUrl:url:moduleName];
}

//js回调，返回主界面
RCT_EXPORT_METHOD(backToBase){
  [self backToLoadingPanel];
}

RCT_EXPORT_METHOD(loadFromLocal : (NSString*) moduleName) {
  [self showLocalModuleApp:moduleName];
}

RCT_EXPORT_METHOD(simpleTest)
{
  NSLog(@"This is only a simple test ...");
}



@end
