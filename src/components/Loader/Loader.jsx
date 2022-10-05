import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderWrapper } from 'components/Loader/Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <MagnifyingGlass
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderWrapper>
  );
};
