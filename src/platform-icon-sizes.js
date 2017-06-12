/* jshint node:true, esversion: 6 */

module.exports = {
  ios: {
    sizes: [
      { size: 40,  id: 'icon-40' },
      { size: 57,  id: 'icon' },
      { size: 80,  id: 'icon-40@2x' },
      { size: 120, id: 'icon-40@3x' },
      { size: 60,  id: 'icon-60' },
      { size: 120, id: 'icon-60@2x' },
      { size: 180, id: 'icon-60@3x' },
      { size: 114, id: 'icon@2x' },
      { size: 29,  id: 'icon-small' },
      { size: 58,  id: 'icon-small@2x' },
      { size: 87,  id: 'icon-small@3x' },
      { size: 152, id: 'icon-76@2x' },
      { size: 76,  id: 'icon-76' },
      { size: 72,  id: 'icon-72' },
      { size: 144, id: 'icon-72@2x' },
      { size: 50,  id: 'icon-50' },
      { size: 100, id: 'icon-50@2x' },
      { size: 167, id: 'icon-83.5@2x' }
    ]
  },

  android: {
    sizes: [
      { size: 36,  id: 'ldpi' },
      { size: 48,  id: 'mdpi' },
      { size: 72,  id: 'hdpi' },
      { size: 96,  id: 'xhdpi' },
      { size: 144, id: 'xxhdpi' },
      { size: 192, id: 'xxxhdpi' }
    ]
  },

  blackberry: {
    sizes: [
      { size: 86,  id: 'icon-86' },
      { size: 150, id: 'icon-150' }
    ]
  },

  windows: {
    sizes: [
      { size: 50,  id: 'StoreLogo' },
      { size: 30,  id: 'smalllogo', attrs: { target: 'Square30x30Logo' }},
      { size: 44,  id: 'Square44x44Logo' },
      { size: 70,  id: 'Square70x70Logo' },
      { size: 71,  id: 'Square71x71Logo' },
      { size: 150, id: 'Square150x150Logo' },
      { size: 310, id: 'Square310x310Logo' }
    ]
  }
};
