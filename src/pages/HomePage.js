import { HiPlus } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import DisplayDays from '../components/Days-Catches/DisplayDays';
import DisplayCatches from '../components/Days-Catches/DisplayCatches';
import DepthMap from '../images/DepthMap.svg';
import PageTitle from '../components/PageTitle';
import moment from 'moment';

export default function HomePage({
  filteredCards,
  handleDelete,
  showModal,
  cancelDelete,
  confirmDelete,
  profile,
}) {
  const [showData, setShowData] = useState(true);
  const [active, setActive] = useState(true);

  function showPage() {
    setShowData(!showData);
    setActive(!active);
  }

  console.log(filteredCards);

  const m = moment().startOf('day');

  const sortedCards = filteredCards.sort((a, b) => {
      const dateA = moment(a.date, 'YYYY-MM-DD');
      const dateB = moment(b.date, 'YYYY-MM-DD');
      return dateB.isAfter(dateA) ? 1 : -1;  // Neueste zuerst
    });

  console.log(sortedCards);

  const filteredCatches = sortedCards.filter(data => data.catches !== undefined).map(data => data.catches);
  console.log(filteredCatches)
  const catches = filteredCatches.flat();
  console.log(catches)

  return (
    <>
      <header>
        <LinkStyled to="/formpage">
          <PlusIcon size={35} color="#FF9C27" />
        </LinkStyled>
      </header>
      <Main>
        <Map src={DepthMap} alt="DepthMap" />
        <PageTitle
          text={
            profile.firstname
              ? 'Tight lines, ' + profile.firstname
              : 'Tight lines, '
          }
        />
        <Nav>
          <Page onClick={showPage} active={active}>
            Days
          </Page>
          <Page onClick={showPage} active={!active}>
            Catches
          </Page>
        </Nav>
        <div>
          {showData && (
            <DisplayDays
              sortedCards={sortedCards}
              showModal={showModal}
              handleDelete={handleDelete}
              confirmDelete={confirmDelete}
              cancelDelete={cancelDelete}
            />
          )}
          {!showData && <DisplayCatches catches={catches} />}
        </div>
      </Main>
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #687a48;
  margin-top: 15px;
  height: 25px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fffcf8;
  height: 25px;
  width: 100%;
  border-radius: 20px;
  z-index: 2;

  ${({ active }) =>
    active &&
    css`
      background-color: #a2c36c;
      color: #fffcf8;
    `};
`;

const PlusIcon = styled(HiPlus)`
  position: absolute;
  right: 10px;
`;

const LinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const Map = styled.img`
  position: fixed;
  top: 0px;
  right: 50px;
  height: 200px;
  z-index: -10;
`;

const Main = styled.div`
  margin: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
