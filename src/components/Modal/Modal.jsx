export const Modal = ({ tags, largeImageURL }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
