# Full-Stack Chat Application (Java Spring Boot + React)

This project is a multi-tier chat application featuring a robust Java backend and a modern React frontend.

## Project Structure

- `/backend`: Java Spring Boot Application (Maven)
- `/src`: React Frontend (Vite)
- `server.ts`: Express Bridge (Used for AI Studio preview only)
- `schema.sql`: Database schema for PostgreSQL

---

## 🛠 Local Setup Mandatory Steps

### 1. Backend (Spring Boot)
1. Ensure you have **JDK 17+** and **Maven** installed.
2. Configure your PostgreSQL database in `backend/src/main/resources/application.properties` (or set `SPRING_DATASOURCE_URL`).
3. Run the following commands:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

### 2. Frontend (React)
1. Ensure you have **Node.js** installed.
2. In the root directory, install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 Deployment Guide

### 1. Backend (Render / Heroku)
- **Environment:** Java/Maven
- **Build Command:** `./mvnw clean install -DskipTests`
- **Output Directory:** `target/`
- **Environment Variables:**
  - `DATABASE_URL`: Set to your PostgreSQL connection string.
  - `SPRING_DATASOURCE_URL`: (Optional) If not using DATABASE_URL directly.

### 2. Frontend (Vercel / Netlify)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Configuration:**
  - Ensure API calls point to your Render backend URL (e.g., using a proxy or direct URL in `fetch`).

---

## 📖 Feature Implementation Details

- **Database:** Uses `JpaRepository.save(entity)` which automatically performs an `INSERT` for new records.
- **File Upload:** Handled via `MultipartFile` in Spring Boot, saved to a local `uploads/` directory and served as static resources.
- **UI:** Balanced "Technical Dashboard" aesthetic with `motion` for smooth interactions.
- **Reset:** The logo acts as a reset button (clears UI/Backend messages for demo purposes).
