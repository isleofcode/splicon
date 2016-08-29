/* jshint node:true, esversion: 6 */

module.exports = {
  ios: {
    itemKey: 'width',
    items: [
      { size : 40,  name : 'icon-40' },
      { size : 57,  name : 'icon' },
      { size : 80,  name : 'icon-40@2x' },
      { size : 120, name : 'icon-40@3x' },
      { size : 60,  name : 'icon-60' },
      { size : 120, name : 'icon-60@2x' },
      { size : 180, name : 'icon-60@3x' },
      { size : 57,  name : 'icon' },
      { size : 114, name : 'icon@2x' },
      { size : 29,  name : 'icon-small' },
      { size : 58,  name : 'icon-small@2x' },
      { size : 87,  name : 'icon-small@3x' },
      { size : 152, name : 'icon-76@2x' },
      { size : 76,  name : 'icon-76' },
      { size : 72,  name : 'icon-72' },
      { size : 144, name : 'icon-72@2x' },
      { size : 50,  name : 'icon-50' },
      { size : 100, name : 'icon-50@2x' }
    ]
  },

  android: {
    itemKey: 'density',
    items: [
      { size : 36,  name : 'ldpi' },
      { size : 48,  name : 'mdpi' },
      { size : 72,  name : 'hdpi' },
      { size : 96,  name : 'xhdpi' },
      { size : 144, name : 'xxhdpi' },
      { size : 192, name : 'xxxhdpi' }
    ]
  },

  blackberry: {
    itemKey: 'src',
    items: [
      { size : 86,  name : 'icon-86' },
      { size : 150, name : 'icon-150' }
    ]
  },

  windows: {
    itemKey: 'width',
    items: [
      { size : 50,  name : 'StoreLogo' },
      { size : 30,  name : 'smalllogo', attrs: { target : 'Square30x30Logo' }},
      { size : 44,  name : 'Square44x44Logo' },
      { size : 70,  name : 'Square70x70Logo' },
      { size : 71,  name : 'Square71x71Logo' },
      { size : 150, name : 'Square150x150Logo' },
      { size : 310, name : 'Square310x310Logo' }
    ]
  }
};
