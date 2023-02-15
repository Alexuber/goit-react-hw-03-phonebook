import styles from './Filter.module.scss';

export const Filter = () => {
  return (
    <>
      <h3 className={styles.title}>Find contacts by name</h3>
      <input className={styles.input} type="text" name="filter" />
    </>
  );
};
