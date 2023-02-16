import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactsForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { contacts } = this.props;
    const allContactsNames = contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (allContactsNames.includes(name.toLowerCase())) {
      alert(`${name} already in contacts`);
      this.reset();
      return;
    } else {
      const newContact = { id: nanoid(), name, number };
      this.props.addNewContact(newContact);
      this.reset();
    }
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const userNameId = nanoid();
    const userTelId = nanoid();
    const { handleFormSubmit, handleChange } = this;

    return (
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label} htmlFor={userNameId}>
          Name
        </label>
        <input
          className={styles.input}
          onChange={handleChange}
          id={userNameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
        />
        <label className={styles.label} htmlFor={userTelId}>
          Number
        </label>
        <input
          className={styles.input}
          onChange={handleChange}
          id={userTelId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
        />
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
