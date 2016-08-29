#Splicon (beta)

Splicon is a command tool for automagically generating icons &
splash screens for Cordova applications from a single svg, and updating config.xml.

There is a cli, but can be included in other libraries. It was
originally built for use in [ember-cordova](https://github.com/isleofcode/ember-cordova).

It is built for node 0.12+, and probably works on lower.

##Icons

For an integration example, see [ember-cordovas make-icon command](https://github.com/isleofcode/ember-cordova/tree/master/lib/commands/make-icons.js).

Using the cli, from your cordova project, simply run:

```
 splicon-icons
```

This command will:

1. Look for a file called 'icon.svg';
2. Resize the SVG for each required platform/icon combination;
3. Move the icons to res/icons/platformName (and create the dir if it
   does not exist);
4. Update your config.xml to represent the new icons & paths;
5. Ensure there are no duplicate icon nodes in config.xml;

By default, all platforms will be generated. You can pass the platforms
you would like generated as arguments:

```
splicon icons ios android windows
```

For more granular control (such as setting the destination path), you
will need to require lib/icon-task and run the function yourself.

There is a TODO to enhance cli flag, but in most cases this is handled in [ember-cordova](https://github.com/isleofcode/ember-cordova).

##Splash
Not done yet, nearly there.

##Testing
A test suite is being implemented by Jordan Yee.

##A note on dependencies
One of the main dependencies of this library is
[svg2png](https://github.com/domenic/svg2png). Unfortunately
ember-cordova requires node 0.12+ support, where svg2png is 4+. Thus, splicon now ships with a babelfied version of svg2png in vendor.
There is a single modification to the source, seen [here](https://github.com/isleofcode/splicon/commit/647b2a7d931bc282da079c646e65adaf39f28bec).

This does not imply the packaged version of svg2png will support 0.12 in
other use cases, and is a stopgap solution.

##Contributing

PRs are very welcome. You can read our style guides [here](https://github.com/isleofcode/style-guide).

If you are unsure about your contribution idea, please feel free to
open an Issue for feedback.

##Credits

ember-cordova is maintained by [Isle of Code](https://isleofcode.com).
The library was written by Alex Blom, based on different half-baked
build tools by Chris Thoburn and Alex Blom.
