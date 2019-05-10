# ACPaaS Branding

This project contains ACPaaS' digital styling and styling guidelines. It is the starting point to style your app or website for ACPaaS.

## Getting started

In its simplest form you can just include the following line in the `<head>` section of your app.

```
<link rel="stylesheet" href="https://cdn.antwerpen.be/acpaas_branding_scss/3.2.1/main.min.css">
```

You can even import it directly in your (S)CSS:

```
@import url("https://cdn.antwerpen.be/acpaas_branding_scss/3.2.1/main.min.css");
```

> We adopt semantic versioning. If you want to use another version of the ACPaaS Branding you can do so by adjusting the version in the URL address. See the changelog for all available versions.

You can also install everything with npm:

npm install @a-ui/acpaas --save

## Development

### Prerequisites

In order to run this project and see all available components, you'll need to have [NodeJS](https://nodejs.org) and [Gulp](http://gulpjs.com) installed.

### Installing

Go to the root of this project and run the following command in your command line:

```
npm install
```

Then, you can import everything in your Sass setup (`main.min.css` also available):

```
@import '@a-ui/acpaas/dist/main.css';
```

In order to extend our style kit you can make use of our Sass variables. Import them like this:

```
@import '@a-ui/acpaas/dist/assets/styles/_quarks.scss';
```

### Local development

Run the following command in your command line:

```
gulp server
```

### Building

Run the following command in your command line:

```
gulp build
```

### Creating your own customized build

To apply your own style to the kit, import it into your project and use the accompanied `.scss` files. You will be able to overwrite our variables (for colors, spacing, etc.) with your own.

> Look for the `_quarks.colors.scss` and `_quarks.variables.scss` files to see all variables you can overwrite.

## Contributing

// For now, contact us via [branding@stad.antwerpen.be](mailto:branding@stad.antwerpen.be).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/a-ui/acpaas_branding_scss/tags).

## Authors

* **Tom Wuyts** - *Initial work, UX designer*
* **Jasper Van Proeyen** - *Initial work, lead developer*

See also the list of [contributors](https://github.com/a-ui/acpaas_branding_scss/contributors) who participated in this project.

## License

This project is licensed under a modified version of the MIT license. See the [LICENSE.md](LICENSE.md) file for details.
