import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// libraries
import { nanoid } from 'nanoid';

// components
import { Phonebook } from 'components/Phonebook/Phonebook';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

const App = () => {
  let [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Billy Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Bobby Kline', number: '443-89-12' },
  ]);
  let [filter, setFilter] = useState('');
  let [name, setName] = useState('');
  let [number, setNumber] = useState('');

  const onTypeName = e => {
    setName(e.target.value);
  };

  const onTypeNumber = e => {
    setNumber(e.target.value);
  };

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const addContact = e => {
    e.preventDefault();
    const newContactName = name;

    if (
      contacts.some(
        ({ name }) => newContactName.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${newContactName} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: newContactName,
      number: number,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const onDeleteContact = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idToDelete),
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Phonebook
        onTypeName={onTypeName}
        onTypeNumber={onTypeNumber}
        addContact={addContact}
      />
      <h2>Contacts</h2>
      <Filter onFilterChange={onFilterChange} />
      <Contacts
        onDeleteContact={onDeleteContact}
        contacts={contacts}
        filter={filter}
      />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
