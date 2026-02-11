# React SPA Simpsons Data Visualizer

> This project is a Single Page Application (SPA) designed to visualize data
> from [The Simpsons API](https://thesimpsonsapi.com/). It serves as a technical exercise in **consuming APIs**, implementing
> the **MVVM pattern** in React, and **managing user state via external services** (Auth0 and Supabase).

---

## 📂 Project Structure

This project follows a **Model-View-ViewModel (MVVM)** architecture to separate business logic from UI rendering. Below
is the directory overview to help you locate components, logic, and services.

```text
src/
│
├── assets/                     # Static assets
│   ├── Images/
│   └── GlobalStyle.css         # Global CSS variables and resets
│
├── compoundViews (views)/          # MVVM Views: High-level wrappers and page layouts
│   ├── MultipleElementsWrappers/   # grid / list of elements wrapper (characters and locations)
│   └── SingleElementWrappers/      # wrappers for detailed visualization of a single element (character or location)
│
├── models/                     # MVVM Models: functions to fetch data from the API
│
├── services/                   # Supabase API calls
│
├── simpleViews (components)/   # Reusable UI components (Presentational)
│   ├── Auth0/                  # Auth-related buttons/components
│   ├── Error pages/            # Components for page not found or access denied (login required)
│   ├── GridSubComponents/      # Grid visualization components for characters and locations
│   ├── Header & Footer/
│   ├── ListSubComponents/      # List visualization components for characters and locations
│   ├── ProfileComponents/
│   ├── SearchBar/              # Used in both characters and locations wrappers
│   ├── SingleElementContent/
│   ├── Top5/                   # Component to visualize a top 5 of most rated characters
│   ├── Home.jsx                # Main Home View Entry
│   └── Home.module.css
│
├── viewModels/                 # MVVM ViewModels: 2-way-binding between Views and Model
│   ├── Common functions/       # Shared logic helpers
│   ├── CharactersViewModel.js
│   └── LocationsViewModel.js
│
├── App.css
├── App.jsx                     # Main App component & Routing
└── main.jsx                    # Entry point (DOM rendering)

```

---

## 🛠 Tech Stack & Dependencies

* **Frontend:** React (JavaScript)
* **Architecture:** MVVM (Model-View-ViewModel)
* **Authentication:** Auth0
* **Data Storage/User Prefs:** Supabase
* **External Data Source:** The Simpsons API
* **Routing:** React Router
* **Styling:** a pure CSS file containing only color and text variables, giving it global scope.
  CSS modules for the view components' style.

---

## 🌍 Link to already published example

### Deployed with GitHub Pages at the following URL:

* https://alessiomeraldi.github.io/progetto-web-app/#/home

---

## 🚀 Getting Started

### Prerequisites

* Node.js (Version 18+ recommended for Vite)
* npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/AlessioMeraldi/progetto-web-app
cd repo-name
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

### Environment Variables

This project was created with **Vite**, so environment variables must be prefixed with `VITE_` to be exposed to the
client.

Create a `.env` file in the root directory and add the following keys:

```bash
# Auth0 Configuration
VITE_AUTH0_DOMAIN=[Your Auth0 Domain]
VITE_AUTH0_CLIENT_ID=[Your Auth0 Client ID]

# Supabase Configuration
VITE_SUPABASE_URL=[Your Supabase URL]
VITE_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
```

**Note:** No API key is needed to fetch data from the [Simpsons API](https://thesimpsonsapi.com/).

### Running the App

```bash
npm run dev
```

Runs the app in development mode. Open the local host link provided in the terminal 
(usually [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)) to view it in the browser.

---

## 🏗 Architecture Specifications

### The MVVM Pattern

This application avoids putting logic inside UI components.

* **Model:** Responsible for the raw data. It handles the specific calls to the Simpsons API.
  <br><br>
* **View (React Components):** Strictly presentational. These components receive data via props or hooks and trigger
  user intents. Some have a state for presentation purposes (such as displaying a grid or a list).
  <br><br>
* **ViewModel (Custom Hooks):** The bridge. It fetches data from the Model, processes it (filtering, formatting), and
  exposes reactive state and methods to the View.

### Authentication Flow (Auth0)

This application uses Auth0 to handle user authentication in a secure and scalable way, 
without managing credentials directly inside the frontend.

Auth0 is configured as a Single Page Application (SPA) and integrated into React using the official 
Auth0 React SDK.

Authentication Providers
Users can authenticate using:

* **Standard Auth0 login (email + password)**

Social login providers:

* **Google**
* **Facebook**
* **Twitter (X)**

All providers are managed directly from the Auth0 dashboard and exposed to the 
application through a single, unified login flow.

**Login & Logout**

* The login process is triggered via Auth0-provided methods and redirects the user to the Auth0 Universal Login page.

* After successful authentication, Auth0 redirects the user back to the application with a valid session.

* Logout clears the Auth0 session and returns the user to the public area of the SPA.

**User Session & State**

* Authentication state (logged / not logged) is managed entirely by Auth0.

* The application consumes Auth0’s hooks to:
   - Check whether the user is authenticated
   - Access basic user profile information (such as name, email, and avatar)

* No sensitive credentials are ever stored locally.

**Protected Routes**

Some sections of the application (e.g. Locations visualization and user-specific features) 
are protected and require authentication.

* If an unauthenticated user attempts to access a protected route, they are redirected to a dedicated error / access-denied page.
* Once logged in, the user can freely navigate protected content without re-authenticating.

### Data Persistence (Supabase)

This application uses **Supabase** to persist user-specific data and manage ratings for characters. 
The database schema is structured to allow tracking of favorites, individual ratings, and 
aggregate top-rated characters.

#### Tables

1. **favourites_characters**
    * Stores the characters that a user has marked as favorite.
    * Columns:
        - `id`: Primary key for the table.
        - `created_at`: Timestamp indicating when the favorite was added.
        - `user_email`: Email of the user who favorited the character.
        - `character_id`: ID of the character that was favorited.

2. **character_ratings**
    * Stores each vote a user gives to a character in terms of donuts.
    * Columns:
        - `id`: Primary key for the table.
        - `created_at`: Timestamp of when the rating was submitted.
        - `character_id`: ID of the character being rated.
        - `user_email`: Email of the user who rated the character.
        - `donuts`: Numeric rating (number of donuts) the user gave.

#### Views

1. **top_rated_characters**
    * A view that aggregates data from `character_ratings` to calculate:
        - `avg_donuts`: The average donut rating for each character.
        - `total_votes`: Total number of votes each character received.
    * This is used to render the Top 5 leaderboard in the SPA without fetching or 
   processing all individual ratings on the client side.

#### Usage

* When a logged-in user favorites a character, a new row is inserted into `favourites_characters`.
* When a user rates a character, the rating is recorded in `character_ratings`.
* The `top_rated_characters` view is queried to display the leaderboard efficiently.
* There is always authentication checks, ensuring that only the current user's favorites or votes are modified.

This approach allows the application to provide **real-time updates** to the leaderboard and maintain a 
persistent record of user interactions while keeping the client-side logic minimal.


### Models

*[TODO]*

### ViewModels

*[TODO]*

### Views 

*[TODO]*

#### compoundViews (views)

*[TODO]*

#### simpleViews (components)

*[TODO]*

---

## 🧩 Features & Modules

*[TODO: List the main functional parts of the app]*

### Characters visualization

* **Characters visualization in a grid**: CharactersGrid.jsx (style from Grids.module.css)
* **Characters visualization in a list**: CharactersList.jsx (style from Lists.module.css)

*Character modules are shown in conditional rendering in the Characters.jsx wrapper*

* **Detailed single character visualization**: ShowSingleCharacter.jsx (style from SingleElements.moudle.css)

*Single character module is wrapped by SingleCharacter.jsx, it implements the "next" and "previous"
 buttons to scroll between characters*

* **Filtering**: filtering criteria: gender, status (alive or deceased).
* **Search**: searchbar (SearchBar.jsx) displays 5 recommendation that match the inserted string
  (anywhere, it could be contained within the name not just start with it). They can be clicked to
  only see the chosen character.

`Note: searchbar is subject to the inserted filters, and will not match characters that don't
 already match the given criteria (even if their complete name is written)`

### Locations visualization (access required)

`Analogous to the Locations visualization`

* **Locations visualization in a grid**: LocationsGrid.jsx (style from Grids.module.css)
* **Locations visualization in a list**: LocationsList.jsx (style from Lists.module.css)

*Character modules are shown in conditional rendering in the Locations.jsx wrapper*

* **Detailed single location visualization**: ShowSingleLocation.jsx (style from SingleElements.moudle.css)

*Single location module is wrapped by SingleLocation.jsx, it implements the "next" and "previous"
buttons to scroll between locations*

* **Filtering**: filtering criteria: city (Springfield or not), usage (residential or non-residential)
* **Search**: searchbar (SearchBar.jsx) displays 5 recommendation that match the inserted string
  (anywhere, it could be contained within the name not just start with it). They can be clicked to
  only see the chosen location.

`Note: searchbar is subject to the inserted filters, and will not match locations that don't
 already match the given criteria (even if their complete name is written)`

### User profile

The application includes a **dedicated user profile section**, accessible only to authenticated users, which acts as a personal dashboard for each Springfield citizen.

#### Profile access & authentication

* The Profile page is **protected** and rendered only if the user is authenticated via **Auth0**.
* Authentication state and user data are provided by the Auth0 React SDK.
* If the user is not authenticated, the Profile route is not accessible.

#### Springfield Identification Card

Once authenticated, the user is presented with a stylized **Springfield Identification Card**, built using Auth0 user metadata.

Displayed information includes:

* Profile picture (provided by Auth0)
* Full name
* Nickname
* Email address
* Last access date (client-side)
* Fictional residency information (Evergreen Terrace)
* Citizenship status stamp

All personal data displayed comes directly from the Auth0 user object and no sensitive information is stored manually in the application.

#### Favourite characters

The Profile page also displays the user’s **favourite characters**, persisted via **Supabase**.

* When the profile loads, the application:
    * Retrieves the authenticated user’s email from Auth0
    * Queries Supabase to fetch the list of favourite character IDs associated with that email
* Favourite characters are then rendered using the same reusable **CharactersGrid** component used elsewhere in the application.

#### Empty state handling

If the user has not saved any favourites yet:

* A dedicated empty state is shown
* The UI encourages the user to explore the Characters page
* A call-to-action button redirects directly to the Characters view

This improves UX while keeping the logic consistent across views.

### Login & Logout components

Authentication actions are handled through small, reusable UI components.

#### Login

* The **Login button** triggers Auth0’s `loginWithRedirect()` method.
* Users are redirected to the Auth0 Universal Login page.
* After successful authentication, the user is returned to the SPA with an active session.

#### Logout

* The **Logout button** is visible only when the user is authenticated.
* Clicking it calls Auth0’s `logout()` method, clearing the session.
* After logout, protected routes (Profile, Locations) are no longer accessible.

### Header & Navigation

The Header component represents the **main navigation system** of the application and plays a central role in both **user experience** and **access control**.

It is fully responsive, authentication-aware, and dynamically adapts its layout and content based on screen size and user state.

#### Structure and responsibilities

The Header is composed of three main logical areas:

* **Logo section**
* **Navigation links**
* **Authentication controls (Login / Logout)**

The Simpson logo acts as a home shortcut and is always visible across all viewports.

#### Authentication-aware navigation

The Header integrates tightly with **Auth0** to conditionally render navigation elements:

* When the user is **not authenticated**:
    * A Login button is displayed
    * The Locations section is visible but redirects to an access-forbidden page
    * A closed lock icon visually indicates restricted access

* When the user **is authenticated**:
    * The Login button is replaced by a Logout button
    * The Profile link becomes visible
    * The Locations section becomes accessible and displays an open lock icon

This approach provides both **functional** and **visual feedback** about user permissions without hiding application features.

#### Responsive behaviour & hamburger menu

The Header maintains a classic horizontal navigation on desktop screens, while switching to a **hamburger-based menu** on tablet and mobile devices.

* From tablet breakpoint downward:
    * Navigation links collapse into a vertical menu
    * A hamburger button appears next to the logo
    * Menu visibility is controlled via internal React state

* Clicking the hamburger:
    * Toggles the visibility of the navigation menu
    * Allows users to access all routes comfortably on small screens

* Clicking the logo or a navigation link:
    * Automatically closes the menu, improving mobile UX

This solution ensures usability consistency across desktop, tablet, and mobile devices.

#### Routing and active state

* Navigation links are implemented using `NavLink`
* The active route is visually highlighted
* Styles are shared across desktop and mobile layouts for consistency

### Footer

The Footer component provides **secondary navigation**, contextual information, and proper attribution for external resources.

It is fully responsive and visually consistent with the rest of the application.

#### Structure and content

The Footer is composed of four main sections:

* **Branding**
    * Displays the Simpsons logo for visual continuity

* **Course information**
    * Passed as a prop to keep the component reusable

* **Navigation links**
    * Uses `NavLink` to maintain routing consistency with the Header

* **API credits**

#### Design considerations

* The Footer layout stacks vertically on smaller screens

The Footer acts as a stable closing element for every page, reinforcing navigation, transparency, and academic context without overwhelming the main content.

### Home

The **Home** page acts as the entry point of the application and provides a guided overview of its main features.

It combines editorial content, data-driven previews, and user-specific messaging to immediately introduce the Springfield universe.

The page opens with a **hero section** featuring the project branding and a clear call-to-action that invites users to explore the Characters section.

Below the hero, a **characters preview** displays a small curated batch of characters fetched from the API. This preview offers a glimpse of Springfield’s residents and encourages users to navigate to the full Characters page for deeper exploration.

A dedicated **birthday highlight** section adds a dynamic touch to the experience. Each day, the application checks whether any character’s birthday matches the current date and, if so, highlights them. If no birthdays are found, a fallback message is shown instead.

The Home page also adapts to the user’s authentication state:

* **Authenticated users** are welcomed by name and invited to visit their Profile, where they can manage favourite characters and access restricted content.
* **Unauthenticated users** are encouraged to log in via Auth0, with a clear explanation of the additional features unlocked by authentication.

Overall, the Home page blends discovery, engagement, and personalization while remaining lightweight and easy to navigate.

### Top 5 Leaderboard

The **Top 5** section showcases the five most appreciated characters based on user votes stored in **Supabase**.

Each vote assigns a donut score to a character, and Supabase aggregates this data to calculate both the **average rating** and the **total number of votes**. This allows the leaderboard to always reflect the current preferences of the community.

When the component loads, two data sources are fetched in parallel:

* The Top 5 ranked characters from Supabase
* The complete character dataset via the Characters ViewModel

Supabase provides the ranking and voting statistics, while the ViewModel supplies character names and additional metadata. Once both datasets are available, the leaderboard is rendered.

The leaderboard is presented as a podium-style list, where each entry displays:

* Rank position
* Character avatar and name
* Total number of votes
* Average donut score 

Each row is fully clickable and routes the user to the corresponding **Character Detail** page, creating a smooth transition from ranking overview to detailed exploration.

The Top 5 page connects user interaction, Supabase-backed data, and character navigation into a single, engaging feature.

---