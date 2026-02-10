# Food Bank Locator Feature

The Food Bank Locator allows users to find nearby emergency food assistance using their browser's geolocation.

## Setup Required

You must add a Google Maps API Key to your `.env` file for this feature to work correctly.

1.  Get an API Key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials).
2.  Enable **Places API (New)** and **Maps JavaScript API**.
3.  Add the key to your `.env` file:

```env
# Server-side key for Places API proxy
GOOGLE_MAPS_API_KEY=your_api_key_here

# Client-side key for Google Maps preview
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Components

- `src/app/components/locator/FoodBankLocator.tsx`: Main wrapper component.
- `src/app/components/locator/SearchContainer.tsx`: Handles search logic and state.
- `src/app/components/locator/MapPreview.tsx`: Displays the map with markers.
- `src/app/components/locator/LocationCard.tsx`: Displays individual results.

## API Route

- `src/app/api/locator/search/route.ts`: Secure proxy for Places API requests.
