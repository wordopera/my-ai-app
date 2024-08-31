// app/showcase/ai-starter-stack/components/ModelSelector.tsx
// August 30, 2024

// Import necessary dependencies
import React from 'react';
// Import our custom hook to access the model context
import { useModel } from './ModelContext';
// Import the list of available models
import { models, modelMap } from './Models';

// Define the props that this component accepts
interface ModelSelectorProps {
  disabled: boolean;  // Whether the selector should be disabled
  className?: string; // Optional CSS classes to apply to the selector
}

// Define the ModelSelector component
const ModelSelector: React.FC<ModelSelectorProps> = ({ disabled, className }) => {
  // Use our custom hook to get the current model and the function to change it
  const { selectedModel, setSelectedModel } = useModel();

  // Render a select element
  return (
    <select
      // The current value of the select is the currently selected model
      value={selectedModel}
      // When a new option is selected, update the selected model
      onChange={(e) => setSelectedModel(e.target.value)}
      // Apply CSS classes for styling
      // This includes responsive sizing, colors, and any custom classes passed in
      className={`p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 ${className}`}
      // The select can be disabled based on the disabled prop
      disabled={disabled}
    >
      // dynamically generate dropdown based on the contents of the models array.
      {models.map((model) => (
  <option key={model} value={model}>
    {modelMap[model]}
  </option>
))}
    </select>
  );
};

// Export the component so it can be used in other parts of the app
export default ModelSelector;

// Last line