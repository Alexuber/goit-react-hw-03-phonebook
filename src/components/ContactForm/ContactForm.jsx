import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  static propTypes = {
    addNewContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };
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
    const normalizedNames = contacts.map(contact => contact.name.toLowerCase());
    const allTelephones = contacts.map(contact => contact.number);

    if (normalizedNames.includes(name.toLowerCase())) {
      alert(`${name} already in contacts`);
      this.reset();
      return;
    } else if (allTelephones.includes(number)) {
      alert(`${number} already in contacts`);
      this.reset();
      return;
    } else {
      this.props.addNewContact({ ...this.state });
      this.reset();
    }
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { handleFormSubmit, handleChange } = this;

    return (
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label} htmlFor="tel">
          Name
        </label>
        <input
          className={styles.input}
          onChange={handleChange}
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          placeholder="Enter name..."
        />
        <label className={styles.label} htmlFor="tel">
          Number
        </label>
        <input
          className={styles.input}
          onChange={handleChange}
          id="tel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          placeholder="Enter phone..."
        />
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
