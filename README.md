# The Dot - Undo/Redo Functionality Demo

## Overview

This project demonstrates the implementation of undo/redo functionality in a React application. It's a simple interactive canvas where users can place dots by clicking, and then undo or redo their actions using dedicated buttons.

## Live Demo

Visit the live demo: [The Dot on Vercel](https://the-dot.vercel.app/)

## Features

- **Interactive Canvas**: Click anywhere to place dots
- **Undo Functionality**: Remove the most recently placed dot
- **Redo Functionality**: Restore previously undone dots
- **History Management**: Complete state management for all user actions

## How It Works

The application uses React's state management to implement the undo/redo functionality:

1. **State Management**:

   - `history`: An array that stores the state at each step
   - `currentIndex`: Tracks the current position in the history array

2. **Adding Dots**:

   - When a user clicks, a new dot is added to the current state
   - The new state is added to the history array
   - Any future states (if we've undone actions) are discarded

3. **Undo Operation**:

   - Decrements the `currentIndex` to move back in history
   - The UI renders the state at the new index

4. **Redo Operation**:
   - Increments the `currentIndex` to move forward in history
   - Only works if we've previously undone actions

## Technical Implementation

The core logic is implemented in `App.jsx` using React hooks:

```jsx
// State initialization
const [currentIndex, setCurrentIndex] = useState(-1);
const [history, setHistory] = useState([]);

// Undo function
function handleUndo(e) {
  e.stopPropagation();
  if (currentIndex >= 0) {
    setCurrentIndex(currentIndex - 1);
  }
}

// Redo function
function handleRedo(e) {
  e.stopPropagation();
  if (currentIndex < history.length - 1) {
    setCurrentIndex(currentIndex + 1);
  }
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/the-dot.git
   cd the-dot
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy your application

## Built With

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project serves as an educational resource for understanding state management in React
- Inspired by the need to demonstrate practical implementations of undo/redo functionality
