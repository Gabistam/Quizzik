import React from 'react';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ backgroundImage: "url(https://images3.alphacoders.com/169/169665.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      <header className=" p-10" style={{ backgroundImage: "url(https://img.freepik.com/premium-vector/space-background-blue-violet-black-background_624315-118.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85 }}>
        <h1 className="text-6xl font-bold text-center text-white" >Quizzik</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <Quiz />
      </main>
    </div>
  );
}

export default App;