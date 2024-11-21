<p align="center">

![Palmjs's Logo](assets/logo.png)

</p>

<h1 align="center">Pretty Awesome Lightweight Maps</h1>

<div align="center">

[![npm](https://img.shields.io/npm/v/palmjs)](https://www.npmjs.com/package/palmjs)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/palmjs)](https://bundlephobia.com/package/palmjs)

</div>

Palmjs is a simple, lightweight library for embedding maps into your website. It leverages tile-based map rendering and supports custom tile layers, making it perfect for basic mapping needs without the overhead of larger libraries.

## Features

- Lightweight and easy to integrate.
- Supports custom tile layers.
- Automatically calculates visible tiles based on the container size.

## Installation

```bash
$ npm install palmjs
```

## Usage

**Basic map**

```html
<!-- Add element to html where map will be rendered. -->
<div id="map"></div>
```

```ts
// Initialize a new map with the given element id and map options.
new Palmjs('map', {
  latitude: 51.5,
  longitude: -0.15,
  zoom: 14,
});
```

![Basic map example](assets/basic_map.png 'Palmjs: Basic map example')

**Custom tile layer**

```ts
new Palmjs('map', {
  latitude: 51.5,
  longitude: -0.15,
  zoom: 14,
  tileLayerUrl:
    'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=[YOUR_TOKEN]',
});
```

![Custom tile layer example](assets/custom_tile_layer.png 'Palmjs: Custom tile layer example')

## API Reference

| Parameter   | Type         | Description                                                     | Required |
| ----------- | ------------ | --------------------------------------------------------------- | -------- |
| `elementId` | `string`     | The ID of the container element where the map will be rendered. | Yes      |
| `options`   | `MapOptions` | Configuration options for the map (see MapOptions interface).   | Yes      |

**MapOptions Interface**
| Parameter | Type | Description | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
`latitude` | `number` | The initial latitude of the map. | Yes |
`longitude` | `number` | The initial longitude of the map. | Yes |
`zoom` | `number` | The initial zoom level of the map (must be a positive number). | Yes |
`tileLayerUrl` | `string` | The URL template for the map tiles. Use {x}, {y}, and {z} as placeholders for the tile coordinates and zoom. | No | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` |

[npm-url]: https://npmjs.org/package/palmjs
[downloads-image]: https://img.shields.io/npm/dm/palmjs.svg

## Roadmap

- [ ] Add map panning and zooming
- [ ] Add support for markers
- [ ] Add test coverage with coveralls

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
