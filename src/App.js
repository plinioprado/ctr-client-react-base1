import React from 'react';
import AppRoutes from './AppRoutes';

import Header from './ledger1/components/Header';
import Footer from './ledger1/components/Footer';

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
