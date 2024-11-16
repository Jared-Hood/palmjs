import { Palmjs } from './palmjs.js';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock the DOM
beforeEach(() => {
  document.body.innerHTML =
    '<div id="map-container" style="width: 500px; height: 500px;"></div>';
});

describe('Palmjs', () => {
  it('should render map tiles correctly', () => {
    new Palmjs('map-container', {
      latitude: 51.5,
      longitude: -0.15,
      zoom: 10,
    });

    const mapElement = document.getElementById('map-container');
    expect(mapElement).toBeTruthy();

    // Check that the map container has tiles
    const tiles = mapElement!.querySelectorAll('img');
    expect(tiles.length).toBeGreaterThan(0);

    // Verify one of the tiles has a correct source
    const firstTile = tiles[0] as HTMLImageElement;
    expect(firstTile.src).toMatch(
      /https:\/\/tile\.openstreetmap\.org\/\d+\/\d+\/\d+\.png/,
    );
  });

  it('should throw an error if the container element is missing', () => {
    expect(() => {
      new Palmjs('missing-container', {
        latitude: 51.5,
        longitude: -0.15,
        zoom: 10,
      });
    }).toThrowError(
      "Element with id 'missing-container' not found in the DOM.",
    );
  });
});
