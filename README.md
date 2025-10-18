Avans Keuzekompas - Backend

NestJS REST API voor het beheren van keuzemodules en favorieten. Studenten kunnen inloggen, modules bekijken en hun favorieten beheren.

Functionaliteiten: Registreren en inloggen met JWT, wachtwoorden gehashed met bcrypt, alle modules ophalen, module details bekijken, favorieten toevoegen, verwijderen en ophalen, dubbele favorieten voorkomen.

Architectuur: Controllers (auth.controller.ts, vkm.controller.ts) voor HTTP routing, Services (auth.service.ts, vkm.service.ts) voor business logica, Data Layer (user.schema.ts, keuzemodules.schema.ts, favorite.schema.ts) voor MongoDB interactie. Beveiliging via AuthGuard, DTO validatie, en CORS.

Database: Collections voor Users, Keuzemodules en Favorites met koppeling tussen userId en moduleId.

API Endpoints: POST /auth/register, POST /auth/login, GET /keuzemodules, GET /keuzemodules/:id, GET /keuzemodules/favorite, POST /keuzemodules/:id/favorite, DELETE /keuzemodules/:id/favorite.

Tech Stack: NestJS met TypeScript, MongoDB via Mongoose, JWT voor authenticatie, class-validator voor validatie, bcrypt voor password hashing.

CRUD Operations: Create (favorieten toevoegen, user registreren), Read (modules en favorieten ophalen), Delete (favorieten verwijderen).