# vuetify-toolkit


<p align="left">
  <a href="https://travis-ci.org/kolesnikovav/vuetify-toolkit/master">
    <img alt="Travis (.org) branch" src="https://img.shields.io/travis/kolesnikovav/vuetify-toolkit/master?logo=travis">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-toolkit">
    <img alt="npm" src="https://img.shields.io/npm/v/vuetify-toolkit?color=blue&logo=npm">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-toolkit">
    <img alt="npm" src="https://img.shields.io/npm/dm/vuetify-toolkit?logo=npm">
  </a>
</p>

The set of additional vuetify components, for using with [vuetify.js](https://vuetifyjs.com/) library

## Live demo

See [Live demo & documentation](https://kolesnikovav.github.io/vuetify-toolkit/).


## Components

 - VDataGridSelect
 The selector with Tabular items presentation
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VCascader
 Cascade selection box
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VTreeSelect
 Selector for nested & tree like items
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VMdView
 Displaying any hierarchical data (like file explorer)
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)

## Installation

```
yarn add vuetify-toolkit
```
or
```
npm i vuetify-toolkit --save
```

### Basic usage

Change your src/plugins/vuetify.js file as follows
```
      import Vue from 'vue';
      import Vuetify from 'vuetify/lib';

      import {
        VTreeSelect,
        VCascader,
        VDataGridSelect,
        VMdView } from 'vuetify-toolkit/vuetify-toolkit.umd'
      Vue.use(Vuetify,{
          VTreeSelect,
          VCascader,
          VDataGridSelect,
          VMdView
      });
      export default new Vuetify({
        icons: {
        iconfont: 'mdi',
        },
      });
```
Then, you can use this components as

```
<template>
  <div>
    <v-tree-select>
      <!--  -->
    </v-tree-select>
    <v-cascader>
      <!--  -->
    </v-cascader>
    <v-data-grid-select>
      <!--  -->
    </v-data-grid-select>
    <v-md-view>
      <!--  -->
    </v-md-view>
  </div>
</template>
```

### Hello world example

[Here](https://github.com/kolesnikovav/testapp) is the sample project with vuetify-toolkit, built with [vue cli](https://cli.vuejs.org/)

### Contributing

Any help for this project are welcome.
Please read the [Contributing Guide](./CONTRIBUTING.md)