import { nanoid } from 'nanoid';
import styles from './ContactsForm.module.scss';

export const ContactForm = ({ handleFormSubmit, handleChange }) => {
  const userNameId = nanoid();
  const userTelId = nanoid();
  return (
    <>
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
        />
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
