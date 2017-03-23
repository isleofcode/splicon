Splicon (beta)
--------------
[![Build
Status](https://travis-ci.org/isleofcode/splicon.svg?branch=master)](https://travis-ci.org/isleofcode/splicon)

Splicon is a command-line tool and library for generating icons and splash
screens for Cordova projects. It generates the images for each platform's
required sizes using a single source SVG and updates the project's config.xml.

It was originally built for use in [ember-cordova](https://github.com/isleofcode/ember-cordova).

It is built for Node 0.12+ but may work on earlier versions.

## Icons

For an integration example, see the [ember-cordova `make-icon` command](https://github.com/isleofcode/ember-cordova/tree/master/lib/commands/make-icons.js).

Using the CLI, from your Cordova project, run:

```
 splicon-icons
```

This command will:

1. Look for a file called 'icon.svg';
2. Resize the SVG for each required platform/icon combination;
3. Move the icons to res/icons/platformName (and create the dir if it does not
   exist);
4. Update your config.xml to represent the new icons & paths;
5. Ensure there are no duplicate icon nodes in config.xml;

By default, images for all platforms will be generated. To generate images for
specific platforms you can pass the platforms as arguments:

```
splicon-icons ios android windows
```

For more granular control (such as setting the destination path), you
will need to require src/icon-task and run the function yourself.

There is a TODO to enhance CLI flag, but in most cases this is handled in
[ember-cordova](https://github.com/isleofcode/ember-cordova).

## Splash Screens

```
splicon-splashes
```

Like `splicon-icons`, by default images for all platforms will be generated. To
generate images for specific platforms you can pass the platforms as arguments:

```
splicon-splashes ios
```

## Testing

```
npm test
```

## Contributing

PRs are very welcome. You can read our style guides
[here](https://github.com/isleofcode/style-guide).

If you are unsure about your contribution idea, please feel free to open an
issue for feedback.

## Credits

[ember-cordova](https://github.com/isleofcode/ember-cordova) is maintained by
[Isle of Code](https://isleofcode.com) and was written by Alex Blom and Jordan
Yee based on work by Chris Thoburn and Alex Blom.
