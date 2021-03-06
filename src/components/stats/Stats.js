import styled from 'styled-components';

export default function Profile({ filteredCards }) {
  const filteredCatches = filteredCards.map(data => data.catches);
  const catches = filteredCatches.flat();

  const succesRate = filteredCatches.length / filteredCards.length;
  const roundedNumber = Math.round((succesRate + Number.EPSILON) * 100) / 100;

  return (
    <StatsList>
      <Stats>
        catches <div>{catches.length}</div>
      </Stats>
      <Stats>
        trips <div>{filteredCards.length}</div>
      </Stats>
      <Stats>
        fish/trip <div>{roundedNumber ? roundedNumber : '0'}</div>
      </Stats>
    </StatsList>
  );
}

const StatsList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 0.5px solid #a2c36c;
  border-radius: 10px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  padding: 10px;
  background-color: white;
`;

const Stats = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 1rem;
  gap: 5px;
  width: 100%;
  color: #687a48;

  div {
    font-weight: bold;
    color: #ff9c27;
  }

  :nth-child(2) {
    border-left: 0.5px solid #a2c36c;
    border-right: 0.5px solid #a2c36c;
  }
`;
