import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/CallToApi';
import Filters from './Filters';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [houseFilter, setHouseFilter] = useState('gryffindor');

  useEffect(() => {
    callToApi(houseFilter).then((data) => setCharacters(data));
  }, [houseFilter]);

  //EVENTOS-------------------------------------------

  const handleFilter = (data) => {
    if (data.key === 'name') {
      setNameFilter(data.value);
    } else if (data.key === 'house') {
      setHouseFilter(data.value);
    }
  };

  // RENDER----------------------------------------------

  const filteredCharacters = characters.filter((character) => {
    return character.name
      .toLocaleLowerCase()
      .includes(nameFilter.toLocaleLowerCase());
  });

  // const renderCharacterDetail = (props) => {
  //   const characterId = props.match.params.characterId;

  //   const foundCharacter = characters.find((character) => {
  //     return character.id === characterId;
  //   });

  //   if (foundCharacter !== undefined) {
  //     return <CharacterDetail character={foundCharacter} />;
  //   }
  // };
  const renderCharacterDetail = (props) => {
    const routeId = parseInt(props.match.params.id);

    const findCharacter = characters.find((character) => character.id === routeId);

    return <CharacterDetail character={findCharacter} />;

  }


  return (
    <div>
      <main>
        <h1 className="page__title">Harry Potter</h1>
        <Switch>
          <Route path="/" exact>
            <Filters handleFilter={handleFilter} />

            <CharacterList characters={filteredCharacters} />

            <footer className="footer">
              <p>texto para el footer</p>
            </footer>
          </Route>
          <Route path="/character/:id" render={renderCharacterDetail} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
