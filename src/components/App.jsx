import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import * as API from 'services/getimages';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container, ErrorMessage, Message } from 'components/App.styled';
export class App extends Component {
  state = {
    images: null,
    isLoading: false,
    error: false,
    page: 1,
    query: '',
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.loadImages(this.state.query, this.state.page);
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  handleSubmitForm = values => {
    this.setState({ query: values.searchQuery, page: 1 });
  };

  loadImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });

      const receivedImages = await API.getImages(query, page);

      if (page === 1) {
        this.setState(state => ({
          total: receivedImages.total,
          images: [...receivedImages.hits],
          isLoading: false,
        }));
      } else {
        this.setState(state => ({
          images: [...state.images, ...receivedImages.hits],
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error.message);
    }
  };

  render() {
    const { error, images, isLoading, total } = this.state;
    return (
      <Container>
        <Searchbar onSubmitProps={this.handleSubmitForm} />
        {isLoading && <Loader>Loading</Loader>}
        {error && (
          <ErrorMessage>An error has occurred, please, try again</ErrorMessage>
        )}
        {images && (
          <>
            {images.length === 0 && (
              <ErrorMessage>No pictures on this query! </ErrorMessage>
            )}

            <ImageGallery items={images} />

            {isLoading && <Loader>Loading</Loader>}
            {images.length > 0 && images.length !== total && (
              <Button onLoadMore={this.onLoadMore} />
            )}
            {isLoading && <Loader>Loading</Loader>}

            {images.length === total && !!images.length && (
              <Message>We show you all pictures!</Message>
            )}
          </>
        )}
      </Container>
    );
  }
}
