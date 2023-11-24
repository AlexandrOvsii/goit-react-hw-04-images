import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = (e) => {
    if(e.code === 'Escape'){
      this.props.closeModal()
    }
  }

  render() {
    const { largeImage } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImage.src} alt={largeImage.alt} />
        </div>
      </div>
    );
  }
}

export default Modal;

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// const modalRoot = document.getElementById('modal-root');

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     console.log(e.target);
//     console.log(e.currentTarget);
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div className={css.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
