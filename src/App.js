import React, { useState } from 'react';
import Form from './components/Form';

function App() {
  const [searchByFood, setSearchByFood] = useState(true);

  return (
    <main>
      <Form searchByFood={searchByFood} />
    </main>
  );
}

export default App;
