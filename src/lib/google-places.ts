import { siteConfig } from './constants';

// --- Interfaces ---

interface GooglePlaceSchedule {
  weekdays: string;
  friday: string;
  weekend: string;
}

interface GooglePlacePeriod {
  day: number;
  openTime: string;
  closeTime: string;
}

interface GooglePlaceReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl: string;
}

export interface GooglePlaceData {
  rating: number;
  reviewCount: number;
  schedule: GooglePlaceSchedule;
  openingHours: {
    periods: GooglePlacePeriod[];
  };
  reviews: GooglePlaceReview[];
  googleMapsUri: string;
  businessStatus: string;
}

// --- Fallback ---

const fallback: GooglePlaceData = {
  rating: siteConfig.rating,
  reviewCount: 0,
  schedule: { ...siteConfig.schedule },
  openingHours: { periods: [] },
  reviews: [],
  googleMapsUri: siteConfig.googleMapsUrl,
  businessStatus: 'OPERATIONAL',
};

// --- Parsing helpers ---

function parseSchedule(
  weekdayDescriptions: string[] | undefined
): GooglePlaceSchedule {
  if (!weekdayDescriptions || weekdayDescriptions.length < 7) {
    return { ...siteConfig.schedule };
  }

  const extractTime = (desc: string): string => {
    const colonIdx = desc.indexOf(': ');
    const time = colonIdx !== -1 ? desc.slice(colonIdx + 2) : desc;
    return time
      .replace(/\u2013/g, ' - ') // en-dash → " - "
      .replace(/,\s*/g, ' y '); // ", " → " y "
  };

  return {
    weekdays: extractTime(weekdayDescriptions[0]), // lunes (same as L-J)
    friday: extractTime(weekdayDescriptions[4]),
    weekend: extractTime(weekdayDescriptions[5]), // sábado
  };
}

function parsePeriods(
  periods:
    | Array<{
        open?: { day?: number; hour?: number; minute?: number };
        close?: { day?: number; hour?: number; minute?: number };
      }>
    | undefined
): GooglePlacePeriod[] {
  if (!periods) return [];

  return periods.map((period) => ({
    day: period.open?.day ?? 0,
    openTime: `${String(period.open?.hour ?? 0).padStart(2, '0')}:${String(period.open?.minute ?? 0).padStart(2, '0')}`,
    closeTime: `${String(period.close?.hour ?? 0).padStart(2, '0')}:${String(period.close?.minute ?? 0).padStart(2, '0')}`,
  }));
}

function parseReviews(
  reviews:
    | Array<{
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
      }>
    | undefined
): GooglePlaceReview[] {
  if (!reviews) return [];

  return reviews.map((review) => ({
    authorName: review.authorAttribution?.displayName ?? 'Anónimo',
    rating: review.rating ?? 5,
    text: review.text?.text ?? '',
    relativeTime: review.relativePublishTimeDescription ?? '',
    profilePhotoUrl: review.authorAttribution?.photoUri ?? '',
  }));
}

// --- Main function ---

export async function getGooglePlaceData(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'rating,userRatingCount,regularOpeningHours,reviews,googleMapsUri,businessStatus',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) throw new Error(`Places API: ${res.status}`);

    const data = await res.json();

    return {
      rating: data.rating ?? siteConfig.rating,
      reviewCount: data.userRatingCount ?? 0,
      schedule: parseSchedule(data.regularOpeningHours?.weekdayDescriptions),
      openingHours: {
        periods: parsePeriods(data.regularOpeningHours?.periods),
      },
      reviews: parseReviews(data.reviews),
      googleMapsUri: data.googleMapsUri ?? siteConfig.googleMapsUrl,
      businessStatus: data.businessStatus ?? 'OPERATIONAL',
    };
  } catch {
    return fallback;
  }
}

// --- Wrapper for edge runtime (OG/Twitter images) ---

interface GoogleRating {
  rating: number;
  reviewCount: number;
}

export async function getGoogleRating(): Promise<GoogleRating> {
  const data = await getGooglePlaceData();
  return { rating: data.rating, reviewCount: data.reviewCount };
}
