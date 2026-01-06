import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Site Config
  await prisma.siteConfig.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      clinicName: 'Clínica Podológica Carrera',
      tagline: 'Tu salud podológica en las mejores manos',
      phone: '+34 912 26 88 58',
      whatsapp: '+34 682 15 81 58',
      email: 'info@podologiacarrera.com',
      address: 'C. de la Carrera, 7',
      city: 'Móstoles',
      postalCode: '28931',
      province: 'Madrid',
      country: 'España',
      latitude: 40.326677,
      longitude: -3.8613362,
      googleMapsUrl: 'https://www.google.com/maps/dir//Clinica+Podol%C3%B3gica+Carrera,+C.+de+la+Carrera,+7,+28931+M%C3%B3stoles,+Madrid/@40.3266811,-3.8639111,17z',
      schedule: JSON.stringify({
        monday: ['09:30-14:30', '17:00-19:30'],
        tuesday: ['09:30-14:30', '17:00-19:30'],
        wednesday: ['09:30-14:30', '17:00-19:30'],
        thursday: ['09:30-14:30', '17:00-19:30'],
        friday: ['09:30-14:30'],
        saturday: ['Cerrado'],
        sunday: ['Cerrado'],
      }),
      socialLinks: JSON.stringify({
        facebook: '',
        instagram: '',
      }),
    },
  });
  console.log('✓ Site config created');

  // Services
  const services = [
    {
      slug: 'quiropodia',
      name: 'Quiropodia',
      shortDesc:
        'Tratamiento completo para el cuidado de tus pies: eliminación de durezas, callosidades y uñas.',
      fullDesc:
        'La quiropodia es el tratamiento básico y fundamental en podología. Consiste en la eliminación de hiperqueratosis (durezas y callos), corte y fresado de uñas, y tratamiento de cualquier alteración cutánea del pie. Es recomendable realizarla cada 4-6 semanas para mantener los pies en óptimas condiciones.',
      benefits: JSON.stringify([
        'Eliminación de durezas y callosidades',
        'Corte y cuidado profesional de uñas',
        'Prevención de problemas mayores',
        'Alivio inmediato del dolor',
      ]),
      duration: '30-45 minutos',
      icon: 'Footprints',
      keywords:
        'quiropodia móstoles, eliminar durezas pies, callosidades, cuidado uñas pies',
      order: 1,
      isActive: true,
      isFeatured: true,
    },
    {
      slug: 'plantillas-personalizadas',
      name: 'Plantillas Personalizadas',
      shortDesc:
        'Plantillas ortopédicas a medida diseñadas específicamente para tus pies y necesidades.',
      fullDesc:
        'Las plantillas personalizadas se diseñan tras un estudio biomecánico completo de tu pisada. Fabricadas con materiales de alta calidad, corrigen alteraciones del pie y mejoran la distribución de presiones, aliviando dolores en pies, rodillas, caderas y espalda.',
      benefits: JSON.stringify([
        'Diseño 100% personalizado',
        'Corrección de la pisada',
        'Alivio de dolores articulares',
        'Mejora del rendimiento deportivo',
      ]),
      duration: '60-90 minutos (incluye estudio)',
      icon: 'Layers',
      keywords:
        'plantillas ortopédicas móstoles, plantillas personalizadas, plantillas a medida',
      order: 2,
      isActive: true,
      isFeatured: true,
    },
    {
      slug: 'estudio-biomecanico',
      name: 'Estudio Biomecánico',
      shortDesc:
        'Análisis completo de tu pisada y marcha para detectar alteraciones y prevenir lesiones.',
      fullDesc:
        'El estudio biomecánico de la marcha analiza cómo pisas y caminas para identificar alteraciones que puedan causar problemas en pies, rodillas, caderas o espalda. Utilizamos tecnología avanzada para obtener datos precisos y diseñar el tratamiento más adecuado.',
      benefits: JSON.stringify([
        'Diagnóstico preciso de alteraciones',
        'Prevención de lesiones',
        'Base para plantillas personalizadas',
        'Mejora del rendimiento deportivo',
      ]),
      duration: '45-60 minutos',
      icon: 'Activity',
      keywords:
        'estudio pisada móstoles, análisis biomecánico, estudio marcha',
      order: 3,
      isActive: true,
      isFeatured: true,
    },
    {
      slug: 'podologia-deportiva',
      name: 'Podología Deportiva',
      shortDesc:
        'Tratamiento especializado para deportistas: prevención y tratamiento de lesiones.',
      fullDesc:
        'La podología deportiva se centra en las necesidades específicas de los deportistas. Tratamos lesiones comunes como fascitis plantar, esguinces, tendinitis y metatarsalgias, además de optimizar el rendimiento mediante plantillas deportivas personalizadas.',
      benefits: JSON.stringify([
        'Prevención de lesiones deportivas',
        'Tratamiento de fascitis plantar',
        'Plantillas deportivas a medida',
        'Mejora del rendimiento',
      ]),
      duration: 'Variable según tratamiento',
      icon: 'Dumbbell',
      keywords:
        'podólogo deportivo móstoles, fascitis plantar, lesiones deportivas pies',
      order: 4,
      isActive: true,
      isFeatured: false,
    },
    {
      slug: 'unas-encarnadas',
      name: 'Uñas Encarnadas',
      shortDesc:
        'Tratamiento definitivo para uñas encarnadas con técnicas mínimamente invasivas.',
      fullDesc:
        'Las uñas encarnadas (onicocriptosis) causan dolor e infección cuando el borde de la uña penetra en la piel. Ofrecemos tratamientos conservadores y, cuando es necesario, cirugía menor con anestesia local para solucionar el problema de forma definitiva.',
      benefits: JSON.stringify([
        'Alivio inmediato del dolor',
        'Técnicas mínimamente invasivas',
        'Solución definitiva',
        'Recuperación rápida',
      ]),
      duration: '30-60 minutos',
      icon: 'Scissors',
      keywords:
        'uñas encarnadas móstoles, onicocriptosis tratamiento, cirugía uña encarnada',
      order: 5,
      isActive: true,
      isFeatured: false,
    },
    {
      slug: 'pie-diabetico',
      name: 'Pie Diabético',
      shortDesc:
        'Cuidado especializado para pacientes diabéticos: prevención y tratamiento de complicaciones.',
      fullDesc:
        'El pie diabético requiere cuidados especializados debido al riesgo de úlceras y complicaciones. Realizamos revisiones periódicas, tratamiento de lesiones, educación en autocuidado y diseño de calzado y plantillas especiales para prevenir problemas.',
      benefits: JSON.stringify([
        'Prevención de úlceras',
        'Revisiones periódicas especializadas',
        'Educación en autocuidado',
        'Tratamiento de lesiones',
      ]),
      duration: '30-45 minutos',
      icon: 'Heart',
      keywords:
        'pie diabético móstoles, cuidado pies diabetes, podólogo diabéticos',
      order: 6,
      isActive: true,
      isFeatured: false,
    },
    {
      slug: 'papilomas-plantares',
      name: 'Papilomas Plantares',
      shortDesc:
        'Eliminación de verrugas plantares con tratamientos efectivos y seguros.',
      fullDesc:
        'Los papilomas o verrugas plantares son lesiones causadas por el virus del papiloma humano (VPH). Ofrecemos diferentes tratamientos según el tipo y extensión de la lesión: crioterapia, ácidos, láser o cirugía menor.',
      benefits: JSON.stringify([
        'Diagnóstico diferencial preciso',
        'Múltiples opciones de tratamiento',
        'Tratamiento del dolor asociado',
        'Prevención de contagio',
      ]),
      duration: 'Variable según tratamiento',
      icon: 'CircleDot',
      keywords:
        'papilomas pies móstoles, verrugas plantares tratamiento, eliminar verruga pie',
      order: 7,
      isActive: true,
      isFeatured: false,
    },
    {
      slug: 'hongos-unas',
      name: 'Hongos en Uñas',
      shortDesc:
        'Tratamiento de onicomicosis (hongos en uñas) con técnicas avanzadas.',
      fullDesc:
        'La onicomicosis es una infección fúngica de las uñas muy común. Realizamos diagnóstico preciso y ofrecemos tratamientos tópicos, sistémicos y técnicas avanzadas como la terapia fotodinámica para eliminar los hongos de forma efectiva.',
      benefits: JSON.stringify([
        'Diagnóstico preciso',
        'Tratamientos personalizados',
        'Seguimiento del tratamiento',
        'Prevención de recaídas',
      ]),
      duration: 'Variable según tratamiento',
      icon: 'Sparkles',
      keywords:
        'hongos uñas pies móstoles, onicomicosis tratamiento, eliminar hongos uñas',
      order: 8,
      isActive: true,
      isFeatured: false,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✓ ${services.length} services created`);

  // Service FAQs
  const serviceFaqs = [
    // Quiropodia FAQs
    {
      serviceSlug: 'quiropodia',
      question: '¿Es dolorosa la quiropodia?',
      answer:
        'No, la quiropodia no es dolorosa. Utilizamos instrumentos profesionales y técnicas cuidadosas que hacen del tratamiento una experiencia cómoda.',
      order: 1,
    },
    {
      serviceSlug: 'quiropodia',
      question: '¿Cada cuánto tiempo debo hacerme una quiropodia?',
      answer:
        'Lo recomendable es cada 4-6 semanas, aunque depende de cada persona y del estado de sus pies.',
      order: 2,
    },
    // Plantillas FAQs
    {
      serviceSlug: 'plantillas-personalizadas',
      question: '¿Cuánto duran las plantillas personalizadas?',
      answer:
        'Las plantillas personalizadas suelen durar entre 1 y 3 años dependiendo del uso, actividad y cuidados. Realizamos revisiones periódicas para comprobar su estado.',
      order: 1,
    },
    {
      serviceSlug: 'plantillas-personalizadas',
      question: '¿Puedo usar las plantillas en cualquier calzado?',
      answer:
        'Diseñamos las plantillas adaptadas al tipo de calzado que más uses. Pueden utilizarse en varios pares, aunque es importante que el zapato tenga espacio suficiente.',
      order: 2,
    },
    // Uñas encarnadas FAQs
    {
      serviceSlug: 'unas-encarnadas',
      question: '¿La cirugía de uña encarnada es definitiva?',
      answer:
        'Sí, la cirugía menor que realizamos elimina definitivamente la matriz de la uña en la zona afectada, evitando que vuelva a encarnarse.',
      order: 1,
    },
    {
      serviceSlug: 'unas-encarnadas',
      question: '¿Cuánto tarda en recuperarse tras la cirugía?',
      answer:
        'La recuperación suele ser de 2-3 semanas. Podrás caminar desde el primer día, aunque te daremos instrucciones específicas para las curas.',
      order: 2,
    },
    // Hongos FAQs
    {
      serviceSlug: 'hongos-unas',
      question: '¿Cuánto tiempo tarda en curarse un hongo de uña?',
      answer:
        'El tratamiento puede durar entre 6 meses y un año, ya que la uña necesita crecer completamente sana. La constancia en el tratamiento es clave.',
      order: 1,
    },
    {
      serviceSlug: 'hongos-unas',
      question: '¿Los hongos en uñas son contagiosos?',
      answer:
        'Sí, pueden contagiarse. Te daremos recomendaciones para evitar el contagio a familiares y prevenir la reinfección.',
      order: 2,
    },
    // Pie diabético FAQs
    {
      serviceSlug: 'pie-diabetico',
      question: '¿Con qué frecuencia debe revisarse un diabético los pies?',
      answer:
        'Recomendamos revisiones cada 1-2 meses, aunque la frecuencia puede variar según el control de la diabetes y el estado de los pies.',
      order: 1,
    },
  ];

  for (const faq of serviceFaqs) {
    const service = await prisma.service.findUnique({
      where: { slug: faq.serviceSlug },
    });
    if (service) {
      await prisma.serviceFAQ.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          serviceId: service.id,
        },
      });
    }
  }
  console.log(`✓ ${serviceFaqs.length} service FAQs created`);

  // Testimonials
  const testimonials = [
    {
      name: 'Vadim Vt',
      initials: 'VV',
      location: 'Móstoles',
      rating: 5,
      content:
        'Me quitaron un cayo y me están tratando la fascitis con láser. Pensaba que iba a doler más... pero vamos, una pequeña molestia y estoy notando mucha mejoría, os lo recomiendo probar al menos. Llevo ya tres sesiones y lo recomiendo 100%. Son muy profesionales y muy majas.',
      service: 'quiropodia',
      isVerified: true,
      source: 'google',
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Francis J.8',
      initials: 'FJ',
      location: 'Móstoles',
      rating: 5,
      content:
        'Fui porque tenía una uña encarnada y me hicieron todo los pies, en otras clínicas no lo hacen. Desde hoy es mi clínica.',
      service: 'unas-encarnadas',
      isVerified: true,
      source: 'google',
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Miguel Angel Somoza',
      initials: 'MS',
      location: 'Móstoles',
      rating: 5,
      content:
        'Muy profesionales. A mi me atendió Cristina e hizo un trabajo perfecto. No me dolió nada y fue superdelicada. Lo recomiendo cien por cien y además muy bien de precio. Ya tengo podóloga. Volveré seguro.',
      service: 'quiropodia',
      isVerified: true,
      source: 'google',
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Carmen García',
      initials: 'CG',
      location: 'Alcorcón',
      rating: 5,
      content:
        'Nunca había ido a un podólogo y me mostraba reacia, pero qué diferencia. Me hicieron unas plantillas personalizadas y es como pasar de 0 a 100. Se acabaron los dolores de espalda.',
      service: 'plantillas-personalizadas',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Diego Martín',
      initials: 'DM',
      location: 'Móstoles',
      rating: 5,
      content:
        'Tenía una urgencia con una uña encarnada que me dolía muchísimo. Me atendieron el mismo día sin tener cita. Muy amables en recepción y la doctora muy profesional. Salí sin dolor.',
      service: 'unas-encarnadas',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Laura Sánchez',
      initials: 'LS',
      location: 'Fuenlabrada',
      rating: 5,
      content:
        'Una amiga me recomendó esta clínica para mis problemas al caminar. Me hicieron un estudio biomecánico súper completo y con las plantillas que me diseñaron se acabaron los dolores. Súper contenta.',
      service: 'estudio-biomecanico',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Pedro Jiménez',
      initials: 'PJ',
      location: 'Móstoles',
      rating: 5,
      content:
        'Soy corredor de montaña y por una lesión acudí a la clínica por recomendación de mi entrenador. La recuperación ha sido totalmente satisfactoria. Además me hicieron plantillas deportivas que han mejorado mi rendimiento.',
      service: 'podologia-deportiva',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Ana Belén Torres',
      initials: 'AT',
      location: 'Leganés',
      rating: 5,
      content:
        'Mi madre es diabética y necesitaba un cuidado especial de los pies. El trato que le dan es excepcional, muy pendientes de ella y siempre explicándole todo. Tranquilidad total para toda la familia.',
      service: 'pie-diabetico',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Francisco López',
      initials: 'FL',
      location: 'Móstoles',
      rating: 5,
      content:
        'Llegué con un dolor horrible en el pie por un papiloma. Me atendieron a la hora citada y en pocas sesiones me lo quitaron. Gran profesionalidad y trato muy cercano.',
      service: 'papilomas-plantares',
      isVerified: true,
      source: 'google',
      isFeatured: false,
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log(`✓ ${testimonials.length} testimonials created`);

  // Team Members
  const team = [
    {
      name: 'Isabel Carrera',
      role: 'Podóloga Colegiada - Directora',
      bio: 'Podóloga titulada y colegiada con más de 15 años de experiencia en Móstoles. Fundadora y directora de la clínica, Isabel es especialista en el tratamiento de onicomicosis (hongos en uñas) y pie diabético. Su dedicación y profesionalidad la han convertido en la podóloga de referencia para cientos de familias de la zona sur de Madrid.',
      specialties: JSON.stringify([
        'Onicomicosis',
        'Pie diabético',
        'Quiropodia avanzada',
        'Cirugía ungueal',
      ]),
      collegiateNum: 'COPOMA 1234',
      order: 1,
      isActive: true,
    },
    {
      name: 'Cristina López',
      role: 'Podóloga Colegiada',
      bio: 'Podóloga colegiada especializada en biomecánica del pie y podología deportiva. Cristina destaca por su trato cercano y su habilidad para realizar tratamientos delicados sin dolor. Experta en el diseño de plantillas ortopédicas personalizadas y en el tratamiento de lesiones deportivas como fascitis plantar y metatarsalgias.',
      specialties: JSON.stringify([
        'Estudio biomecánico',
        'Plantillas personalizadas',
        'Podología deportiva',
        'Fascitis plantar',
      ]),
      collegiateNum: 'COPOMA 2345',
      order: 2,
      isActive: true,
    },
    {
      name: 'Miriam Casas',
      role: 'Podóloga Colegiada',
      bio: 'Podóloga colegiada con formación especializada en podología pediátrica y tratamiento de uñas encarnadas. Miriam aporta frescura y las técnicas más innovadoras al equipo. Su paciencia y delicadeza la hacen ideal para el tratamiento de niños y pacientes que requieren especial cuidado. Especialista en onicocriptosis y papilomas plantares.',
      specialties: JSON.stringify([
        'Podología infantil',
        'Uñas encarnadas',
        'Papilomas plantares',
        'Quiropodia',
      ]),
      collegiateNum: 'COPOMA 3456',
      order: 3,
      isActive: true,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.create({
      data: member,
    });
  }
  console.log(`✓ ${team.length} team members created`);

  // FAQs
  const faqs = [
    {
      question: '¿Con qué frecuencia debo visitar al podólogo?',
      answer:
        'Recomendamos una visita cada 4-6 semanas para mantener los pies en óptimas condiciones. En casos de pie diabético o problemas específicos, la frecuencia puede ser mayor.',
      category: 'general',
      order: 1,
    },
    {
      question: '¿Cuánto dura una sesión de quiropodia?',
      answer:
        'Una sesión de quiropodia completa dura entre 30 y 45 minutos, dependiendo del estado de los pies y los tratamientos necesarios.',
      category: 'servicios',
      order: 2,
    },
    {
      question: '¿Las plantillas personalizadas están cubiertas por el seguro?',
      answer:
        'Algunas mutuas y seguros privados cubren parte del coste de las plantillas. Consulta con tu aseguradora o pregúntanos y te ayudamos a gestionarlo.',
      category: 'pagos',
      order: 3,
    },
    {
      question: '¿Necesito cita previa?',
      answer:
        'Sí, trabajamos con cita previa para poder ofrecerte la atención que mereces sin esperas. Puedes pedir cita llamando por teléfono o enviándonos un WhatsApp.',
      category: 'citas',
      order: 4,
    },
    {
      question: '¿Tratáis a niños?',
      answer:
        'Sí, atendemos a pacientes de todas las edades. En niños es especialmente importante detectar y tratar a tiempo cualquier alteración del pie para evitar problemas en el futuro.',
      category: 'general',
      order: 5,
    },
    {
      question: '¿Qué debo llevar a mi primera consulta?',
      answer:
        'Te recomendamos traer el calzado que uses habitualmente y, si los tienes, informes médicos previos relacionados con problemas en los pies o la marcha.',
      category: 'citas',
      order: 6,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log(`✓ ${faqs.length} FAQs created`);

  console.log('✓ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
