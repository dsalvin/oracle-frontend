# 📊 Project: Oracle (Frontend)

This is the frontend for Project Oracle, a modern dashboard designed to visualize sales data and AI-powered forecasts. It's built with React (using Vite) and features a sleek, dark-mode UI designed with MUI.

---

### ✨ Core Features

-   **Modern UI/UX**: A responsive, dark-themed dashboard with a focus on clean design and data visualization.
-   **User Authentication**: Professional login/registration pages with email/password and Google Sign-In options.
-   **Interactive Charts**: Uses Recharts to display historical trends and future forecasts with confidence intervals.
-   **File Management**: A user-friendly interface for uploading CSV data.
-   **Actionable Insights**: Clearly displays AI-generated text summaries alongside charts.
-   **Data Export**: Allows users to download their forecast data as a CSV.

---

### 🛠️ Tech Stack

-   **Framework**: React (Vite)
-   **UI Library**: Material-UI (MUI)
-   **Charting**: Recharts
-   **Routing**: React Router
-   **Icons**: Lucide React
-   **API Communication**: Axios

---

### 🚀 Local Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd oracle-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory. This tells the frontend where to find the backend API.
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.