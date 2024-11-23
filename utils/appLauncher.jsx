// utils/appLauncher.js

// Define app configurations for different platforms
const appConfigs = {
    calculator: {
      desktop: {
        windows: {
            protocol: 'ms-calculator:', // Windows 10/11 calculator protocol
            fallback: 'calc.exe'
          },
        macos: 'calculator.app',
        linux: 'gnome-calculator'
      },
      mobile: {
        android: 'com.android.calculator2',
        ios: 'calculator://'
      },
      web: 'https://www.calculator.net'
    },
    facebook: {
      desktop: {
        windows: 'https://www.facebook.com',
        macos: 'https://www.facebook.com',
        linux: 'https://www.facebook.com'
      },
      mobile: {
        android: 'com.facebook.katana',
        ios: 'fb://'
      },
      web: 'https://www.facebook.com'
    },
    twitter: {
      desktop: {
        windows: 'https://www.twitter.com',
        macos: 'https://www.twitter.com',
        linux: 'https://www.twitter.com'
      },
      mobile: {
        android: 'com.twitter.android',
        ios: 'twitter://'
      },
      web: 'https://www.twitter.com'
    },
    maps: {
      desktop: {
        windows: 'https://www.google.com/maps',
        macos: 'maps://',
        linux: 'https://www.google.com/maps'
      },
      mobile: {
        android: 'com.google.android.apps.maps',
        ios: 'maps://'
      },
      web: 'https://www.google.com/maps'
    },
    instagram: {
      desktop: {
        windows: 'https://www.instagram.com',
        macos: 'https://www.instagram.com',
        linux: 'https://www.instagram.com'
      },
      mobile: {
        android: 'com.instagram.android',
        ios: 'instagram://'
      },
      web: 'https://www.instagram.com'
    },
    spotify: {
      desktop: {
        windows: 'spotify:',
        macos: 'spotify:',
        linux: 'spotify:'
      },
      mobile: {
        android: 'com.spotify.music',
        ios: 'spotify:'
      },
      web: 'https://open.spotify.com'
    },
    whatsapp: {
      desktop: {
        windows: 'whatsapp://',
        macos: 'whatsapp://',
        linux: 'https://web.whatsapp.com'
      },
      mobile: {
        android: 'com.whatsapp',
        ios: 'whatsapp://'
      },
      web: 'https://web.whatsapp.com'
    },
    netflix: {
      desktop: {
        windows: 'netflix://',
        macos: 'netflix://',
        linux: 'https://www.netflix.com'
      },
      mobile: {
        android: 'com.netflix.mediaclient',
        ios: 'nflx://'
      },
      web: 'https://www.netflix.com'
    },
    gmail: {
      desktop: {
        windows: 'https://mail.google.com',
        macos: 'googlegmail:',
        linux: 'https://mail.google.com'
      },
      mobile: {
        android: 'com.google.android.gm',
        ios: 'googlegmail://'
      },
      web: 'https://mail.google.com'
    },
    telegram: {
      desktop: {
        windows: 'tg://',
        macos: 'tg://',
        linux: 'https://web.telegram.org'
      },
      mobile: {
        android: 'org.telegram.messenger',
        ios: 'tg://'
      },
      web: 'https://web.telegram.org'
    }
    // Add more apps as needed
  };
  
  // Detect the operating system
  const getOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/android/i.test(userAgent)) return 'android';
    if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios';
    if (/windows/i.test(userAgent)) return 'windows';
    if (/macintosh/i.test(userAgent)) return 'macos';
    if (/linux/i.test(userAgent)) return 'linux';
    return 'unknown';
  };
  
  const isMobile = () => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      window.navigator.userAgent.toLowerCase()
    );
  };
  
  const launchWindowsApp = async (appConfig) => {
    const { protocol, fallback } = appConfig;
    console.log('Launching Windows app:', protocol, fallback);
    
    // Try protocol first
    if (protocol) {
      try {
        const protocolCheck = await new Promise((resolve) => {
          const handleProtocolResponse = () => {
            window.removeEventListener('blur', handleProtocolResponse);
            setTimeout(() => window.removeEventListener('focus', handleProtocolFailure), 2000);
            resolve(true);
          };
  
          const handleProtocolFailure = () => {
            resolve(false);
          };
  
          window.addEventListener('blur', handleProtocolResponse);
          window.addEventListener('focus', handleProtocolFailure);
          
          window.location.href = protocol;
        });
  
        if (protocolCheck) return true;
      } catch (error) {
        console.log('Protocol launch failed:', error);
      }
    }
  
    // // Try ActiveX as fallback for older Windows versions
    // if (fallback && window.ActiveXObject) {
    //   try {
    //     const shell = new ActiveXObject('WScript.Shell');
    //     shell.Run(fallback);
    //     return true;
    //   } catch (error) {
    //     console.log('ActiveX launch failed:', error);
    //   }
    // }
  
    return false;
  };
  
  const launchNativeApp = async (appConfig) => {
    const os = getOS();
    const platform = isMobile() ? 'mobile' : 'desktop';
    const appPath = appConfig[platform][os];
  
    if (!appPath) {
      window.open(appConfig.web, '_blank');
      return;
    }
  
    let launched = false;
  
    if (platform === 'mobile') {
      // if (os === 'android') {
      //   // Try to launch Android app using intent
      //   const intent = `intent://#Intent;package=${appPath};scheme=app;end`;
      //   window.location.href = intent;
      //   launched = true;
      // } else if (os === 'ios') {
      //   // Try to launch iOS app using URL scheme
      //   window.location.href = appPath;
      //   launched = true;
      // }
      window.open(appConfig.web, '_blank');
    } else {
      // For desktop apps
      if (os === 'windows') {
        launched = await launchWindowsApp(appPath);
      } else if (os === 'macos') {
        try {
          window.location.href = appPath;
          launched = true;
        } catch (error) {
          console.log('macOS launch failed:', error);
        }
      }
    }
  
    // Fallback to web version if native launch fails
    if (!launched) {
      window.open(appConfig.web, '_blank');
    }
  };
  
  // Main function to open apps
  export const openApp = async (appName) => {
    try {
      const appConfig = appConfigs[appName.toLowerCase()];
      console.log('Opening app:', appConfig);
      if (!appConfig) {
        throw new Error(`App "${appName}" not supported`);
      }
  
      // Check if the app can be launched as a PWA
    //   if ('launchQueue' in window && 'LaunchParams' in window) {
    //     // PWA launch attempt
    //     window.launchQueue.setConsumer(async (launchParams) => {
    //       try {
    //         await window.navigator.launch(appName);
    //         return true;
    //       } catch (error) {
    //         console.log('PWA launch failed, trying native app...');
    //         launchNativeApp(appConfig);
    //       }
    //     });
    //   } else {
        // Direct native app launch attempt
        launchNativeApp(appConfig);
    //   }
  
      return true;
    } catch (error) {
      console.error('Error opening app:', error);
      return false;
    }
  };
  
  // Helper function to check if an app is installed (for Android)
  export const isAppInstalled = async (packageName) => {
    try {
      if ('getInstalledRelatedApps' in navigator) {
        const relatedApps = await navigator.getInstalledRelatedApps();
        return relatedApps.some(app => app.id === packageName);
      }
      return false;
    } catch (error) {
      console.error('Error checking app installation:', error);
      return false;
    }
  };