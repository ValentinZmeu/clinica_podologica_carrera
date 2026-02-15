import { siteConfig } from './constants';

interface GoogleRating {
  rating: number;
  reviewCount: number;
}

const fallback: GoogleRating = { rating: siteConfig.rating, reviewCount: 0 };

export async function getGoogleRating(): Promise<GoogleRating> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) throw new Error(`Places API: ${res.status}`);

    const data = await res.json();
    return {
      rating: data.rating ?? siteConfig.rating,
      reviewCount: data.userRatingCount ?? 0,
    };
  } catch {
    return fallback;
  }
}
