// app/showcase/ai-starter-stack/components/ModelContext.tsx
// August 22, 2024

// Import necessary React hooks and the list of models
import React, { createContext, useState, useContext } from 'react';
import { ModelKey } from './Models';

// Define the shape of our context
// This tells TypeScript what data and functions our context will contain
interface ModelContextType {
  selectedModel: ModelKey;  // The currently selected AI model
  setSelectedModel: (model: ModelKey ) => void;  // Function to update the selected model
}

// Create the context with an initial undefined value
// This context will hold our selected model and the function to change it
const ModelContext = createContext<ModelContextType | undefined>(undefined);

// Create the ModelProvider component
// This component will wrap parts of our app that need access to the model selection
export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up state for the selected model, initially choosing the first model in our list
  const [selectedModel, setSelectedModel] = useState<ModelKey>('gpt-4o-mini');

  // Provide the context value to all children components
  // Any component inside this Provider can access selectedModel and setSelectedModel
  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
};

// Custom hook to use the model context
// This makes it easy for any component to access and update the selected model
export const useModel = () => {
  // Attempt to get the context value
  const context = useContext(ModelContext);

  // If the context is undefined, it means we're trying to use it outside of a ModelProvider
  // This is an error, so we throw an informative message
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }

  // If everything is okay, return the context value
  // This gives components access to selectedModel and setSelectedModel
  return context;
};

// Last line