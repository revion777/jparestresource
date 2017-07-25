import React from 'react';
import { Container } from 'semantic-ui-react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styles from './index.css';

export default function NotFound(/* props */) {
  return (
    <Container className={styles.container}>
      <Helmet title="Страница не найдена"/>
      <div className={styles.center}>
        <h2>404: Страница не найдена</h2>
        <Link to="/">Домой</Link>
      </div>
    </Container>
  );
}
