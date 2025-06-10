import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Axxi - Interactive App" },
    { name: "description", content: "Interactive application with working buttons!" },
  ];
};

export default function Index() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Welcome to Axxi!");
  const [colorTheme, setColorTheme] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const themes = [
    { name: "Blue", bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200", button: "bg-blue-500 hover:bg-blue-600", counter: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700" },
    { name: "Green", bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200", button: "bg-green-500 hover:bg-green-600", counter: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700" },
    { name: "Purple", bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-200", button: "bg-purple-500 hover:bg-purple-600", counter: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-700" },
    { name: "Red", bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200", button: "bg-red-500 hover:bg-red-600", counter: "text-red-600 dark:text-red-400", border: "border-red-200 dark:border-red-700" },
    { name: "Indigo", bg: "bg-indigo-100 dark:bg-indigo-900", text: "text-indigo-800 dark:text-indigo-200", button: "bg-indigo-500 hover:bg-indigo-600", counter: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-700" },
  ];

  const currentTheme = themes[colorTheme];

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setMessage(`Count increased to ${count + 1}!`);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
    setMessage(`Count decreased to ${count - 1}!`);
  };

  const handleReset = () => {
    setCount(0);
    setMessage("Counter reset!");
  };

  const changeColor = () => {
    const nextTheme = (colorTheme + 1) % themes.length;
    setColorTheme(nextTheme);
    setMessage(`Color changed to ${themes[nextTheme].name}!`);
  };

  const openModal = () => {
    setShowModal(true);
    setMessage("Modal opened!");
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage("Modal closed!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            🚀 Axxi Interactive App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            All buttons are working! Test them below.
          </p>
        </header>

        {/* Status Message */}
        <div className={`text-center mb-8 p-4 rounded-lg border ${currentTheme.bg} ${currentTheme.border}`}>
          <p className={`text-lg font-medium ${currentTheme.text}`}>
            {message}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Counter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              🔢 Counter Functions
            </h2>
            
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-4 ${currentTheme.counter}`}>
                {count}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleIncrement}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                ➕ Increment
              </button>
              
              <button
                onClick={handleDecrement}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                ➖ Decrement
              </button>
              
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Interactive Controls Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              🎨 Interactive Controls
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={changeColor}
                className={`w-full px-6 py-4 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${currentTheme.button}`}
              >
                🎨 Change Theme Color
              </button>
              
              <button
                onClick={openModal}
                className="w-full px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                📋 Open Modal Dialog
              </button>
              
              <button
                onClick={() => {
                  const randomMessage = [
                    "Hello there! 👋",
                    "Buttons are working perfectly! ✅",
                    "This is amazing! 🎉",
                    "Keep clicking! 🖱️",
                    "Interactive magic! ✨"
                  ][Math.floor(Math.random() * 5)];
                  setMessage(randomMessage);
                }}
                className="w-full px-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                🎲 Random Message
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              🎉 Modal Working!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This modal demonstrates that all interactive elements are functioning correctly.
              The buttons are responsive and all state management is working perfectly!
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setMessage("Modal button clicked! 🎯");
                  closeModal();
                }}
                className={`px-6 py-2 text-white font-semibold rounded-lg transition-colors ${currentTheme.button}`}
              >
                Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: "🎯",
    title: "Working Buttons",
    description: "All interactive elements respond to clicks"
  },
  {
    icon: "🔄",
    title: "State Management",
    description: "React state updates in real-time"
  },
  {
    icon: "🎨",
    title: "Dynamic Styling",
    description: "Colors and themes change instantly"
  },
  {
    icon: "📱",
    title: "Responsive Design", 
    description: "Works on all screen sizes"
  }
];

const features = [
  {
    icon: "🎯",
    title: "Working Buttons",
    description: "All interactive elements respond to clicks"
  },
  {
    icon: "🔄",
    title: "State Management",
    description: "React state updates in real-time"
  },
  {
    icon: "🎨",
    title: "Dynamic Styling",
    description: "Colors and themes change instantly"
  },
  {
    icon: "📱",
    title: "Responsive Design", 
    description: "Works on all screen sizes"
  }
];
