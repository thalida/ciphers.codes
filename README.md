# tangular-seed - A Fork of [angular-seed](https://github.com/angular/angular-seed)

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.

You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.

## Getting Started

### Clone angular-seed

Clone the angular-seed repository using [git][git]:

```
git clone https://github.com/thalida/angular-seed.git
cd angular-seed
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

```
npm install
bower install
```

### Running the Application

#### In Development
We have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
gulp
```

Now browse to the app at `http://localhost:8000`.

#### In Production

This really depends on how complex your app is and the overall infrastructure of your system, but the general rule is that all you need in production are all the files under the `app/` directory. Everything else should be omitted.

## Directory Layout

```
app/                            --> The source files for the angular app
  assets/                       --> Global scss, images, audio, etc
    sass/                       --> Global/general scss
      app.scss                  --> Default stylesheet w/ imports to ALL other styles
      globals.scss              --> Styles for general elements like body, a, h1, etc
      mixins.scss               --> SCSS file for all mixins and placeholders
  components/                   --> All the app specific directives, services, factories
    helloworld/                 --> Helloworld Component Files
      helloworld.directive.js   --> Helloworld directive logic
      helloworld.html           --> Helloworld template used by the directive
  views/
    view1/                      --> The View1 view template + logic
      view1.controller.js       --> The controller logic
      view1.html                --> The view1 partial template
      view1.scss                --> The specific stylesheet
    view2/                      --> The View2 view template + logic
      view2.controller.js       --> The controller logic
      view2.html                --> The partial template
      view2.scss                --> The specific stylesheet
  app.js                        --> The main app module
  index.html                    --> The main html app template
```

## Updating Angular

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
