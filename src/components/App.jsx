import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import * as API from 'services/getimages';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

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
    return (
      <>
        {this.state.isLoading && <div>Loading</div>}
        {this.state.error && <p>ERROR</p>}

        <Searchbar onSubmitProps={this.handleSubmitForm} />

        {this.state.images && (
          <>
            {this.state.images.length === 0 && <p>There are no pictures! </p>}

            <ImageGallery items={this.state.images} />

            {this.state.images.length > 0 &&
              this.state.images.length !== this.state.total && (
                <Button onLoadMore={this.onLoadMore} />
              )}

            {this.state.images.length === this.state.total &&
              !!this.state.images.length && <p>We show you all pictures!</p>}
          </>
        )}
      </>
    );
  }
}
