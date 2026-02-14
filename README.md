# React SPA Simpsons Data Visualizer

> This project is a Single Page Application (SPA) designed to visualize data from [The Simpsons API](https://thesimpsonsapi.com/). It serves as a technical exercise in **consuming APIs**, implementing the **MVVM pattern** in React, and **managing user state via external services** (Auth0 and Supabase).

---

## 📑 Table of Contents

* Features & Modules
* Project Structure
* Tech Stack & Dependencies
* Live Demo
* Getting Started
* Architecture Specifications
* The MVVM Pattern
* Authentication Flow (Auth0)
* Data Persistence (Supabase)
* Models
* ViewModels
* Views

---

## 🌟 Features & Modules

### Characters Visualization

* **Modes:** Grid (`CharactersGrid.jsx`) or List (`CharactersList.jsx`).
* **Detail View:** `ShowSingleCharacter.jsx` with Next/Previous navigation.
* **Filtering:** Gender, Status.
* **Search:** Autocomplete search bar showing 5 recommendations (fuzzy match).
> **Note:** Search is subject to active filters.



### Locations Visualization (Protected)

* **Modes:** Grid (`LocationsGrid.jsx`) or List (`LocationsList.jsx`).
* **Detail View:** `ShowSingleLocation.jsx` with Next/Previous navigation.
* **Filtering:** City (Springfield/Other), Usage (Residential/Non-residential).
* **Search:** Autocomplete search bar.

### User Profile

* **Access:** Protected (Auth0 required).
* **ID Card:** Displays user avatar, name, email, and fictional "Springfield Citizenship".
* **Favorites:** Displays user's favorited characters fetched from Supabase.
* **Empty State:** Encourages users to explore if no favorites exist.

### Authentication Components

* **Login:** Redirects to Auth0 Universal Login.
* **Logout:** Clears session and redirects to public area.

### Header & Navigation

* **Dynamic:** Adapts based on authentication state (Login vs Logout/Profile).
* **Responsive:** Switches to a hamburger menu on tablet/mobile.
* **Feedback:** Visual "Lock/Unlock" icons for protected routes.

### Footer

* **Content:** Branding, Course Info, Navigation Links, API Credits.
* **Layout:** Responsive vertical stacking on mobile.

### Home Page

* **Hero Section:** Call-to-action to explore characters.
* **Preview:** Displays a curated batch of characters.
* **Birthday Highlight:** Checks current date against character birthdays to display a celebratory highlight.
* **Auth Awareness:** Personalized welcome message for logged-in users.

### Top 5 Leaderboard

* **Data Source:** Aggregates votes from Supabase (`avg_donuts`, `total_votes`) and metadata from ViewModel.
* **Visualization:** Podium-style list with rank, avatar, and score.
* **Interactivity:** Clickable rows routing to Character Details.

---

## 📂 Project Structure

This project follows a **Model-View-ViewModel (MVVM)** architecture to separate business logic from UI rendering. Below is the directory overview to help you locate components, logic, and services.

```text
src/
│
├── assets/                       # Static assets
│   ├── Images/
│   └── GlobalStyle.css           # Global CSS variables and resets
│
├── compoundViews (views)/        # MVVM Views: High-level wrappers and page layouts
│   ├── MultipleElementsWrappers/ # Grid / list of elements wrapper (characters and locations)
│   └── SingleElementWrappers/    # Wrappers for detailed visualization of a single element
│
├── models/                       # MVVM Models: Functions to fetch data from the API
│
├── services/                     # Supabase API calls
│
├── simpleViews (components)/     # Reusable UI components (Presentational)
│   ├── Auth0/                    # Auth-related buttons/components
│   ├── Error pages/              # Components for page not found or access denied
│   ├── GridSubComponents/        # Grid visualization components
│   ├── Header & Footer/
│   ├── ListSubComponents/        # List visualization components
│   ├── ProfileComponents/
│   ├── SearchBar/                # Used in both characters and locations wrappers
│   ├── SingleElementContent/
│   ├── Top5/                     # Component to visualize a top 5 of most rated characters
│   ├── Home.jsx                  # Main Home View Entry
│   └── Home.module.css
│
├── viewModels/                   # MVVM ViewModels: 2-way-binding between Views and Model
│   ├── Common functions/         # Shared logic helpers
│   ├── CharactersViewModel.js
│   └── LocationsViewModel.js
│
├── App.css
├── App.jsx                       # Main App component & Routing
└── main.jsx                      # Entry point (DOM rendering)

```

---

## 🛠 Tech Stack & Dependencies

* **Frontend:** React (JavaScript)
* **Architecture:** MVVM (Model-View-ViewModel)
* **Authentication:** Auth0
* **Data Storage/User Prefs:** Supabase
* **External Data Source:** The Simpsons API
* **Routing:** React Router
* **Styling:** Pure CSS (Global variables) & CSS Modules (Component styles)

---

## 🌍 Link to already published example

### Deployed with GitHub Pages

👉 **[Click here to view the demo](https://alessiomeraldi.github.io/progetto-web-app/#/home)**

---

## 🚀 Getting Started

### Prerequisites

* Node.js (Version 18+ recommended for Vite)
* npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/AlessioMeraldi/progetto-web-app
cd progetto-web-app

```


2. **Install dependencies:**
```bash
npm install
# or
yarn install

```



### Environment Variables

This project was created with **Vite**, so environment variables must be prefixed with `VITE_` to be exposed to the client.

Create a `.env` file in the root directory and add the following keys:

```bash
# Auth0 Configuration
VITE_AUTH0_DOMAIN=[Your Auth0 Domain]
VITE_AUTH0_CLIENT_ID=[Your Auth0 Client ID]

# Supabase Configuration
VITE_SUPABASE_URL=[Your Supabase URL]
VITE_SUPABASE_ANON_KEY=[Your Supabase Anon Key]

```

> **Note:** No API key is needed to fetch data from the [Simpsons API](https://thesimpsonsapi.com/).

### Running the App

Runs the app in development mode.

```bash
npm run dev
```

Open the local host link provided in the terminal (usually [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)) to view it in the browser.

---

## 🏗 Architecture Specifications

### The MVVM Pattern

This application avoids putting logic inside UI components.

* **Model:** Responsible for the raw data. It handles the specific calls to the Simpsons API.
* **View (React Components):** Strictly presentational. These components receive data via props or hooks and trigger user intents. Some have a state for presentation purposes (such as displaying a grid or a list).
* **ViewModel (Custom Hooks):** The bridge. It fetches data from the Model, processes it (filtering, formatting), and exposes reactive state and methods to the View.

### Authentication Flow (Auth0)

This application uses Auth0 to handle user authentication in a secure and scalable way, without managing credentials directly inside the frontend.

**Authentication Providers**

* Standard Auth0 login (email + password)
* Social login providers: Google, Facebook, Twitter (X)

**Login & Logout**

* The login process is triggered via Auth0-provided methods and redirects the user to the Auth0 Universal Login page.
* After successful authentication, Auth0 redirects the user back to the application with a valid session.
* Logout clears the Auth0 session and returns the user to the public area of the SPA.

**User Session & State**

* Authentication state (logged / not logged) is managed entirely by Auth0.
* The application consumes Auth0’s hooks to check authentication status and access basic user profile information.
* No sensitive credentials are ever stored locally.

**Protected Routes**
Some sections (e.g., Locations, User Profile) are protected. If an unauthenticated user attempts to access a protected route, they are redirected to a dedicated error/access-denied page.

### Data Persistence (Supabase)

This application uses **Supabase** to persist user-specific data and manage ratings for characters.

#### Tables

**1.** `favourites_characters`
Stores the characters that a user has marked as favorite.

| Column | Description |
| --- | --- |
| `id` | Primary key for the table. |
| `created_at` | Timestamp indicating when the favorite was added. |
| `user_email` | Email of the user who favorited the character. |
| `character_id` | ID of the character that was favorited. |

**2.** `character_ratings`
Stores each vote a user gives to a character.

| Column | Description |
| --- | --- |
| `id` | Primary key for the table. |
| `created_at` | Timestamp of when the rating was submitted. |
| `character_id` | ID of the character being rated. |
| `user_email` | Email of the user who rated the character. |
| `donuts` | Numeric rating (number of donuts) the user gave. |

#### Views

**1.** `top_rated_characters`
A view that aggregates data from `character_ratings` to calculate:

* `avg_donuts`: The average donut rating for each character.
* `total_votes`: Total number of votes each character received.

#### Usage

* When a logged-in user favorites a character, a new row is inserted into `favourites_characters`.
* When a user rates a character, the rating is recorded in `character_ratings`.
* The `top_rated_characters` view is queried to display the leaderboard efficiently.
* Authentication checks ensure only the current user's data is modified.

### Models

The data layer is split into **`charactersModel.js`** and **`locationsModel.js`**. Both adhere to an identical structure.

#### Core Functions

**`fetchSingle[Resource]`** (e.g., `fetchSingleCharacter`)

* **Purpose:** Retrieves specific data for a single element based on its ID.
* **Logic:** Fetches JSON data and manually constructs the **Image URL string** based on the requested resolution (200px, 500px, or 1280px).
* **Return:** Object containing raw data and the ready-to-use image URL.

> **Note:** The API's object returns about half of the image's URL, so the model constructs the complete URL (with size) directly from the ID.

**`fetch[Resource]Batch`** (e.g., `fetchCharactersBatch`)

* **Purpose:** Used by fetchAll[Resources] to retrieve a specific element's batch.
* **Logic:** The API limits responses to **20 items per request**. This function accepts a `batchId` (page number).

**`fetchAll[Resources]`** (e.g., `fetchAllCharacters`)

* **Purpose:** Fetches the entire dataset (by invoking fetch[Resource]Batch multiple times) for client-side display, filtering, and search.
* **Performance Optimization:** Utilizes **`Promise.all`** to fire requests for all batches (60 for characters, 24 for locations) in parallel.

> **Note:** The much higher number of characters compared to locations has implications on both the ViewModel and Views.

### ViewModels

#### LocationsViewModel.js

This hook manages state and logic for Locations.

1. **Data Management:**
* **Single Location:** Fetches detailed data, toggling `isLoading`.
* **All Locations:** Retrieves **all batches** and flattens them into a single `allLocations` array. This "fetch-once" strategy enables instant client-side filtering.


2. **Reactive Filtering Pipeline:**
* A `useEffect` hook triggers automatically when filters change.
* Pipeline: Filter by City → Filter by Use → Filter by Name.


3. **Exposed Interface:**
* Data: `location`, `filteredLocations`, `isLoading`.
* Actions: `getSingleLocation`, `getAllLocations`, `updateFilter`.



#### CharactersViewModel.js

Functions similarly to LocationsViewModel but adds **Client-Side Pagination** due to the larger dataset (~1000+ characters).

1. **Dual-Layer State Management:**
* `filteredCharacters`: Complete list of matches.
* `displayedCharacters`: Slice of the list actually rendered by the DOM.


2. **Client-Side Pagination Logic:**
* Controlled by a `useEffect`.
* **Page 0:** Indices 0 to 600.
* **Page 1:** Indices 600 to end.
* Auto-resets to 0 when filters change.


3. **Specific Filtering Logic:**
* Gender (Male, Female, Other).
* Status (Alive, Deceased).


4. **Exposed Interface:**
* Includes `setPageNumber` to toggle between result batches.

---

## 🧩 Views

The view components within the project are split into two main groups:

1. **`compoundViews` (Views):** High-level wrappers used for conditional rendering (switching between grid/list) and adding filtering/navigation logic.
2. **`simpleViews` (Components):** The main library of UI components, ranging from strictly presentational ("dumb") elements to smart widgets with specific logic.

### 1. Compound Views (`compoundViews`)

The `compoundViews` directory acts as the orchestration layer. It is split into two sub-directories:

#### SingleElementsWrappers

**Purpose:** Wraps the display logic for individual data items (single character or location).

* **Functionality:**
* Adds navigation controls (**Previous** / **Next**) to scroll through the dataset.
* Validates parameters before rendering content.
* **Conditional Rendering:** Automatically hides the "Previous" button on the first item and the "Next" button on the last item.


* **Files:** `SingleCharacter.jsx` (wraps `ShowSingleCharacter.jsx`) and `SingleLocation.jsx` (wraps `ShowSingleLocation.jsx`).

#### MultipleElementsWrappers

**Purpose:** High-level **Container Views** that wrap the presentation components (`Grid` or `List`) with necessary UI controls.

* **Functionality:**
  * **Layout Management:** Handles the switching logic between Grid and List visualization modes.
  * **UI Composition:** Composes the final view by assembling the Search Bar, Filter inputs, and data display components.
  * **Integration:** Acts as the "glue" connecting dumb components to Business Logic (ViewModels) and Context (Auth0).


* **Files:**
* **`Locations.jsx`:** Wraps location components, adding search and filtering controls.
* **`Characters.jsx`:** A complex wrapper that integrates pagination controls and authenticates user context (Auth0) to manage the state of the "Favorites" feature before passing data down to the grid/list.



---

### 2. Simple Views (`simpleViews`)

This directory serves as the UI library. While most components are presentational, some contain specific local logic.

#### SearchBar

**Purpose:** A "smart" input component designed for filtering data with autocomplete capabilities.

* **Functionality:**
  * **Autocomplete Logic:** Filters `dataForAutocomplete` based on input, displaying a maximum of **5 suggestions** to keep the UI clean.
  * **Keyboard Navigation:** Users can press **ENTER** to submit or **TAB** to select the first suggestion.
  * **State Management:** Manages local state for input value/visibility but relies on a callback prop to trigger actual filtering in the parent ViewModel.
* **Files:** `SearchBar.jsx`

#### ProfileComponents

**Purpose:** UI components dedicated to User Identity and Session Management.

* **Functionality:** Interacts directly with the Auth0 SDK.
* **Files:**
  * `LoginButton.jsx` / `LogoutButton.jsx`: Trigger authentication flows.
  * `Profile.jsx`: Visualizes authenticated user metadata (image, name, email).



#### Data Collections (Grids & Lists)

**Purpose:** Pure presentation components responsible for rendering arrays of data.

* **Functionality:**
  * Receives filtered data (from `Characters.jsx` or `Locations.jsx`).
  * Renders in either a responsive **Grid** layout or detailed **List** format.
  * Handles internal iteration (mapping) over data arrays.
* **Files:**
  * `GridSubComponents`: `CharactersGrid.jsx`, `LocationsGrid.jsx`
  * `ListSubComponents`: `CharactersList.jsx`, `LocationsList.jsx`



#### SingleElementContent

**Purpose:** The "leaf" components for displaying full details of a specific item.

* **Functionality:** Receives a single data object and renders the specific HTML/CSS layout. These are wrapped by the *SingleElementsWrappers*.
* **Files:** `ShowSingleCharacter.jsx`, `ShowSingleLocation.jsx`

#### Top5 (Smart Widget)

**Purpose:** A specialized dashboard widget used to display top-rated items.

* **Functionality:** Unlike standard components, this widget **fetches its own data** by aggregating ratings from Supabase and character metadata from the ViewModel to display the leaderboard.
* **Files:** `Top5.jsx`

#### Home (Page Layout)

**Purpose:** The main landing page entry point.

* **Functionality:** Acts as a "Smart View" that:
  * Orchestrates the hero section.
  * Executes **"Birthday Highlight"** logic to find characters with birthdays today.
  * Manages conditional greetings for authenticated users.
* **Files:** `Home.jsx`

#### Global & Utility Components

* **Auth0:** `ProtectedRoute.jsx` (Security wrapper checking valid sessions).
* **Layout:** `Header.jsx` (Navigation) and `Footer.jsx` (Also contains Navigation).
* **Error Handling:** `Page_404.jsx` (Not Found) and `Access_forbidden.jsx` (403 Unauthorized).
