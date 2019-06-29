package com.snapchat;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rnfs.RNFSPackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSharePackage(),
            new RNFetchBlobPackage(),
            new RNViewShotPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RNImgToBase64Package(),
            new RNGestureHandlerPackage(),
            new RNFSPackage(),
            new AndroidKeyboardAdjustPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
