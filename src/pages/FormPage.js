import { NavLink } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { useState } from 'react';
import styled from 'styled-components';

import Start from '../components/form-pages/Start';
import Water from '../components/form-pages/Water';
import Weather from '../components/form-pages/Weather';
import Catch from '../components/form-pages/Catch';
import Summary from '../components/form-pages/Summary';
import NormalButton from '../components/NormalButton';

export default function FormPage({ onCreateCard }) {
  const [formData, setFormData] = useState('');

  const handleOnChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log('formData', formData);
    onCreateCard(formData);
  }

  const [page, setPage] = useState(0);

  const PageTitlesTop = ['Create a', 'Add', 'Add', 'Add', 'Last step:'];

  const PageTitlesBottom = [
    'new entry',
    'water data',
    'weather data',
    'your catches',
    'Summary',
  ];

  const Hint = ['1 of 5', '2 of 5', '3 of 5', '4 of 5', ' 5 of 5'];

  const PageDisplay = () => {
    if (page === 0) {
      return <Start handleOnChange={handleOnChange} formData={formData} />;
    } else if (page === 1) {
      return <Water handleOnChange={handleOnChange} formData={formData} />;
    } else if (page === 2) {
      return <Weather handleOnChange={handleOnChange} formData={formData} />;
    } else if (page === 3) {
      return <Catch handleOnChange={handleOnChange} formData={formData} />;
    } else {
      return <Summary handleOnChange={handleOnChange} formData={formData} />;
    }
  };

  return (
    <>
      <header>
        <LinkStyled to="/">
          <HiArrowLeft size={35} color="#FF9C27" />
        </LinkStyled>
      </header>
      <main>
        <Title>{PageTitlesTop[page]}</Title>
        <Title>{PageTitlesBottom[page]}</Title>
        <Small>{Hint[page]}</Small>
        <Progressbar>
          <div
            style={{
              width:
                page === 0
                  ? '20%'
                  : page == 1
                  ? '40%'
                  : page == 2
                  ? '60%'
                  : page == 3
                  ? '80%'
                  : '100%',
            }}
          ></div>
        </Progressbar>
        <Form
          aria-labelledby="form-name"
          onSubmit={handleSubmit}
          autoComplete="off"
          labeltext="form"
        >
          {PageDisplay()}
          <Buttons>
            <NormalButton
              text="Back"
              onClick={event => {
                event.preventDefault();
                setPage(currPage => currPage - 1);
              }}
              disabled={page == 0}
            />
            <NormalButton
              text={page === 4 ? 'Submit' : 'Next'}
              isAccent={true}
              onClick={event => {
                if (page === 4) {
                  alert('Form submitted');
                } else {
                  event.preventDefault();
                  setPage(currPage => currPage + 1);
                }
              }}
            />
          </Buttons>
        </Form>
      </main>
    </>
  );
}

const Title = styled.h1`
  color: #687a48;
  font-size: 32px;
  width: 100%;
  margin: 0;
`;

const Small = styled.small`
  font-size: 0.8rem;
  color: #aaa;
  position: absolute;
  right: 10px;
  top: 55px;
`;

const LinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const Progressbar = styled.div`
  border: 0.5px solid #ff9c27;
  height: 10px;
  border-radius: 10px;
  margin: 15px 0 15px;

  div {
    width: 20%;
    height: 100%;
    background-color: #a2c36c;
    border-radius: 10px;
  }
`;

const Form = styled.form`
  padding: 15px 10px 30px;
  background-color: #fffcf8;
  color: #a2c36c;
  border: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: right;
`;
