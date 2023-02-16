import { ContactListItem } from 'components/ContactsListItem/ContactsListItem';
import styles from './ContactsList.module.scss';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={() => deleteContact(id)}
          />
        );
      })}
    </ul>
  );
};
