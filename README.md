# 🧾 Project Sales System MS - Backend

¡Hola a todos! 👋

Este proyecto contiene los **microservicios del sistema de ventas**. A continuación, te explicamos cómo levantar el proyecto correctamente.

---

## 🚀 Pasos para ejecutar el proyecto

1. **Ejecuta todos los microservicios**, incluyendo el **API Gateway**.
2. Configura tu archivo `application.yaml` para que apunte a tu base de datos **local**.
3. Dentro del proyecto encontrarás una carpeta llamada `backup`, donde se encuentra el archivo `db-2025.bak`.
   - Ese archivo contiene la base de datos oficial del proyecto.
   - Usa este backup para restaurar la BD en tu gestor de base de datos (ej: SQL Server).
4. Si presentas errores al restaurar la BD, también te proporcionamos el contenido en **texto plano** para ejecutarlo directamente.

---

## 📦 Herramientas necesarias

- Java 17 o superior ☕
- Spring Boot
- MYSQL (o gestor compatible con el `.bak`)
- Maven
- Postman (opcional)

---

## 📫 Colecciones de Postman

Se incluye una colección de APIs en Postman para que puedas probar los endpoints fácilmente.

---

## 🧠 Importante

Todos los microservicios comparten una **única base de datos**, por lo tanto debes **restaurarla antes de iniciar** el sistema.
