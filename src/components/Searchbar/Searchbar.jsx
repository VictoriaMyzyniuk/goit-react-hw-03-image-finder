import { PropTypes } from 'prop-types';
import { Formik } from 'formik';
import {
  SearchBar,
  SearchForm,
  SubmitButton,
  SubmitButtonLabel,
  SearchInput,
} from 'components/Searchbar/Searchbar.styled';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';

export const Searchbar = ({ onSubmitProps }) => {
  const handleSubmit = (values, actions) => {
    onSubmitProps(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };
  return (
    <SearchBar>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <SearchForm>
            <SubmitButton type="submit" disabled={isSubmitting}>
              <SubmitButtonLabel aria-label="Search">
                <SearchIcon />
              </SubmitButtonLabel>
            </SubmitButton>

            <SearchInput
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        )}
      </Formik>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmitProps: PropTypes.func.isRequired,
};
