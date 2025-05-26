export const Image = ({ title, smallImage }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        {" "}
        <img src={smallImage} className="img-responsive" alt={title} />{" "}
      </div>
    </div>
  );
};