/* jshint node:true, esversion: 6 */

module.exports = {
  ios: {
    sizes: [
      { width:  640, height:  960, id: '640-960' },
      { width:  960, height:  640, id: '960-640' },

      { width:  640, height: 1136, id: '640-1136' },
      { width: 1136, height:  640, id: '1136-640' },

      { width:  750, height: 1334, id: '750-1334' },
      { width: 1334, height:  750, id: '1334-750' },

      { width: 1242, height: 2208, id: '1242-2208' },
      { width: 2208, height: 1242, id: '2208-1242' },

      { width:  768, height: 1024, id: '768-1024' },
      { width: 1024, height:  768, id: '1024-768' },

      { width: 1536, height: 2048, id: '1536-2048' },
      { width: 2048, height: 1536, id: '2048-1536' },

      { width: 2048, height: 2732, id: '2048-2732' },
      { width: 2732, height: 2048, id: '2732-2048' },

      { width: 1125, height: 2436, id: '1125-2436' },
      { width: 2436, height: 1125, id: '2436-1125' }
    ]
  },

  android: {
    sizes: [
      { width:  200, height:  320, id: 'port-ldpi' },
      { width:  320, height:  200, id: 'land-ldpi' },

      { width:  320, height:  480, id: 'port-mdpi' },
      { width:  480, height:  320, id: 'land-mdpi' },

      { width:  480, height:  800, id: 'port-hdpi' },
      { width:  800, height:  480, id: 'land-hdpi' },

      { width:  720, height: 1280, id: 'port-xhdpi' },
      { width: 1280, height:  720, id: 'land-xhdpi' },

      { width:  960, height: 1600, id: 'port-xxhdpi' },
      { width: 1600, height:  960, id: 'land-xxhdpi' },

      { width: 1280, height: 1920, id: 'port-xxxhdpi' },
      { width: 1920, height: 1280, id: 'land-xxxhdpi' }
    ]
  }
};
