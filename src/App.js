import React from 'react';
import AppRoutes from './AppRoutes';

import Header from './base/components/Header';
import Footer from './base/components/Footer';

function App() {

  return (
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
  );

}

export default App;
