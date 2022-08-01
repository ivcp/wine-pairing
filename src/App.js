import React, { useState } from 'react';
import Form from './components/Form';

function App() {
  const [searchByFood, setSearchByFood] = useState(false);
  return (
    <main>
      <Form searchByFood={searchByFood} />
    </main>
  );
}

export default App;
