import styles from './ContactsListItem.module.scss';
import { Delete } from '../Delete/Delete';

export const ContactListItem = ({ id, name, number }) => {
  return (
    <li className={styles.item} key={id} id={id}>
      <span>{name}: </span>
      <span>{number}</span>
      <Delete />
    </li>
  );
};
