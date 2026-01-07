import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Clínica Podológica Carrera - Podólogo en Móstoles';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0ea5e9',
          backgroundImage:
            'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 60px',
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: '#0ea5e9',
              borderRadius: '16px',
              marginBottom: '24px',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
              <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
              <path d="M16 17h4" />
              <path d="M4 13h4" />
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 700,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            Clínica Podológica Carrera
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Podólogo en Móstoles · Más de 15 años de experiencia
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 24,
              color: '#0ea5e9',
            }}
          >
            <span style={{ color: '#fbbf24' }}>★★★★★</span>
            <span>4.8 estrellas</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: '32px',
            color: 'white',
            fontSize: 20,
          }}
        >
          <span>📍 C. de la Carrera, 7 · Móstoles</span>
          <span>📞 912 26 88 58</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
