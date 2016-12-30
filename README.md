# Masonite

### A simple static website generator using HTML with light templating and Stylus for CSS preprocessing

Masonite is a simple static site generator. It uses HTML for templating (still kind of hacked together, but HTML5 should bring some real templating features to the table), and stylus for CSS preprocessing.

Feel free to hack around with it.

## Install

To install run

```
npm install masonite
```

## Run

Okay, here's the basic idea. We've got our assets organized in a variety of folder, and we'll be compiling our site into the `site/` folder. Here's how our directory looks:

```bash
.
├── bin
│   ├── build-pages.js
│   ├── build-styles.js
│   ├── watch-pages.js
│   ├── watch-public.js
│   └── watch-styles.js
├── content
│   ├── blog
│   ├── events
│   └── pages
│       ├── about.html
│       ├── bp
│       │   ├── index.html
│       │   └── sobre-nós.html
│       └── index.html
├── content-styles
├── layouts
│   ├── minimal.html
│   └── standard.html
├── layout-styles
│   ├── library
│   │   ├── colors.styl
│   │   ├── open-sans.styl
│   │   └── typography.styl
│   ├── minimal.styl
│   └── standard.styl
├── LICENSE.md
├── package.json
├── public
│   ├── fonts
│   │   └── open-sans
│   │       ├── open-sans-italic.woff
│   │       └── open-sans.woff
│   ├── images
│   │   └── weird.jpg
│   ├── javascripts
│   │   └── hello-js-world.js
│   └── stylesheets
├── README.md
└── site
    ├── about.html
    ├── bp
    │   ├── index.html
    │   └── sobre-nós.html
    ├── fonts
    │   └── open-sans
    │       ├── open-sans-italic.woff
    │       └── open-sans.woff
    ├── images
    │   └── weird.jpg
    ├── index.html
    ├── javascripts
    │   └── hello-js-world.js
    └── stylesheets
        ├── minimal.css
        └── standard.css
```

The `content/` folder and sub-folders contain our content. The `bin/` folder contains some build and watch commands. When we build various things, we're assembling content and compiling it into the `site/` folder

Looking at the `package.json` scripts is perhaps the most central place to understand what's happening. By the way, there are two dependencies. [chokidar](https://github.com/paulmillr/chokidar) for watching files, and [http-server](https://github.com/indexzero/http-server) for serving up the static files once they're compiled.

Let's take a look at those scripts:

```json
{
  "scripts": {
    "test": "npm run wreck && npm run start",
    "wreck": "rm -rf site",
    "build-public": "cp -R public/. site/",
    "build-pages": "node bin/build-pages.js",
    "build-styles": "node bin/build-styles.js",
    "build-blog": "",
    "build-events": "",
    "watch-public": "node bin/watch-public.js",
    "watch-pages": "node bin/watch-pages.js",
    "watch-styles": "node bin/watch-styles.js",
    "watch-blog": "",
    "watch-events": "",
    "build": "npm run build-public && npm run build-pages && npm run build-styles",
    "watch": "npm run watch-public & npm run watch-pages & npm run watch-styles & npm run serve",
    "serve": "http-server site",
    "start": "npm run build && npm run serve"
  }
}
```

1. For now `npm run test` simply wrecks the site and tries to start it up again.
2. `npm run wreck` simply deletes the `site/` folder.
3. `npm run build-public` copies the public `folder` (js, css, images, fonts...) into the `site/` folder.
4. `npm run build-pages` compiles content from the `content/pages/` folder with layouts from the `layouts/` folder and drops them into the `site/` folder. It does this multiple directories deep, in case you need language folders or something like that.
5. `npm run build-styles` runs `stylus` commands on the `layout-styles/` folder.
6. `npm run build-blog` and `npm run build-events` are just placeholders for now, as are their respective folders in `content/`.
7. `npm run watch-` commands essentially run the build commands as files change, get added, deleted, and as new folders are created, renamed, or removed.
8. `npm run build` runs all the build commands.
9. `npm run watch` does all the watch commands and serves up the site.
10. `npm run serve` spins up an `http-server` and serves the static site in the `site/` folder.
11. `npm run start` builds and serves the site, but doesn't watch.

That's the basic idea. It's still very early in its life. The code's messy, the dependencies are minimal and random. It's not very configurable. It's got plenty of room to grow.

Feedback, comments, and such are welcome.

