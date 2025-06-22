
'use client';

import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.div
        className="prose dark:prose-invert max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1>Política de Privacidad</h1>
        <p className="lead">Última actualización: 1 de Agosto, 2025</p>

        <h2>1. Introducción</h2>
        <p>
          Bienvenido a FiscalFlow. Nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web y utiliza nuestra aplicación.
        </p>

        <h2>2. Recopilación de su Información</h2>
        <p>
          Podemos recopilar información sobre usted de varias maneras. La información que podemos recopilar en el Sitio incluye:
        </p>
        <ul>
          <li><strong>Datos Personales:</strong> Información de identificación personal, como su nombre, dirección de correo electrónico y número de teléfono, y otra información que nos proporciona voluntariamente cuando se registra en la aplicación.</li>
          <li><strong>Datos Fiscales:</strong> Información relacionada con sus declaraciones de impuestos, como RNC, NCF, montos de facturas y otros datos necesarios para generar los formatos fiscales. Esta información es tratada con la máxima confidencialidad.</li>
          <li><strong>Datos Derivados:</strong> Información que nuestros servidores recopilan automáticamente cuando accede al Sitio, como su dirección IP, tipo de navegador, sistema operativo, tiempos de acceso y las páginas que ha visto directamente antes y después de acceder al Sitio.</li>
        </ul>

        <h2>3. Uso de su Información</h2>
        <p>
          Tener información precisa sobre usted nos permite brindarle una experiencia fluida, eficiente y personalizada. Específicamente, podemos usar la información recopilada sobre usted a través del Sitio para:
        </p>
        <ul>
          <li>Crear y gestionar su cuenta.</li>
          <li>Generar los reportes fiscales (606, 607, etc.) solicitados.</li>
          <li>Enviarle un correo electrónico con respecto a su cuenta o pedido.</li>
          <li>Mejorar la eficiencia y el funcionamiento de la aplicación.</li>
          <li>Notificarle las actualizaciones de la aplicación.</li>
        </ul>

        <h2>4. Seguridad de su Información</h2>
        <p>
          Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para proteger la información personal que nos proporciona, tenga en cuenta que a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable, y no se puede garantizar ningún método de transmisión de datos contra ninguna intercepción u otro tipo de uso indebido.
        </p>

        <h2>5. Contacto</h2>
        <p>
          Si tiene preguntas o comentarios sobre esta Política de Privacidad, contáctenos en: <a href="mailto:privacidad@fiscalflow.app">privacidad@fiscalflow.app</a>
        </p>
      </motion.div>
    </div>
  );
}
