import { NextResponse } from 'next/server';

const GOOGLE_PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Server-side env var

export async function POST(request: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration error: Google Maps API Key missing' },
      { status: 500 }
    );
  }

  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and Longitude are required' },
        { status: 400 }
      );
    }

    // "searchText" is more flexible than "searchNearby" because it allows for 
    // broader query terms (pantry, soup kitchen) that might not map to a single strict category.
    const payload = {
      textQuery: "food pantry, food bank, soup kitchen, emergency food assistance",
      maxResultCount: 20,
      locationBias: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: 25000.0, // 25km radius
        },
      },
      rankPreference: 'DISTANCE', 
    };

    // Correct FieldMask header is critical for v1 API
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.name,places.displayName,places.formattedAddress,places.location,places.regularOpeningHours,places.rating,places.userRatingCount,places.websiteUri,places.googleMapsUri',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Places API Error:', errorText);
        // Pass the actual Google error back to the client for debugging
        return NextResponse.json({ error: `Google API Error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    
    // Transform to our internal type
    const places = (data.places || []).map((p: any) => ({
      id: p.name, // "places/PLACE_ID"
      name: p.displayName?.text || 'Unknown Name',
      formattedAddress: p.formattedAddress || 'Address unavailable',
      location: {
        lat: p.location?.latitude || 0,
        lng: p.location?.longitude || 0,
      },
      isOpenNow: p.regularOpeningHours?.openNow,
      rating: p.rating,
      userRatingCount: p.userRatingCount,
      websiteUri: p.websiteUri,
      googleMapsUri: p.googleMapsUri
    }));

    return NextResponse.json({ places });

  } catch (error) {
    console.error('Error in places proxy:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
