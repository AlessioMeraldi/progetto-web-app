# [Project Name: e.g., Simpsons Data Visualizer]

> **Note:** This project is a Single Page Application (SPA) designed to visualize data
> from [The Simpsons API](https://thesimpsonsapi.com/). It serves as a technical exercise in consuming APIs, implementing
> the MVVM pattern in React, and managing user state via external services.

## 📖 Introduction

*[Briefly describe what the application does. Example: "This application allows users to browse Simpsons characters, rate them, and save preferences..."]*

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
├── compoundViews (views)/      # MVVM Views: High-level wrappers and page layouts
│   ├── MultipleElementsWrappers/
│   └── SingleElementWrappers/
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

* TODO

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

Runs the app in development mode. Open the local host link provided in the terminal (
usually [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)) to view it in the browser.

---

## 🏗 Architecture Specifications

### The MVVM Pattern

This application avoids putting logic inside UI components.

* **Model:** Responsible for the raw data. It handles the specific calls to the Simpsons API and Supabase tables.
  <br><br>
* **View (React Components):** Strictly presentational. These components receive data via props or hooks and trigger
  user intents. Some have a state for presentation purposes (such as displaying a grid or a list).
  <br><br>
* **ViewModel (Custom Hooks):** The bridge. It fetches data from the Model, processes it (filtering, formatting), and
  exposes reactive state and methods to the View.

### Authentication Flow (Auth0)

*[TODO: Explain how Auth0 is implemented]*

### Data Persistence (Supabase)

*[TODO: Explain what data is stored and how it's used]*

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

*[TODO]*

---