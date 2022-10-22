import { CirclesWithBar } from  'react-loader-spinner'
import styles from './Loader.module.css'


const Loader = () => (
  <div className={styles.loader}>
  <CirclesWithBar height="60" width="60" ariaLabel="loading"/>
  </div>
);

export default Loader;