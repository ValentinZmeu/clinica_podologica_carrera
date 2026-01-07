import { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, ArrowLeft } from 'lucide-react';

import { PageHero } from '@/components/layout/page-hero';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Cookies | Clínica Podológica Carrera',
  description:
    'Política de cookies de Clínica Podológica Carrera. Información sobre las cookies que utilizamos en nuestro sitio web.',
  robots: 'noindex, follow',
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        badgeIcon={Cookie}
        title="Política de"
        titleHighlight="Cookies"
        description="Información sobre las cookies que utilizamos en este sitio web."
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="legal-content">
              <p className="!text-sm !text-muted-foreground !mb-8">
                Última actualización: Enero 2025
              </p>

              <h2>1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web
                almacenan en tu dispositivo (ordenador, tablet o móvil) cuando
                los visitas. Se utilizan ampliamente para hacer que los sitios
                web funcionen de manera más eficiente y proporcionar información
                a los propietarios del sitio.
              </p>

              <h2>2. ¿Qué Cookies Utilizamos?</h2>
              <p>
                En {siteConfig.name} utilizamos los siguientes tipos de cookies:
              </p>

              <h3>2.1. Cookies Técnicas (Necesarias)</h3>
              <p>
                Son esenciales para el funcionamiento del sitio web y no pueden
                ser desactivadas. Generalmente se establecen en respuesta a
                acciones realizadas por ti, como establecer tus preferencias de
                privacidad o completar formularios.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Duración</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>cookieconsent_status</td>
                    <td>1 año</td>
                    <td>Almacena tu preferencia sobre cookies</td>
                  </tr>
                </tbody>
              </table>

              <h3>2.2. Cookies Analíticas</h3>
              <p>
                Estas cookies nos permiten contar las visitas y fuentes de tráfico
                para poder medir y mejorar el rendimiento de nuestro sitio.
                Utilizamos Google Analytics para este propósito.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Duración</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_ga</td>
                    <td>2 años</td>
                    <td>
                      Utilizada por Google Analytics para distinguir usuarios
                    </td>
                  </tr>
                  <tr>
                    <td>_ga_*</td>
                    <td>2 años</td>
                    <td>
                      Utilizada por Google Analytics para mantener el estado de
                      la sesión
                    </td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td>24 horas</td>
                    <td>
                      Utilizada por Google Analytics para distinguir usuarios
                    </td>
                  </tr>
                  <tr>
                    <td>_gat</td>
                    <td>1 minuto</td>
                    <td>
                      Utilizada por Google Analytics para limitar la velocidad
                      de las solicitudes
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3>2.3. Cookies de Terceros</h3>
              <p>
                Este sitio incluye un mapa de Google Maps. Al cargar el mapa,
                Google puede establecer cookies en tu dispositivo. Para más
                información, consulta la{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad de Google
                </a>
                .
              </p>

              <h2>3. ¿Cómo Gestionar las Cookies?</h2>
              <p>
                Puedes configurar tu navegador para bloquear o alertarte sobre
                estas cookies, pero algunas partes del sitio podrían no funcionar
                correctamente.
              </p>
              <p>
                Aquí tienes enlaces a las instrucciones de gestión de cookies
                de los navegadores más comunes:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h2>4. Consentimiento</h2>
              <p>
                Al navegar por nuestro sitio web, aceptas el uso de cookies de
                acuerdo con esta política. Si no deseas que se establezcan cookies
                en tu dispositivo, puedes ajustar la configuración de tu navegador.
              </p>

              <h2>5. Más Información</h2>
              <p>
                Si tienes preguntas sobre nuestra política de cookies, puedes
                contactarnos en:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> {siteConfig.email}
                </li>
                <li>
                  <strong>Teléfono:</strong> {siteConfig.phone}
                </li>
              </ul>
              <p>
                Para más información sobre tus derechos, consulta nuestra{' '}
                <Link href="/privacidad">
                  Política de Privacidad
                </Link>
                .
              </p>

              <h2>6. Actualizaciones</h2>
              <p>
                Esta política de cookies puede actualizarse periódicamente.
                Te recomendamos revisarla de forma regular para estar informado
                sobre cómo utilizamos las cookies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
