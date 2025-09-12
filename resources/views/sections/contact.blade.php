<!-- CONTACT SECTION -->
<section id="contact" class="py-20 sm:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
                Solicita tu cita
            </h2>
            <p class="mt-6 text-lg text-slate-600">
                Estamos aquí para cuidar de tus pies. Contacta con nosotros para programar tu cita o resolver cualquier
                duda.
            </p>
        </div>

        <div class="mt-20 grid lg:grid-cols-2 gap-16">
            <!-- Contact Form -->
            <div>
                <form class="space-y-6">
                    <div class="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                            <input type="text" id="name" name="name"
                                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="Tu nombre" />
                        </div>
                        <div>
                            <label for="phone" class="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                            <input type="tel" id="phone" name="phone"
                                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="Tu teléfono" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input type="email" id="email" name="email"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            placeholder="tu@email.com" />
                    </div>

                    <div>
                        <label for="service" class="block text-sm font-medium text-slate-700 mb-2">Tipo de
                            consulta</label>
                        <select id="service" name="service"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent">
                            <option value="">Selecciona un servicio</option>
                            <option value="quiropedia">Quiropedia</option>
                            <option value="unas-encarnadas">Uñas encarnadas</option>
                            <option value="plantillas">Plantillas personalizadas</option>
                            <option value="papilomas">Tratamiento de papilomas</option>
                            <option value="deportiva">Podología deportiva</option>
                            <option value="general">Consulta general</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                        <textarea id="message" name="message" rows="4"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            placeholder="Cuéntanos más sobre tu consulta..."></textarea>
                    </div>

                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="consent" name="consent"
                            class="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded" />
                        <label for="consent" class="text-sm text-slate-600">
                            Acepto la
                            <a href="#" class="text-slate-900 hover:underline">política de privacidad</a>
                            y el tratamiento de mis datos.
                        </label>
                    </div>

                    <button type="submit"
                        class="w-full bg-slate-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                        Enviar mensaje
                    </button>
                </form>
            </div>

            <!-- Contact Info -->
            <div class="space-y-8">
                <div>
                    <h3 class="text-xl font-semibold text-slate-900 mb-6">Información de contacto</h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <svg class="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div>
                                <div class="font-medium text-slate-900">Dirección</div>
                                <div class="text-slate-600">C. de la Carrera, 7</div>
                                <div class="text-slate-600">28931 Móstoles, Madrid</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <svg class="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div>
                                <div class="font-medium text-slate-900">Teléfono</div>
                                <a href="tel:+34912268858" class="text-slate-600 hover:text-slate-900">
                                    +34 912 26 88 58
                                </a>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <svg class="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div class="font-medium text-slate-900">Horarios</div>
                                <div class="text-slate-600">Lun - Vie: 09:30-14:00, 17:00-20:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-semibold text-slate-900 mb-6">¿Cómo llegar?</h3>
                    <div class="bg-slate-50 rounded-2xl p-6">
                        <div class="space-y-4">
                            <div class="flex items-start gap-3">
                                <svg class="h-5 w-5 text-slate-700 mt-0.5" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5zM15.75 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5z" />
                                </svg>
                                <div>
                                    <div class="font-medium text-slate-900">Metro</div>
                                    <div class="text-sm text-slate-600">Línea 12 - Estación Móstoles Central</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <svg class="h-5 w-5 text-slate-700 mt-0.5" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5zM15.75 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5z" />
                                </svg>
                                <div>
                                    <div class="font-medium text-slate-900">Autobús</div>
                                    <div class="text-sm text-slate-600">Líneas 518, 519, 521, 526</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <svg class="h-5 w-5 text-slate-700 mt-0.5" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5zM15.75 18.75a1.5 1.5 0 01-3 0V5.25a1.5 1.5 0 013 0v13.5z" />
                                </svg>
                                <div>
                                    <div class="font-medium text-slate-900">Parking</div>
                                    <div class="text-sm text-slate-600">Disponible en zona azul y parkings cercanos
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <a href="https://www.google.com/maps/place/Clinica+Podol%C3%B3gica+Carrera/@40.3264923,-3.8614242,17z/data=!4m6!3m5!1s0xd418e81e5d565c3:0x8f1c87dfcd45852b!8m2!3d40.326677!4d-3.8613362!16s%2Fg%2F11c2j39c56?entry=ttu&g_ep=EgoyMDI1MDkwOC4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                class="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-slate-700">
                                Ver en Google Maps
                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>