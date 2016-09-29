/* jshint node:true, esversion: 6 */

module.exports = {
  ios: {
    idAttributes: ['width', 'height'],
    sizes: [
      { width:  640, height:  960, name: '640-960' },
      { width:  960, height:  640, name: '960-640' },

      { width:  640, height: 1136, name: '640-1136' },
      { width: 1136, height:  640, name: '1136-640' },

      { width:  750, height: 1334, name: '750-1334' },
      { width: 1334, height:  750, name: '1334-750' },

      { width: 1242, height: 2208, name: '1242-2208' },
      { width: 2208, height: 1242, name: '2208-1242' },

      { width:  768, height: 1024, name: '768-1024' },
      { width: 1024, height:  768, name: '1024-768' },

      { width: 1536, height: 2048, name: '1536-2048' },
      { width: 2048, height: 1536, name: '2048-1536' },

      { width: 2048, height: 2732, name: '2048-2732' },
      { width: 2732, height: 2048, name: '2732-2048' }
    ]
  },

  android: {
    idAttributes: ['density'],
    sizes: [
      { width:  200, height:  320, name: 'port-ldpi' },
      { width:  320, height:  200, name: 'land-ldpi' },

      { width:  320, height:  480, name: 'port-mdpi' },
      { width:  480, height:  320, name: 'land-mdpi' },

      { width:  480, height:  800, name: 'port-hdpi' },
      { width:  800, height:  480, name: 'land-hdpi' },

      { width:  720, height: 1280, name: 'port-xhdpi' },
      { width: 1280, height:  720, name: 'land-xhdpi' },

      { width:  960, height: 1600, name: 'port-xxhdpi' },
      { width: 1600, height:  960, name: 'land-xxhdpi' },

      { width: 1280, height: 1920, name: 'port-xxxhdpi' },
      { width: 1920, height: 1280, name: 'land-xxxhdpi' }
    ]
  }
};
