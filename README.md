# Lekcije App

Spletna aplikacija za upravljanje kratkih 5-minutnih video lekcij. Aplikacija omogoča pregledovanje, dodajanje, urejanje in brisanje lekcij z YouTube povezavami.

## Kazalo

- [O projektu](#-o-projektu)
- [Funkcionalnosti](#-funkcionalnosti)
- [Tehnologije](#-tehnologije)
- [Struktura projekta](#-struktura-projekta)
- [Navodila za nameščanje](#-navodila-za-nameščanje)
- [Navodila za razvijalce](#-navodila-za-razvijalce)
- [API Dokumentacija](#-api-dokumentacija)
- [DPU](#-diagram-primerov-uporabe)
- [Standardi kodiranja](#-standardi-kodiranja)

---

## O projektu

Lekcije App je full-stack aplikacija za upravljanje učnih vsebin. Uporabniki lahko dodajajo kratke lekcije s povezavami na YouTube videoposnetke, jih urejajo, brišejo in pregledujejo. Aplikacija je razdeljena na backend (REST API) in frontend (React SPA).

## Funkcionalnosti

- **CRUD operacije**: Ustvarjanje, branje, posodabljanje in brisanje lekcij
- **Iskanje**: Iskanje lekcij po naslovu in opisu
- **YouTube integracija**: Predogled YouTube videoposnetkov
- **Odziven dizajn**: Prilagojena uporabniška izkušnja za različne naprave
- **Real-time posodabljanje**: Dinamično osveževanje seznama lekcij

## Tehnologije

### Backend

- **Java 25**
- **Spring Boot 3.5.6**
- **Spring Data JPA** - ORM za delo s podatkovno bazo
- **MySQL** - Relacijska podatkovna baza
- **Maven** - Upravljanje odvisnosti

### Frontend

- **React 19.1.1** - JavaScript knjižnica za uporabniški vmesnik
- **TypeScript 5.9.3** - Tipiziran JavaScript
- **Vite 7.1.7** - Build orodje in razvojni strežnik
- **React Router DOM 7.9.4** - Usmerjanje v aplikaciji
- **CSS3** - Stilizacija

## Struktura projekta

```
lekcije_app/
├── lekcije_app_be/                 # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/lekcije_app_be/
│   │   │   │       ├── LekcijeAppBeApplication.java    # Glavna aplikacijska točka
│   │   │   │       ├── dao/                            # Data Access Objects
│   │   │   │       │   ├── Dao.java                    # Generični DAO vmesnik
│   │   │   │       │   ├── LekcijaDao.java             # DAO vmesnik za lekcije
│   │   │   │       │   └── LekcijaJpaDao.java          # JPA implementacija
│   │   │   │       ├── rest/                           # REST kontrolerji
│   │   │   │       │   └── LekcijeRestController.java
│   │   │   │       └── vao/                            # Value Access Objects (entitete)
│   │   │   │           └── Lekcija.java                # JPA entiteta Lekcija
│   │   │   └── resources/
│   │   │       └── application.properties              # Konfiguracija aplikacije
│   │   └── test/                                       # Unit testi
│   ├── pom.xml                                         # Maven konfiguracija
│   └── mvnw, mvnw.cmd                                  # Maven wrapper
│
├── lekcije_app_fe/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/                            # React komponente
│   │   │   ├── AddEditLesson.tsx                 # Obrazec za dodajanje/urejanje
│   │   │   ├── LessonList.tsx                    # Seznam lekcij
│   │   │   └── LessonPreview.tsx                 # Predogled lekcije
│   │   ├── api.ts                                # API klient za komunikacijo z backendom
│   │   ├── App.tsx                               # Glavna komponenta
│   │   ├── main.tsx                              # Vstopna točka aplikacije
│   │   ├── App.css                               # Glavni stili
│   │   └── index.css                             # Globalni stili
│   ├── public/                                    # Statične datoteke
│   ├── package.json                              # NPM odvisnosti
│   ├── vite.config.ts                            # Vite konfiguracija
│   ├── tsconfig.json                             # TypeScript konfiguracija
│   └── eslint.config.js                          # ESLint konfiguracija
│
└── README.md                                      # Ta datoteka
```

## Navodila za nameščanje

### Predpogoji

Preden začnete, se prepričajte, da imate nameščeno:

- **Java JDK 17+** ([Prenesi](https://www.oracle.com/java/technologies/downloads/))
- **Node.js 18+** in **npm** ([Prenesi](https://nodejs.org/))
- **MySQL 8.0+** ([Prenesi](https://dev.mysql.com/downloads/mysql/))
- **Git** ([Prenesi](https://git-scm.com/downloads))

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/janmrkonjic/lekcije_app.git
cd lekcije_app
```

### 2. Nastavitev podatkovne baze

Ustvarite MySQL podatkovno bazo:

```sql
CREATE DATABASE lekcije_db;
CREATE USER 'lekcije_user'@'%' IDENTIFIED BY 'lekcije_pass';
GRANT ALL PRIVILEGES ON lekcije_db.* TO 'lekcije_user'@'%';
FLUSH PRIVILEGES;
```

### 3. Konfiguracija backenda

Uredite `lekcije_app_be/src/main/resources/application.properties`:

```properties
spring.application.name=lekcije-app-be
spring.datasource.url=jdbc:mysql://localhost:3306/lekcije_db
spring.datasource.username=lekcije_user
spring.datasource.password=lekcije_pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### 4. Zagon backenda

#### Windows (PowerShell):

```powershell
cd lekcije_app_be
.\mvnw.cmd spring-boot:run
```

#### Linux/Mac:

```bash
cd lekcije_app_be
./mvnw spring-boot:run
```

Backend bo dostopen na: `http://localhost:8080`

### 5. Zagon frontenda

Odprite nov terminal:

```bash
cd lekcije_app_fe
npm install
npm run dev
```

Frontend bo dostopen na: `http://localhost:5173`

## Navodila za razvijalce

### Prispevanje k projektu

1. **Fork repozitorija** in klonirajte svojo kopijo
2. **Ustvarite novo vejo** za svojo funkcionalnost:
   ```bash
   git checkout -b feature/nova-funkcionalnost
   ```
3. **Commitajte spremembe**:
   ```bash
   git add .
   git commit -m "Dodana nova funkcionalnost"
   ```
4. **Pushajte na GitHub**:
   ```bash
   git push origin feature/nova-funkcionalnost
   ```
5. **Ustvarite Pull Request** na GitHubu

### Razvojno okolje

#### Backend razvojni ukazi:

```bash
# Zagon aplikacije
./mvnw spring-boot:run

# Build projekta
./mvnw clean install
```

#### Frontend razvojni ukazi:

```bash
# Zagon razvojnega strežnika
npm run dev

# Build za produkcijo
npm run build
```

### Struktura podatkovne baze

**Tabela: `lekcija`**

| Stolpec | Tip          | Opis                            |
| ------- | ------------ | ------------------------------- |
| id      | BIGINT (PK)  | Primarni ključ (auto-increment) |
| naziv   | VARCHAR(255) | Naslov lekcije                  |
| opis    | TEXT         | Opis lekcije                    |
| yt_url  | VARCHAR(255) | YouTube URL                     |

## API Dokumentacija

### Osnovna URL

```
http://localhost:8080/api/lekcije
```

### Endpoints

#### 1. Pridobi vse lekcije

```
GET /api/lekcije
```

**Odgovor:**

```json
[
  {
    "id": 1,
    "naziv": "Uvod v Java",
    "opis": "Osnove programskega jezika Java",
    "yt_url": "https://www.youtube.com/watch?v=..."
  }
]
```

#### 2. Pridobi lekcijo po ID

```
GET /api/lekcije/{id}
```

#### 3. Išči lekcije

```
GET /api/lekcije/search?q=java
```

#### 4. Ustvari novo lekcijo

```
POST /api/lekcije
Content-Type: application/json

{
  "naziv": "Uvod v Spring Boot",
  "opis": "Začetek dela s Spring Boot frameworkom",
  "yt_url": "https://www.youtube.com/watch?v=..."
}
```

#### 5. Posodobi lekcijo

```
PUT /api/lekcije/{id}
Content-Type: application/json

{
  "naziv": "Posodobljen naslov",
  "opis": "Posodobljen opis",
  "yt_url": "https://www.youtube.com/watch?v=..."
}
```

#### 6. Izbriši lekcijo

```
DELETE /api/lekcije/{id}
```

## Diagram Primerov Uporabe

![alt text](https://github.com/janmrkonjic/lekcije_app/blob/main/dokumentacija/dpu.png "Diagram primerov uporabe")

## Standardi kodiranja

### Java (Backend)

- **Konvencije**: Sledimo [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
- **Imenovanje**:
  - Razredi: `PascalCase` (npr. `LekcijaJpaDao`)
  - Metode in spremenljivke: `camelCase` (npr. `getAllLekcije()`)
  - Konstante: `UPPER_SNAKE_CASE` (npr. `MAX_SIZE`)
- **Package struktura**:
  - `dao` - podatkovni dostopni sloj
  - `rest` - REST kontrolerji
  - `vao` - entitete/modeli
- **Anotacije**: Uporabljamo Spring anotacije (`@RestController`, `@Service`, `@Repository`)

### TypeScript/React (Frontend)

- **Konvencije**: Sledimo [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- **Imenovanje**:
  - Komponente: `PascalCase` (npr. `LessonList.tsx`)
  - Funkcije in spremenljivke: `camelCase` (npr. `fetchLessons()`)
  - Konstante: `UPPER_SNAKE_CASE` (npr. `API_BASE_URL`)
- **Komponente**: Uporabljamo funkcijske komponente s hooks
- **Tipizacija**: Vedno uporabljamo TypeScript tipe in vmesnike
- **Styling**: CSS module ali inline styles


## Besednjak

| Izraz | Razlaga |
|-------|---------|
| **Lekcija** | Kratka lekcija sestavljena iz besedila, ki ga uporabnik prebere v približno 5 minutah in kviza, ki ga uporabnik reši da potrdi svoje znanje o novo osvojeni lekciji. |
| **Kviz** | Kviz na koncu lekcije, ki je sestavljen iz 3 vprašanj, vsako vprašanje pa ima 4 možne odgovore, od katerih je en pravilen. |
| **Opravljanje lekcije** | Uporabnik uspešno opravi lekcijo, če odgovori pravilno na vsa 3 vprašanja na kvizu. |
| **Dodajanje lekcije** | Prijavljen uporabnik lahko ustvari novo lekcijo z vnosom naslova, vsebine in kviza, ki ga sam ustvari. |
| **Submittanje lekcije za approval** | Pošiljanje lekcije v pregled, da jo admin potrdi (objavi) ali zavrne. |
| **Approval lekcije** | Če admin potrdi lekcijo, postane vidna vsem uporabnikom. |
| **Ocenjevanje lekcij** | Prijavljen uporabnik lahko oceni lekcijo z zvezdicami. |
| **Reševanje daily lekcije** | Vsak dan se uporabniku prikaže neka naključno izbrana lekcija, katero lahko reši in povečuje svoj "daily streak". |
| **Iskanje lekcij** | Uporabnik lahko lekcije išče  po naslovu, avtorju,... |
| **Filtriranje lekcij** | Uporabnik lahko lekcije filtrira glede na avtorja, tematiko, oceno, opravljenost,... |
| **Pregled lekcij** | Prikaz osnovnih informacij o vseh lekcijah (lahko so to vse objavljene lekcije ali pa vse lekcije, ki jih je ustvaril nek uporabnik in so lahko objavljene ali pa ne). |
| **Ogled lekcije** | Prikaz celotne lekcije z naslovom, vsebino in kvizom. |
| **Urejanje/brisanje uporabnikovih unpublished lekcij** | Prijavljen uporabnik lahko ureja in briše svoje lekcije, ki še niso bile objavljene. Ko je lekcija enkrat objavljena to ni več mogoče. |
| **Brisanje lekcij** | Admin lahko trajno izbriše katerokoli lekcijo iz sistema. |
| **Brisanje uporabnikov** | Admin lahko odstrani kateregakoli uporabnika iz sistema. |
| **Opomin preko e-pošte** | Sistem pošlje opomnik uporabniku, če je bila njegova lekcija potrjena/zavrnjena, če še ni rešil daily lekcije in adminu, če nekdo želi objaviti svojo lekcijo in je potrebna potrditev/zavrnitev iz njegove strani. |
