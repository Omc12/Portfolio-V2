import React from 'react';
import Main from './components/initial.jsx';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App
