import React from 'react';
import Card from './components/Card';
import './Card.css';
function App() {
return (
<div className="App">
<h1>Lista de Projetos</h1>
<Card cardId="card1" title="Card 1" description="Descrição do Card 1" />
<Card cardId="card2" title="Card 2" description="Descrição do Card 2" />
<Card cardId="card3" title="Card 3" description="Descrição do Card 3" />
</div>
);}
export default App;
