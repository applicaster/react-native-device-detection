import React, {
  PixelRatio,
  Platform,
  Dimensions
} from 'react-native';

const windowSize = Dimensions.get('window');

class DetectDeviceService {
  constructor() {
    this.pixelDensity = PixelRatio.get();
    this.width = windowSize.width;
    this.height = windowSize.height;
    this.adjustedWidth = this.width * this.pixelDensity;
    this.adjustedHeight = this.height * this.pixelDensity;
    
    this.isPhoneOrTabletOrTv();
    this.isIosOrAndroid();
    this.detectIphoneX();
  }

  isPhoneOrTabletOrTv() {
    if (Platform.isTV) {
      this.isTV = true;
      this.isTablet = false;
      this.isPhone = false;
      return;
    }

    // An Android device is considered a tablet if its smallest width >= 600dp (layout-sw600dp) 
    // source: https://developer.android.com/training/multiscreen/screensizes.html#TaskUseSWQuali
    if(Platform.OS === 'android') {
      this.isTablet = Math.min(this.width, this.height) >= 600;
    } else {
      if(this.pixelDensity < 2 && (this.adjustedWidth >= 1000 || this.adjustedHeight >= 1000)) {
        this.isTablet = true;
      } else if(this.pixelDensity === 2 && (this.adjustedWidth >= 1920 || this.adjustedHeight >= 1920)) {
        this.isTablet = true;
      } else {
        this.isTablet = false;
      }
    }
    this.isPhone = !this.isTablet;
  }
  
  isIosOrAndroid() {
    if(Platform.OS === 'ios') {
      this.isIos = true;
      this.isAndroid = false;
    } else {
      this.isIos = false;
      this.isAndroid = true;
    }
  }

  detectIphoneX(){
	 if( Platform.OS === 'ios' &&
		 !Platform.isTVOS &&
		 !Platform.isTVOS &&
		 (windowSize.height === 812 || windowSize.width === 812)) {
	 	this.isIphoneX = true;
	 } else {
	 	this.isIphoneX = false;
	 }

  }
}

module.exports = new DetectDeviceService();
