import styled from 'styled-components';
import { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

export default function Weather({ handleOnChange }) {
  const [showInputs, setShowInputs] = useState(true);
  function toggleShowInputs() {
    setShowInputs(!showInputs);
  }

  return (
    <>
      <Section>
        <div onClick={toggleShowInputs}>
          <Title>
            Add weather data:
            {showInputs && (
              <AiOutlinePlusCircle onClick={toggleShowInputs} color="#FF9C27" />
            )}
            {!showInputs && (
              <AiOutlineMinusCircle
                onClick={toggleShowInputs}
                color="#FF9C27"
              />
            )}
          </Title>
        </div>
        {!showInputs && (
          <Fieldset>
            <Part>
              <label htmlFor="weather">Weather</label>
              <Select
                id="weather"
                name="weather"
                type="text"
                onChange={handleOnChange}
              >
                <option value="sunny">sunny</option>
                <option value="cloudy">cloudy</option>
                <option value="rainy">rainy</option>
                <option value="stormy">stormy</option>
                <option value="foggy">foggy</option>
                <option value="snow">snow</option>
              </Select>
            </Part>
            <Part>
              <label htmlFor="temperature">Temperature</label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                min={-50}
                max={50}
                maxLength={100}
                onChange={handleOnChange}
                placeholder="°C"
              />
            </Part>
            <Part>
              <label htmlFor="airpressure">Air pressure</label>
              <Input
                id="airpressure"
                name="airpressure"
                type="number"
                min={850}
                max={1150}
                onChange={handleOnChange}
                placeholder="850 - 1150"
              />
            </Part>
            <Part>
              <label htmlFor="moon">Moon phase</label>
              <Select
                id="moon"
                name="moon"
                type="text"
                maxLength={100}
                onChange={handleOnChange}
              >
                <option value="full moon">full moon</option>
                <option value="increasing moon">increasind moon</option>
                <option value="waning moon">waning moon</option>
                <option value="new moon">new moon</option>
              </Select>
            </Part>
            <Part>
              <label htmlFor="wind">Wind direction</label>
              <Input
                id="wind"
                name="wind"
                type="text"
                maxLength={100}
                onChange={handleOnChange}
              />
            </Part>
            <Part>
              <label htmlFor="windspeed">Wind speed</label>
              <Input
                id="windspeed"
                name="windspeed"
                type="number"
                min={0}
                onChange={handleOnChange}
                placeholder="min 0km/h"
              />
            </Part>
          </Fieldset>
        )}
      </Section>
    </>
  );
}

const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 5px 10px;
  border: 0.5px solid #a2c36c;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  margin-top: 20px;
`;

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 10px 0 30px;
  border: none;
  position: relative;
  font-size: 1rem;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
`;
