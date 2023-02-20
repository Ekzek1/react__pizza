import React from 'react';
import styles from './Error.module.scss';

type error = {
  title: string,
}

const Error: React.FC <error> = ({title}) => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br/>
        {title}
      </h1>
      <p className={styles.description}>К сожалени данная страница отсуствует</p>
    </div>
  )
}

export default Error