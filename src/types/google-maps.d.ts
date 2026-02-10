export {};

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
        fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getCenter(): LatLng;
        getZoom(): number;
        panTo(latLng: LatLng | LatLngLiteral): void;
      }
      class Marker {
        constructor(opts?: MarkerOptions);
      }
      class LatLngBounds {
        constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
        extend(point: LatLng | LatLngLiteral): LatLngBounds;
      }
      namespace Animation {
        const BOUNCE: number;
        const DROP: number;
      }
      namespace SymbolPath {
        const CIRCLE: number;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        styles?: MapTypeStyle[];
      }

      interface MarkerOptions {
        position: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: any;
        animation?: any;
      }

      interface LatLng {
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: object[];
      }
    }
  }
}
