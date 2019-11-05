---
layout: post
title: Linking React Native to native code
img: images/2019-8-13-RN-Pinch-To-Zoom-img.jpg
---

Linking native code to React Native, piece of cake, right? After all it’s in the name. Wrong! I found it to be an unnecessarily complex and obscured process. 

Whilst trying to develop a camera application, I ran into some difficulty with the implementation of a rotate and crop function, solutions that could be achieved through the incorporation of external libraries took a noticeable toll on performance and speed, so it was time to go native. 

Turning to Google, I soon realised that not nearly enough has been written about how to implement native code alongside React Native. 

After an extended period of keyword assault, I found a pretty cool library that essentially holds your hand through the initial process of setting up a React to native bridge, called [react-native-create-bridge] (https://github.com/peggyrayzis/react-native-create-bridge), perfect for a native code novice (such as myself). I used this library in setting up my initial project and the focus of this article will be on how you can do the same too. 

### Getting started:

Install library using npm (or Yarn).

From the root of your React Native project, run react-native new-module in terminal.

When prompted by terminal, name your bridge module, here we will be using the name TestBridge.

You’re then given the option of creating a module and or a UI component, depending on what you would like to do in your native code, here we won’t be creating any UI components, so we just choose module.


![_config.yml]({{ site.baseurl }}/images/2019-11-05-Bridge-Output.png)


Next you will be asked to select the languages you will support – In this article we will choose Swift and Java, for iOS and android respectively and these languages will be the main focus of the article. 

Then when asked what directory to deliver JS files, just hit enter to go with the default.

At the end of this process you will have created, with the help of the react-native-create-bridge library, your native modules, in iOS and android, along with a TestBridgeNativeModule.js file which imports these modules using react-native’s Native Modules library.

Taking a closer look at the TestBridgeNativeModule.js file you should see that we are exporting an object that contains two properties, the first is a method named example method which returns another method also named exampleMethod being accessed from our TestBridge module. The other property inside the object holds the value of a constant named EXAMPLE_CONSTANT. Both these properties are being accessed from our native modules.

#### TestBridgeNativeModule.js

    import { NativeModules } from 'react-native'

    const { TestBridge } = NativeModules

    export default {
      exampleMethod () {
        return TestBridge.exampleMethod()
      },

      EXAMPLE_CONSTANT: TestBridge.EXAMPLE_CONSTANT
    }

## Moving on to the native side of things

### For iOS/Swift

Firstly, you will need to add the files manually to your project in Xcode. 

Right click on the folder with your app name and select Add Files to YourApp then select the .m .h and .swift files and click add.

When asked if you would like to create another bridging header file, click yes, then copy and paste the code from the .h file you’ve just added into your newly created header file.

The .swift file is where we will be writing most of our code, the .m file is where the code will be exported (using objective-C) to React (JS) and the bridging header file, as the name suggests is what connects these two.

In our .swift file you will notice that we have two functions that map perfectly to the functions that we saw in React, constants to export and example method.

The constantsToExport method is for exporting constants from native code to React, this is a one-way street, and the example method handles all of the functional capabilities of our module. This method is capable of receiving arguments from React and returning properties (using a callback function).

Now we will go on and add some parameters to our function, and this is where things get tricky. 

The first parameter in the function must have an argument name, if you have no need for an argument name then you must add an underscore _ followed by a space before the parameter name. 

#### TestBridge.swift

    @objc(TestBridge)
    class TestBridge : NSObject {
      // Export constants to use in your native module
      override func constantsToExport() -> [String : Any]! {
        return ["EXAMPLE_CONSTANT": "example"]
      }

      // Implement methods that you want to export to the native module
      @objc func exampleMethod(_ name : String) {
        // write method here
      }
    }


You must also clearly define the parameter type for all parameters. 

Subsequent parameters do not need an argument name.

After setting up our .swift method, you will now you go into the .m file and edit RCT_EXTERN_METHOD to reflect these changes.

This is done by adding a space followed by a parenthesis which is then followed by your first parameters type in brackets, and finally, the parameter name itself.

#### TestBridge.m

    RCT_EXTERN_METHOD(exampleMethod : (NSString)name)


Remember, the .m file is written in Objective C so the type will have to be an ObjC type, in our case, NSString.

Any subsequent parameters will be entered with an argument name (identical to the parameter name if no argument name was specified in your swift method) followed by a parenthesis and the parameter type in brackets, and finally the parameter name itself.

And that is how to pass data from React Native to Swift.

All you have to do is call your native method in React Native, passing in necessary arguments and the handle said arguments in your native module.

To pass data back from Swift to React you will need to pass in a callback function as one of your arguments in React Native and add it as a parameter in your Swift method, not forgetting to call the callback at the end of your method.

#### TestBridgeNativeModule.js


    export default {
      exampleMethod (name) {
        return TestBridge.exampleMethod(name, (err, newName) => console.log(newName);)
    } 


#### TestBridge.swift

    @objc func exampleMethod(_ name : String, callback: RCTResponseSenderBlock) {
        // write method here 
    callback([NSNull() ,newName])
     }


### Now for Android

Setting things up in Java for android is a lot more straightforward.

The react-native-create-bridge library creates a module.java file and a package.java file for us.
These files are responsible for exporting our native methods and constants.

The module.java file is where our example method and constants are defined. 

Go ahead and set up your function as you would a normal Java function, no tricks here.

Similar to iOS, in order to pass data back from Java to React you will need to access the callback function you passed in as an argument in React Native by adding it as a parameter in your module method, again, not forgetting to call the callback at the end of your method.

#### TestBridgeModule.java

    @ReactMethod
    public void exampleMethod (String name) {
        try {
                successCallback.invoke(name); //Callback to send data back to React native
        } catch (Exception e) {
                e.printStackTrace();
            }    
    }

To round up all you need to do is import and add your package to the get packages function in MainApplication.java and voila.

#### MainApplication.java

    @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
           new MainReactPackage()
            new TestBridgePackage()
          );
        }
