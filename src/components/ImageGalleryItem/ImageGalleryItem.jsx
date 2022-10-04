import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };
  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li>
        <img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {isModalOpen && <Modal largeImageURL={largeImageURL} tags={tags} />}
      </li>
    );
  }
}
