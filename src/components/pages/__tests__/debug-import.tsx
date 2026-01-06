import React from 'react';

// Simple test to check if ServicesPageInteractive can be imported
const TestServicesPage = () => {
  try {
    const ServicesPageInteractive =
      require('../ServicesPageInteractive.tsx').ServicesPageInteractive;
    return <div>Component imported successfully: {ServicesPageInteractive ? 'Yes' : 'No'}</div>;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return <div>Import failed: {message}</div>;
  }
};

export default TestServicesPage;
