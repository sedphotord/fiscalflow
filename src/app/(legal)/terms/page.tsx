
'use client';

import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.div
        className="prose dark:prose-invert max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1>Términos de Servicio</h1>
        <p className="lead">Última actualización: 1 de Agosto, 2025</p>

        <h2>1. Acuerdo de los Términos</h2>
        <p>
          Estos Términos de Servicio constituyen un acuerdo legalmente vinculante hecho entre usted, ya sea personalmente o en nombre de una entidad ("usted") y FiscalFlow ("Compañía", "nosotros", "nos" o "nuestro"), con respecto a su acceso y uso del sitio web de FiscalFlow, así como cualquier otra forma de medio, canal de medios, sitio web móvil o aplicación móvil relacionada, vinculada o conectada de otro modo (colectivamente, el "Sitio").
        </p>

        <h2>2. Derechos de Propiedad Intelectual</h2>
        <p>
          A menos que se indique lo contrario, el Sitio es de nuestra propiedad y todo el código fuente, bases de datos, funcionalidad, software, diseños de sitios web, audio, video, texto, fotografías y gráficos en el Sitio (colectivamente, el "Contenido") y las marcas comerciales, marcas de servicio y logotipos contenidos en él (las "Marcas") son de nuestra propiedad o están controlados por nosotros o se nos otorgan licencias, y están protegidos por las leyes de derechos de autor y marcas registradas.
        </p>

        <h2>3. Representaciones del Usuario</h2>
        <p>
          Al usar el Sitio, usted declara y garantiza que: (1) toda la información de registro que envíe será verdadera, precisa, actual y completa; (2) mantendrá la exactitud de dicha información y la actualizará rápidamente según sea necesario; (3) tiene la capacidad legal y acepta cumplir con estos Términos de Servicio; (4) no utilizará el Sitio para ningún propósito ilegal o no autorizado; y (5) su uso del Sitio no violará ninguna ley o regulación aplicable.
        </p>
        
        <h2>4. Actividades Prohibidas</h2>
        <p>
            No puede acceder ni utilizar el Sitio para ningún otro propósito que no sea aquel para el que ponemos a disposición el Sitio. El Sitio no se puede utilizar en relación con ningún esfuerzo comercial, excepto aquellos que están específicamente respaldados o aprobados por nosotros.
        </p>

        <h2>5. Plazo y Terminación</h2>
        <p>
            Estos Términos de Servicio permanecerán en pleno vigor y efecto mientras utilice el Sitio. SIN LIMITAR NINGUNA OTRA DISPOSICIÓN DE ESTOS TÉRMINOS DE SERVICIO, NOS RESERVAMOS EL DERECHO DE, A NUESTRA ENTERA DISCRECIÓN Y SIN PREVIO AVISO NI RESPONSABILIDAD, NEGAR EL ACCESO Y USO DEL SITIO (INCLUIDO EL BLOQUEO DE CIERTAS DIRECCIONES IP), A CUALQUIER PERSONA POR CUALQUIER MOTIVO O SIN MOTIVO.
        </p>
      </motion.div>
    </div>
  );
}
