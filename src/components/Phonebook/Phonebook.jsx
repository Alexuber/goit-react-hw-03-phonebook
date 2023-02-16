import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import styles from './Phonebook.module.scss';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class Phonebook extends Component {
  state = {
    ...INITIAL_STATE,
  };

  addNewContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
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

  render() {
    const {
      addNewContact,
      changeFilter,
      deleteContact,
      state: { value, contacts },
    } = this;
    const filtered = this.getFilteredContacts();

    return (
      <section>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} contacts={contacts} />
        <h2 className={styles.contactsTitle}>Contacts</h2>
        <Filter filter={changeFilter} value={value} />
        <ContactList contacts={filtered} deleteContact={deleteContact} />
      </section>
    );
  }
}
