import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import styles from './Phonebook.module.scss';

export class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  render() {
    const { contacts } = this.state;

    return (
      <section>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />

        <h2 className={styles.contactsTitle}>Contacts</h2>
        <Filter />
        <ContactList contacts={contacts} />
      </section>
    );
  }
}
