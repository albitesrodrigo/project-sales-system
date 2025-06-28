🛍️ Project Sales System - Frontend
¡Bienvenido al frontend del sistema de ventas! Este proyecto ha sido desarrollado en Angular 19, utilizando PrimeNG para los componentes UI y TailwindCSS para la personalización de estilos.

🚀 Cómo ejecutar el proyecto
1. Clona el repositorio

2. 2. Instala las dependencias
bash
Copiar
Editar
npm install
3. Configura el entorno
Edita el archivo src/environments/environment.ts con la URL de tu API Gateway (backend):
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api' // Cambia esto según tu entorno backend

};
4. Ejecuta el proyecto
ng serve
La aplicación estará disponible en:
📍 http://localhost:4200

📦 Tecnologías utilizadas
✅ Angular 19
✅ PrimeNG
✅ TailwindCSS
✅ RxJS
✅ TypeScript

✨ Características
Gestión de productos, ventas y usuarios
Tablas, formularios y diálogos responsivos con PrimeNG
Estilos modernos y personalizables con TailwindCSS
Consumo de microservicios desde un API Gateway
Arquitectura modular y escalable
