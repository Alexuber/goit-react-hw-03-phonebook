import styles from './ContactsListItem.module.scss';
import { Delete } from '../Delete/Delete';

export const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={styles.item} key={id} id={id}>
      <span className={styles.name}>{name}: </span>
      <span>{number}</span>
      <Delete deleteContact={deleteContact} />
    </li>
  );
};
