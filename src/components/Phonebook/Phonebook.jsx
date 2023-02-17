import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import styles from './Phonebook.module.scss';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export class Phonebook extends Component {
  state = {
    ...INITIAL_STATE,
  };

  addNewContact = data => {
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

  render() {
    const {
      addNewContact,
      changeFilter,
      deleteContact,
      state: { filter, contacts },
    } = this;
    const filtered = this.getFilteredContacts();

    return (
      <section>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} contacts={contacts} />
        <h2 className={styles.contactsTitle}>Contacts</h2>
        <Filter onChangeFilter={changeFilter} value={filter} />
        <ContactList contacts={filtered} deleteContact={deleteContact} />
      </section>
    );
  }
}
