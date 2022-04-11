import styled from 'styled-components';
import DeleteModal from '../modal/DeleteModal';
import CatchCard from './CatchCard';

export default function DisplayCatches({
  catches,
  onDeleteCatch,
  confirmDeleteCatch,
  cancelDeleteCatch,
  showCatchModal,
}) {
  return (
    <>
      <Catches>
        {catches ? (
          catches.map((data, tempId, _id) => (
            <li key={tempId}>
              <CatchCard data={data} onDelete={onDeleteCatch} />
            </li>
          ))
        ) : (
          <p>no catches yet</p>
        )}
      </Catches>
      {showCatchModal && (
        <Container>
          <Modal>
            <Title>Are you sure?</Title>
            <DeleteModal
              text="catch"
              confirmDelete={confirmDeleteCatch}
              cancelDelete={cancelDeleteCatch}
            />
          </Modal>
        </Container>
      )}
    </>
  );
}

const Catches = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 10px;
  list-style: none;
  padding: 0;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h3`
  font-weight: bolder;
  font-size: 1.3rem;
  margin: 0;
  color: #687a48;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  background-color: white;
  border: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
  z-index: 10px;
  bottom: 75px;
  padding: 10px;
`;