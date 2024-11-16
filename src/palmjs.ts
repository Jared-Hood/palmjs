interface MapOptions {
  latitude: number;
  longitude: number;
  zoom: number;
}

export class Palmjs {
  private latitude: number;
  private longitude: number;
  private zoom: number;
  private elementId: string;
  private mapElement: HTMLDivElement | null = null;
  private tileSize = 256;

  constructor(elementId: string, { latitude, longitude, zoom }: MapOptions) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
    this.elementId = elementId;

    this.validateInputs();
  }

  private validateInputs() {
    if (!this.elementId) {
      throw new Error("The 'elementId' parameter is required.");
    }
    const mapContainerElement = document.getElementById(this.elementId);

    if (!mapContainerElement) {
      throw new Error(
        `Element with id '${this.elementId}' not found in the DOM.`,
      );
    }

    if (
      typeof this.latitude !== 'number' ||
      typeof this.longitude !== 'number'
    ) {
      throw new Error('Latitude and Longitude must be numbers.');
    }

    if (typeof this.zoom !== 'number' || this.zoom <= 0) {
      throw new Error('Zoom must be a positive number.');
    }

    this.mapElement = document.createElement('div');
    this.mapElement.style.position = 'relative';
    this.mapElement.style.overflow = 'hidden';
    this.mapElement.style.width = '100%';
    this.mapElement.style.height = '100%';

    mapContainerElement.appendChild(this.mapElement);

    this.load();
  }

  private load(): void {
    if (!this.mapElement) return;

    const tileSize = 256;
    const centerTile = this.latLngToTile(
      this.latitude,
      this.longitude,
      this.zoom,
    );

    // Clear the map element
    this.mapElement.innerHTML = '';

    // Calculate visible tiles based on the container size
    const containerWidth = this.mapElement.clientWidth;
    const containerHeight = this.mapElement.clientHeight;
    const tilesHorizontally = Math.ceil(containerWidth / tileSize) + 1;
    const tilesVertically = Math.ceil(containerHeight / tileSize) + 1;

    for (
      let xOffset = -Math.floor(tilesHorizontally / 2);
      xOffset <= Math.floor(tilesHorizontally / 2);
      xOffset++
    ) {
      for (
        let yOffset = -Math.floor(tilesVertically / 2);
        yOffset <= Math.floor(tilesVertically / 2);
        yOffset++
      ) {
        const tileX = centerTile.x + xOffset;
        const tileY = centerTile.y + yOffset;
        this.addTile(
          tileX,
          tileY,
          this.zoom,
          xOffset * tileSize,
          yOffset * tileSize,
        );
      }
    }
  }

  private addTile(
    tileX: number,
    tileY: number,
    zoom: number,
    offsetX: number,
    offsetY: number,
  ): void {
    const tileUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;

    const img = document.createElement('img');
    img.src = tileUrl;
    img.style.position = 'absolute';
    img.style.left = `${offsetX + this.mapElement!.clientWidth / 2 - this.tileSize / 2}px`;
    img.style.top = `${offsetY + this.mapElement!.clientHeight / 2 - this.tileSize / 2}px`;
    img.style.width = `${this.tileSize}px`;
    img.style.height = `${this.tileSize}px`;

    this.mapElement!.appendChild(img);
  }

  private latLngToTile(lat: number, lng: number, zoom: number) {
    const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom));
    const y = Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
        ) /
          Math.PI) /
        2) *
        Math.pow(2, zoom),
    );
    return { x, y };
  }
}
