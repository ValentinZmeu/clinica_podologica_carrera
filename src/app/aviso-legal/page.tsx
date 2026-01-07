import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

import { PageHero } from '@/components/layout/page-hero';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aviso Legal | Clínica Podológica Carrera',
  description:
    'Aviso legal e información sobre el titular del sitio web de Clínica Podológica Carrera.',
  robots: 'noindex, follow',
};

export default function AvisoLegalPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        badgeIcon={Scale}
        title="Aviso"
        titleHighlight="Legal"
        description="Información legal sobre el titular de este sitio web y condiciones de uso."
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

              <h2>1. Datos Identificativos</h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
                de Servicios de la Sociedad de la Información y Comercio Electrónico
                (LSSI-CE), se exponen a continuación los datos identificativos del
                titular del sitio web:
              </p>
              <ul>
                <li><strong>Titular:</strong> Isabel Carrera</li>
                <li><strong>NIF:</strong> [NIF]</li>
                <li><strong>Domicilio:</strong> {siteConfig.fullAddress}</li>
                <li><strong>Teléfono:</strong> {siteConfig.phone}</li>
                <li><strong>Email:</strong> {siteConfig.email}</li>
                <li><strong>Sitio web:</strong> {siteConfig.url}</li>
                <li><strong>Actividad:</strong> Servicios de podología</li>
              </ul>

              <h2>2. Objeto</h2>
              <p>
                El presente aviso legal regula el uso del sitio web{' '}
                <strong>{siteConfig.url}</strong>, del que es titular
                Isabel Carrera.
              </p>
              <p>
                La navegación por el sitio web atribuye la condición de usuario
                del mismo e implica la aceptación plena y sin reservas de todas
                y cada una de las disposiciones incluidas en este aviso legal.
              </p>

              <h2>3. Condiciones de Uso</h2>
              <p>
                El usuario se compromete a hacer un uso adecuado de los contenidos
                y servicios que se ofrecen en este sitio web, absteniéndose de:
              </p>
              <ul>
                <li>
                  Realizar actividades ilícitas o contrarias a la buena fe y
                  al orden público.
                </li>
                <li>
                  Difundir contenidos o propaganda de carácter racista, xenófobo,
                  pornográfico, de apología del terrorismo o atentatorio contra
                  los derechos humanos.
                </li>
                <li>
                  Provocar daños en los sistemas físicos y lógicos del sitio web,
                  de sus proveedores o de terceros.
                </li>
                <li>
                  Introducir o difundir virus informáticos o cualesquiera otros
                  sistemas que sean susceptibles de causar daños.
                </li>
                <li>
                  Intentar acceder y, en su caso, utilizar las cuentas de correo
                  electrónico de otros usuarios y modificar o manipular sus mensajes.
                </li>
              </ul>

              <h2>4. Propiedad Intelectual e Industrial</h2>
              <p>
                Todos los contenidos del sitio web, incluyendo, a título enunciativo
                pero no limitativo, textos, fotografías, gráficos, imágenes, iconos,
                tecnología, software, enlaces y demás contenidos audiovisuales o
                sonoros, así como su diseño gráfico y códigos fuente, son propiedad
                intelectual del titular o de terceros, sin que puedan entenderse
                cedidos al usuario ninguno de los derechos de explotación sobre
                los mismos más allá de lo estrictamente necesario para el correcto
                uso del sitio web.
              </p>
              <p>
                Las marcas, nombres comerciales o signos distintivos son titularidad
                del titular o de terceros, sin que pueda entenderse que el acceso
                al sitio web atribuye ningún derecho sobre los mismos.
              </p>

              <h2>5. Exclusión de Garantías y Responsabilidad</h2>
              <p>
                El titular no se hace responsable, en ningún caso, de los daños
                y perjuicios de cualquier naturaleza que pudieran ocasionar,
                a título enunciativo: errores u omisiones en los contenidos,
                falta de disponibilidad del sitio web o la transmisión de virus
                o programas maliciosos en los contenidos, a pesar de haber adoptado
                todas las medidas tecnológicas necesarias para evitarlo.
              </p>

              <h2>6. Enlaces</h2>
              <p>
                En el caso de que en el sitio web se dispusiesen enlaces o
                hipervínculos hacia otros sitios de Internet, el titular no
                ejercerá ningún tipo de control sobre dichos sitios y contenidos.
                En ningún caso asumirá responsabilidad alguna por los contenidos
                de algún enlace perteneciente a un sitio web ajeno, ni garantizará
                la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud,
                veracidad, validez y constitucionalidad de cualquier material o
                información contenida en ninguno de dichos hipervínculos u otros
                sitios de Internet.
              </p>

              <h2>7. Derecho de Exclusión</h2>
              <p>
                El titular se reserva el derecho a denegar o retirar el acceso
                al sitio web y/o los servicios ofrecidos sin necesidad de
                preaviso, a instancia propia o de un tercero, a aquellos usuarios
                que incumplan el presente aviso legal.
              </p>

              <h2>8. Generalidades</h2>
              <p>
                El titular perseguirá el incumplimiento de las presentes condiciones
                así como cualquier utilización indebida de su sitio web ejerciendo
                todas las acciones civiles y penales que le puedan corresponder
                en derecho.
              </p>

              <h2>9. Legislación Aplicable y Jurisdicción</h2>
              <p>
                La relación entre el titular y el usuario se regirá por la
                normativa española vigente. Para la resolución de cualquier
                controversia, las partes se someterán a los Juzgados y Tribunales
                del domicilio del usuario, salvo en los casos en que la normativa
                aplicable establezca un fuero diferente.
              </p>

              <h2>10. Protección de Datos</h2>
              <p>
                Para obtener información sobre cómo tratamos tus datos personales,
                consulta nuestra{' '}
                <Link href="/privacidad">
                  Política de Privacidad
                </Link>
                .
              </p>

              <h2>11. Modificación del Aviso Legal</h2>
              <p>
                El titular se reserva el derecho de efectuar sin previo aviso
                las modificaciones que considere oportunas en su sitio web,
                pudiendo cambiar, suprimir o añadir tanto los contenidos y
                servicios que se presten a través del mismo como la forma en
                la que estos aparezcan presentados o localizados en su sitio web.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
