import React, { useState } from 'react';
import './App.css';

function AnimalForm({ onAnimalSubmit }) {
  const [animalData, setAnimalData] = useState({
    name: '',
    type: '',
    status: 'procura',
    breed: '',
    photoUrl: '',
    lastSeenLocation: '', // Adicionado o campo lastSeenLocation
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnimalSubmit(animalData);
    setAnimalData({
      name: '',
      type: '',
      status: 'procura',
      breed: '',
      photoUrl: '',
      lastSeenLocation: '',
    });
  };

  return (
    <form className='animal-form' onSubmit={handleSubmit}>
      <label htmlFor='name'>Nome do Animal:</label>
      <input
        type='text'
        id='name'
        name='name'
        value={animalData.name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor='type'>Tipo de Animal:</label>
      <select
        id='type'
        name='type'
        value={animalData.type}
        onChange={handleInputChange}
        required
      >
        <option value=''>Selecione o Tipo</option>
        <option value='cao'>Cão</option>
        <option value='gato'>Gato</option>
        <option value='passaro'>Pássaro</option>
        <option value='outro'>Outro</option>
      </select>

      <label htmlFor='status'>Status:</label>
      <select
        id='status'
        name='status'
        value={animalData.status}
        onChange={handleInputChange}
        required
      >
        <option value='procura'>A Procura</option>
        <option value='achado'>Achado</option>
      </select>

      <label htmlFor='breed'>Raça do Animal:</label>
      <input
        type='text'
        id='breed'
        name='breed'
        value={animalData.breed}
        onChange={handleInputChange}
        required
      />

      <label htmlFor='photoUrl'>URL da Foto do Animal:</label>
      <input
        type='url'
        id='photoUrl'
        name='photoUrl'
        value={animalData.photoUrl}
        onChange={handleInputChange}
        placeholder='http://example.com/photo.jpg'
      />

      <label htmlFor='lastSeenLocation'>Local da Última Vez Vista:</label>
      <input
        type='text'
        id='lastSeenLocation'
        name='lastSeenLocation'
        value={animalData.lastSeenLocation}
        onChange={handleInputChange}
      />

      <button type='submit'>Cadastrar Animal</button>
    </form>
  );
}

function App() {
  const [animalList, setAnimalList] = useState([]);

  const handleAnimalSubmit = (animalData) => {
    setAnimalList((prevList) => [...prevList, animalData]);
    console.log('Animal cadastrado:', animalData);
  };

  const handleRemover = (index) => {
    setAnimalList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <div className='animal'>
      <h1 className='titulo'>Cadastro de Animais</h1>
      <AnimalForm onAnimalSubmit={handleAnimalSubmit} />
      <div className='animal-list'>
        <h2>Lista de Animais</h2>
        <ul>
          {animalList.map((animal, index) => (
            <li key={index}>
              <img src={animal.photoUrl} alt={animal.name} style={{ width: '100px', height: 'auto' }} />
              {animal.name} - {animal.type} - {animal.status} - {animal.breed} - {animal.lastSeenLocation}
              <button onClick={() => handleRemover(index)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
