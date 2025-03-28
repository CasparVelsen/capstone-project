import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignupPage';
import RequirePermission from './components/RequirePermission';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const initalProfile = {
  _id: '',
  name: '',
};

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const [token, setToken] = useLocalStorage('token', {});
  const [profile, setProfile] = useState(initalProfile);

  const [cards, setCards] = useState([]);
  const filteredCards = cards.filter(card => card.author === profile._id);

  useEffect(() => {}, [token]);

  const loginWithNameAndPassword = async credentials => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setToken(data.token);
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('/api/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(setProfile);
  }, [token]);

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

  function onLogout() {
    setToken('');
    window.location.reload(false);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequirePermission token={token}>
              <HomePage
                showModal={showModal}
                filteredCards={filteredCards}
                handleDelete={handleDeleteCard}
                confirmDelete={handleConfirmDeleteCard}
                cancelDelete={() => setShowModal(false)}
                profile={profile}
              />
            </RequirePermission>
          }
        />
        <Route
          path="/formpage"
          element={
            <RequirePermission token={token}>
              <FormPage onCreateCard={createCard} profile={profile} />
            </RequirePermission>
          }
        />
        <Route
          path="/profile"
          element={
            <RequirePermission token={token}>
              <ProfilePage
                token={token}
                logout={onLogout}
                profile={profile}
                filteredCards={filteredCards}
              />
            </RequirePermission>
          }
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={loginWithNameAndPassword} />}
        />
        <Route path="/signup" element={<SignUp onCreateUser={createUser} />} />
      </Routes>
      <Footer>
        <Navigation />
      </Footer>
    </>
  );

  async function createCard(formData) {
    console.log(formData)
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

  function handleDeleteCard() {
    setShowModal(true);
  }

  async function handleConfirmDeleteCard(_id) {
    const filteredCards = cards.filter(card => card._id !== _id);
    setCards(filteredCards);
    setShowModal(false);

    await fetch('/api/cards', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
  }

  async function createUser(userData) {
    navigate('/profile');

    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  }
}

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
