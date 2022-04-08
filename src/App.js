import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export default function App() {
  const [cards, setCards] = useState([]);
  console.log(cards);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/cards').then(async res => {
      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        return [];
      }
      setCards([...data]);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage cards={cards} handleDelete={handleDeleteCard} />}
        />
        <Route
          path="/formpage"
          element={<FormPage onCreateCard={createCard} />}
        />
      </Routes>
      <Footer>
        <Navigation />
      </Footer>
    </>
  );

  async function createCard(formData) {
    setCards([...cards, formData]);
    navigate('/');

    await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }

  async function handleDeleteCard(_id) {
    const filteredCards = cards.filter(card => card._id !== _id);
    setCards(filteredCards, false);

    await fetch('/api/cards', {
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
  }
}

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
