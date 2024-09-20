import React, { useState } from 'react';

const valueAreas = [
  { id: 1, name: 'Operational efficiency' },
  { id: 2, name: 'Customer value' },
  { id: 3, name: 'Value Area 3' },
  { id: 4, name: 'Value Area 4' },
  { id: 5, name: 'Value Area 5' },
];

const applicationTypes = ['Chatbot', 'Content', 'API Integration'];
const horizons = ['FY25', 'FY26', 'FY27'];

const ValueAreaSelector = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});

  const handleApplicationTypeChange = (valueAreaId, appType) => {
    setSelections(prev => ({
      ...prev,
      [valueAreaId]: {
        ...prev[valueAreaId],
        applicationTypes: {
          ...prev[valueAreaId]?.applicationTypes,
          [appType]: !prev[valueAreaId]?.applicationTypes?.[appType]
        }
      }
    }));
  };

  const handleHorizonChange = (valueAreaId, horizon) => {
    setSelections(prev => ({
      ...prev,
      [valueAreaId]: {
        ...prev[valueAreaId],
        horizon
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < valueAreas.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentArea = valueAreas[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-6">{currentArea.name}</h2>
          <div className="flex justify-between text-white text-sm mb-2">
            <span>Step {currentStep + 1} of {valueAreas.length}</span>
            <span>{Math.round(((currentStep + 1) / valueAreas.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-8">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep + 1) / valueAreas.length) * 100}%` }}
            ></div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Application Types:</h4>
              <div className="flex flex-wrap gap-3">
                {applicationTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleApplicationTypeChange(currentArea.id, type)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selections[currentArea.id]?.applicationTypes?.[type]
                        ? 'bg-white text-indigo-600 shadow-lg transform -translate-y-1'
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Horizon:</h4>
              <div className="flex gap-3">
                {horizons.map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() => handleHorizonChange(currentArea.id, horizon)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selections[currentArea.id]?.horizon === horizon
                        ? 'bg-white text-indigo-600 shadow-lg transform -translate-y-1'
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    {horizon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'bg-white bg-opacity-20 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-indigo-600 hover:shadow-lg hover:transform hover:-translate-y-1'
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === valueAreas.length - 1}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                currentStep === valueAreas.length - 1
                  ? 'bg-white bg-opacity-20 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-indigo-600 hover:shadow-lg hover:transform hover:-translate-y-1'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueAreaSelector;