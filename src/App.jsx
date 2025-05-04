import React, { useEffect, useState } from "react";

/**
 * The Dot - Undo/Redo Functionality Demo
 *
 * This component demonstrates how to implement undo/redo functionality in React
 * using state management with history tracking.
 */
const App = () => {
  // currentIndex tracks our position in the history array
  // -1 means no dots have been placed yet
  const [currentIndex, setCurrentIndex] = useState(-1);

  // history stores all states of our application
  // each item in the array represents a complete state of dots on the screen
  const [history, setHistory] = useState([]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [currentIndex, history]);

  /**
   * Handles mouse clicks on the canvas to add new dots
   *
   * This is the core function that manages state updates when adding new dots:
   * 1. Gets the current state based on currentIndex
   * 2. Adds the new dot to that state
   * 3. Discards any future states (if we've previously undone actions)
   * 4. Updates the history array and currentIndex
   */
  function handleMouseDown(e) {
    // Ignore clicks on buttons
    if (e.target.tagName === "BUTTON") return;

    // Get current state of dots
    const currentLocations = currentIndex >= 0 ? history[currentIndex] : [];

    // Create new dot at click position
    const newPoint = { x: e.offsetX, y: e.offsetY };

    // Add new dot to current state
    const updated = [...currentLocations, newPoint];

    // Create new history by slicing up to current index and adding new state
    // This effectively discards any future states if we've undone actions
    const newHistory = [...history.slice(0, currentIndex + 1), updated];

    // Update history and move currentIndex forward
    setHistory(newHistory);
    setCurrentIndex(currentIndex + 1);
  }

  /**
   * Handles the undo operation
   *
   * Moves back one step in history by decrementing currentIndex
   */
  function handleUndo(e) {
    e.stopPropagation();
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  /**
   * Handles the redo operation
   *
   * Moves forward one step in history by incrementing currentIndex
   * Only works if we have previously undone actions
   */
  function handleRedo(e) {
    e.stopPropagation();
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  // Get the current state of dots based on currentIndex
  const locations = currentIndex >= 0 ? history[currentIndex] : [];

  return (
    <div className="relative bg-white  font-light">
      {/* Header with title and instructions */}
      <header className="bg-white border-b border-gray-200 p-8">
        <h1 className="text-3xl font-extralight text-center text-gray-800">
          The Dot
        </h1>
        <p className="text-center text-gray-400 text-sm mt-3 tracking-wide">
          Click anywhere to add dots. Use the controls to undo/redo your
          actions.
        </p>
      </header>

      {/* Main canvas area */}
      <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
        {/* Control buttons */}
        <div className="absolute top-8 left-0 right-0 flex justify-center items-center gap-6 z-10">
          <button
            className="px-6 py-2 border border-gray-200 rounded-full text-gray-600 text-sm tracking-wide transition-all hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200"
            onMouseDown={(e) => handleUndo(e)}
            disabled={currentIndex < 0}
          >
            ← Undo
          </button>
          <button
            className="px-6 py-2 border border-gray-200 rounded-full text-gray-600 text-sm tracking-wide transition-all hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200"
            onMouseDown={(e) => handleRedo(e)}
            disabled={currentIndex >= history.length - 1}
          >
            Redo →
          </button>
        </div>

        {/* Status indicator */}

        {/* Render dots */}
        {locations.map((location, index) => (
          <div
            key={index}
            style={{ left: location.x - 10, top: location.y - 10 }}
            className="absolute w-4 h-4 bg-gray-900 rounded-full shadow-sm transition-all duration-300 ease-in-out transform hover:scale-110"
          />
        ))}
      </div>

      {/* Footer with GitHub link */}
      <footer className="absolute bottom-10 w-full border-t border-gray-200 p-4 text-center text-xs">
        <p className="text-gray-400">
          View the{" "}
          <a
            href="https://github.com/sanjay10985/undo-redo"
            className="text-gray-600 hover:text-gray-800 transition-colors"
            target="_blank"
          >
            source code on GitHub
          </a>
        </p>
        <div className="mt-2 text-center text-gray-400 text-sm tracking-wide">
          {locations.length === 0 ? (
            <p>Canvas is empty. Click anywhere to begin.</p>
          ) : (
            <p>
              {locations.length} dots · {history.length} states · position{" "}
              {currentIndex + 1}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;
