#Splicon (beta)

Splicon is a command tool for automagically generating icons &
splash screens for Cordova applications from a single svg, and updating config.xml.

There is a cli, but can be included in other libraries. It was
originally built for use in [ember-cordova](https://github.com/isleofcode/ember-cordova).

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

##Contributing

PRs are very welcome. You can read our style guides [here](https://github.com/isleofcode/style-guide).

If you are unsure about your contribution idea, please feel free to
open an Issue for feedback.

##Credits

ember-cordova is maintained by [Isle of Code](https://isleofcode.com).
The library was written by Alex Blom, based on different half-baked
build tools by Chris Thoburn and Alex Blom.
