import React, { useEffect, useState } from "react";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [currentIndex, history]);

  function handleMouseDown(e) {
    if (e.target.tagName === "BUTTON") return;

    const currentLocations = currentIndex >= 0 ? history[currentIndex] : [];
    const newPoint = { x: e.offsetX, y: e.offsetY };
    const updated = [...currentLocations, newPoint];

    const newHistory = [...history.slice(0, currentIndex + 1), updated];

    setHistory(newHistory);

    setCurrentIndex(currentIndex + 1);
  }

  function handleUndo(e) {
    e.stopPropagation();
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleRedo(e) {
    e.stopPropagation();
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const locations = currentIndex >= 0 ? history[currentIndex] : [];

  return (
    <div className="relative">
      <div className="w-full h-screen flex justify-center items-center gap-4">
        <button
          className="bg-amber-400 px-4 py-2"
          onMouseDown={(e) => handleUndo(e)}
        >
          Undo
        </button>
        <button
          className="bg-amber-400 px-4 py-2"
          onMouseDown={(e) => handleRedo(e)}
        >
          Redo
        </button>
      </div>
      {locations.map((location, index) => (
        <div
          key={index}
          style={{ left: location.x - 10, top: location.y - 10 }}
          className="absolute w-4 h-4 bg-black rounded-full"
        />
      ))}
    </div>
  );
};

export default App;
