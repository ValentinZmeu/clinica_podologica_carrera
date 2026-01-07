import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

import { PageHero } from '@/components/layout/page-hero';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Clínica Podológica Carrera',
  description:
    'Política de privacidad y protección de datos de Clínica Podológica Carrera. Información sobre el tratamiento de tus datos personales.',
  robots: 'noindex, follow',
};

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        badgeIcon={Shield}
        title="Política de"
        titleHighlight="Privacidad"
        description="Información sobre el tratamiento de tus datos personales conforme al RGPD y la LOPD-GDD."
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

              <h2>1. Responsable del Tratamiento</h2>
              <ul>
                <li><strong>Identidad:</strong> Isabel Carrera</li>
                <li><strong>NIF:</strong> [NIF]</li>
                <li><strong>Dirección:</strong> {siteConfig.fullAddress}</li>
                <li><strong>Teléfono:</strong> {siteConfig.phone}</li>
                <li><strong>Email:</strong> [EMAIL_RGPD]</li>
              </ul>

              <h2>2. Datos Personales que Recopilamos</h2>
              <p>
                En {siteConfig.name}, recopilamos los siguientes datos personales
                cuando te pones en contacto con nosotros a través de teléfono,
                WhatsApp o email:
              </p>
              <ul>
                <li>Nombre y apellidos</li>
                <li>Número de teléfono</li>
                <li>Dirección de correo electrónico</li>
                <li>Motivo de la consulta</li>
              </ul>
              <p>
                Adicionalmente, cuando acudes a nuestra clínica como paciente,
                podemos recopilar datos de salud necesarios para la prestación
                del servicio podológico.
              </p>

              <h2>3. Finalidad del Tratamiento</h2>
              <p>Los datos personales se tratan con las siguientes finalidades:</p>
              <ul>
                <li>
                  <strong>Gestión de citas:</strong> Para contactarte y gestionar
                  tus citas en la clínica.
                </li>
                <li>
                  <strong>Atención sanitaria:</strong> Para elaborar tu historial
                  clínico y prestarte los servicios de podología solicitados.
                </li>
                <li>
                  <strong>Comunicaciones:</strong> Para responder a tus consultas
                  y enviarte información relacionada con tu tratamiento.
                </li>
              </ul>

              <h2>4. Base Legal del Tratamiento</h2>
              <ul>
                <li>
                  <strong>Ejecución de contrato:</strong> El tratamiento es
                  necesario para la prestación del servicio sanitario solicitado.
                </li>
                <li>
                  <strong>Obligación legal:</strong> Cumplimiento de la normativa
                  sanitaria que obliga a conservar historiales clínicos.
                </li>
                <li>
                  <strong>Consentimiento:</strong> Para el envío de comunicaciones
                  comerciales, si las hubiera.
                </li>
              </ul>

              <h2>5. Conservación de los Datos</h2>
              <p>
                Los datos personales se conservarán durante el tiempo necesario
                para cumplir con la finalidad para la que se recabaron y para
                determinar las posibles responsabilidades derivadas.
              </p>
              <p>
                Los historiales clínicos se conservarán durante un mínimo de
                5 años desde la última asistencia, conforme a la Ley 41/2002
                de Autonomía del Paciente.
              </p>

              <h2>6. Destinatarios de los Datos</h2>
              <p>
                Tus datos personales no serán cedidos a terceros, salvo
                obligación legal. No realizamos transferencias internacionales
                de datos.
              </p>

              <h2>7. Derechos del Interesado</h2>
              <p>Puedes ejercer los siguientes derechos:</p>
              <ul>
                <li><strong>Acceso:</strong> Conocer qué datos tratamos sobre ti.</li>
                <li><strong>Rectificación:</strong> Modificar datos inexactos.</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos.</li>
                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos.</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento.</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
              </ul>
              <p>
                Para ejercer estos derechos, puedes contactarnos en{' '}
                <strong>[EMAIL_RGPD]</strong> o en nuestra dirección postal,
                adjuntando copia de tu documento de identidad.
              </p>
              <p>
                También tienes derecho a presentar una reclamación ante la
                Agencia Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aepd.es
                </a>
                ).
              </p>

              <h2>8. Seguridad de los Datos</h2>
              <p>
                Hemos implementado medidas técnicas y organizativas apropiadas
                para proteger tus datos personales contra el acceso no autorizado,
                la pérdida o la destrucción.
              </p>

              <h2>9. Cookies</h2>
              <p>
                Este sitio web utiliza cookies. Para más información, consulta
                nuestra{' '}
                <Link href="/cookies">
                  Política de Cookies
                </Link>
                .
              </p>

              <h2>10. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar esta política de privacidad
                para adaptarla a novedades legislativas o jurisprudenciales.
                Te recomendamos revisar esta página periódicamente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
