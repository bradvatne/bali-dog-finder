export default function DogCard({ marker }) {
  const { imageurl, dogname, description, createdAt } = marker;
  return (
    <>
      <div className="card-img-container w-100">
        <img
          className="card-img"
          src={imageurl}
          alt="Lost Dog Picture"
        />
      </div>
      <div className="p-3">
        <h5 className="mt-2">{dogname}</h5>
        <p className="">{description}</p>
        <div className="card-contact-section">
        <img src="./whatsapp-logo.png" className="whatsapp-logo" />
        <p>+1 234 567 8910</p>
        </div>
        <small>Posted on {createdAt.substring(0, 10)}</small>
      </div>
    </>
  );
}
