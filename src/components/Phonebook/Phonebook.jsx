import { useState, useEffect, useRef, Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import getDataFromLocalStorage from 'shared/utils/localStorage';
import styles from './Phonebook.module.scss';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export const Phonebook = () => {
  const [contacts, setContacts] = useState(() =>
    getDataFromLocalStorage('contacts', [])
  );

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    console.log('use -->');

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = data => {
    const { name, number } = data;
    const normalizedNames = contacts.map(contact => contact.name.toLowerCase());
    const allTelephones = contacts.map(contact => contact.number);

    if (normalizedNames.includes(name.toLowerCase())) {
      alert(`${name} already in contacts`);
      return;
    } else if (allTelephones.includes(number)) {
      alert(`${number} already in contacts`);
      return;
    }
    const newContact = { ...data, id: nanoid(8) };
    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const filtered = getFilteredContacts();

  return (
    <section>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter onChangeFilter={changeFilter} value={filter} />
      <ContactList contacts={filtered} deleteContact={deleteContact} />
    </section>
  );
};

export class Phonebooks extends Component {
  state = {
    ...INITIAL_STATE,
  };

  addNewContact = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    const normalizedNames = contacts.map(contact => contact.name.toLowerCase());
    const allTelephones = contacts.map(contact => contact.number);

    if (normalizedNames.includes(name.toLowerCase())) {
      alert(`${name} already in contacts`);
      return;
    } else if (allTelephones.includes(number)) {
      alert(`${number} already in contacts`);
      return;
    }
    const newContact = { ...data, id: nanoid(8) };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contatcs !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const {
      addNewContact,
      changeFilter,
      deleteContact,
      state: { filter },
    } = this;
    const filtered = this.getFilteredContacts();

    return (
      <section>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2 className={styles.contactsTitle}>Contacts</h2>
        <Filter onChangeFilter={changeFilter} value={filter} />
        <ContactList contacts={filtered} deleteContact={deleteContact} />
      </section>
    );
  }
}
