import React from 'react';
import css from './Button.module.css'

function Button({page, loadMore}) {

  return <div className={css.btnWrapper}>
    <button className={css.Button} type="button" onClick={() => loadMore(page)}>Load More</button>
  </div>;
}

export default Button;
