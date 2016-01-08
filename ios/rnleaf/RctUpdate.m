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
  //用来存取数据的指针
  NSData *dataPtr;
}

@synthesize bridge = _bridge;


RCT_EXPORT_MODULE();

- (NSString *) applicationDocumentsDirectory
{
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
  return basePath;
}

- (BOOL) checkURL:(NSURL *) url {
  NSURLRequest *request = [[NSURLRequest alloc] initWithURL : url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:5];
  dataPtr = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
  if([dataPtr length] == 0 ) return NO;
  return YES;
}

//回到最初始化加载的loading.jsbundle
- (BOOL) backToLoadingPanel {
  NSURL *jsCodeLocation ;
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"loading" withExtension:@"jsbundle"];
  [self mainUIShowNSURL:jsCodeLocation : DEFAULT_MODULE_NAME];
  return YES;
}

//不负责资源是否可以用
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
- (BOOL) _downloadAndRun : (NSString*) url : (NSString*) moduleName {
  
  NSString *savefileName = [moduleName stringByAppendingString:@".jsbundle"];
  NSString *documentPath = [self applicationDocumentsDirectory];

  //下载文件，从URL下载
  NSURL *urlLocation = [NSURL URLWithString:url];
  if( NO == [self checkURL:urlLocation ]) {
    return NO;
  }
  
  NSLog(@"download length %ld",[dataPtr length]);
  NSString *path = [[documentPath stringByAppendingString:@"/"] stringByAppendingString:savefileName];
  [dataPtr writeToFile:path atomically:YES];
  return [self showLocalModuleApp:moduleName];
}

- (BOOL) refreshApplicationViewWithUrl : (NSString*) url : (NSString*) moduleName {
  if( NO == [self checkURL:[NSURL URLWithString:url]]) {
    return NO;
  }
  
  NSURL *jsCodeLocation = [NSURL URLWithString:url];
  [self mainUIShowNSURL:jsCodeLocation :moduleName ];
  return YES;
}


- (BOOL) showLocalModuleApp : (NSString*) moduleName {
    NSString *savefileName = [moduleName stringByAppendingString:@".jsbundle"];
    NSString *rootPath = [self applicationDocumentsDirectory];
    NSString *jsPath = [[rootPath stringByAppendingString:@"/"] stringByAppendingString:savefileName];
    NSURL *jsCodeLocation ;
    jsCodeLocation = [NSURL fileURLWithPath:jsPath];
    NSData *data = [NSData dataWithContentsOfURL:jsCodeLocation];
    if([data length] == 0) {
      return NO;
    }
    [self mainUIShowNSURL:jsCodeLocation :moduleName ];
    return YES;
}

RCT_EXPORT_METHOD(downloadAndRun : (NSString*) url : (NSString*) moduleName : (RCTResponseSenderBlock) callback)
{
  NSLog(@"Download And run %@",url);
  if( NO == [self _downloadAndRun : url:moduleName]){
    callback(@[[NSNull null]]);
  }
}

RCT_EXPORT_METHOD(loadFromUrl : (NSString*) url : (NSString*) moduleName : (RCTResponseSenderBlock) callback)
{
  if( NO == [self refreshApplicationViewWithUrl:url:moduleName]) {
      callback(@[[NSNull null]]);
  }
}

//js回调，返回主界面
RCT_EXPORT_METHOD(backToBase : (RCTResponseSenderBlock) callback){
  if(NO == [self backToLoadingPanel]) {
      callback(@[[NSNull null]]);
  }
}

RCT_EXPORT_METHOD(loadFromLocal : (NSString*) moduleName : (RCTResponseSenderBlock) callback) {
  if(NO == [self showLocalModuleApp:moduleName] ){
      callback(@[[NSNull null]]);
  }
}

RCT_EXPORT_METHOD(simpleTest)
{
  NSLog(@"This is only a simple test ...");
}



@end
