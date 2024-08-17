// File: app/components/ModelSelector.tsx
// Last updated: August 15, 2024

import React from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled: boolean;
  className?: string;
}

const models = ["gpt-3.5-turbo", "gpt-4"];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange, disabled, className }) => {
  return (
    <select
      value={selectedModel}
      onChange={(e) => onModelChange(e.target.value)}
      className={`p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 ${className}`}
      disabled={disabled}
    >
      {models.map((model) => (
        <option key={model} value={model}>
          {model}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;
