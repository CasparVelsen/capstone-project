import styled from 'styled-components';
import { useState } from 'react';

export default function EntryForm({ onCreateCard }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [target, setTarget] = useState('');

  return (
    <div>
      <Form
        aria-labelledby="formHeader"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Fieldset>
          <Legend>general infos</Legend>
          <label htmlFor="date">Date</label>
          <Input
            id="date"
            name="date"
            type="date"
            onChange={event => setDate(event.target.value)}
            value={date}
            required
          />
          <label htmlFor="time">Time</label>
          <Input
            id="time"
            name="time"
            type="time"
            onChange={event => setTime(event.target.value)}
            value={time}
            required
          />
          <label htmlFor="target-species">target species</label>
          <Input
            id="targetspecies"
            name="targetspecies"
            type="text"
            onChange={event => setTarget(event.target.value)}
            value={target}
            required
          />
        </Fieldset>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );

  function handleSubmit(event) {
    event.preventDefault();
    onCreateCard({
      date: date.split(',').map(name => name.trim()),
      time: time.split(',').map(name => name.trim()),
      target: target.split(',').map(name => name.trim()),
    });
    setDate('');
    setTime('');
    setTarget('');
  }
}

const Form = styled.form`
  padding: 0 10px;
`;

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 30px 0;
  border: none;
  border-top: 1px solid black;
  position: relative;
`;

const Legend = styled.legend`
  position: absolute;
  width: 100%;
  font-size: smaller;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
`;
