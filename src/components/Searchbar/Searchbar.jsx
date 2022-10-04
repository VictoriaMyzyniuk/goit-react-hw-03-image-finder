import { Formik, Form, Field } from 'formik';

export const Searchbar = ({ onSubmitProps }) => {
  const handleSubmit = (values, actions) => {
    onSubmitProps(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };
  return (
    <header className="searchbar">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="form">
            <button type="submit" className="button" disabled={isSubmitting}>
              <span className="button-label">Search</span>
            </button>

            <Field
              name="searchQuery"
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};
