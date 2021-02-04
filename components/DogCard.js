export default function DogCard({ marker }) {
  const {
    imageurl,
    dogname,
    description,
    createdAt,
    type,
    gender,
    number,
    size,
    sterilized,
    vaccinated
  } = marker;
  return (
    <>
      <div className="card-img-container w-100">
        <img className="card-img" src={imageurl} alt="Lost Dog Picture" />
      </div>
      <div className="px-3 py-1">
        {type == "lostdog" && (
          <span className="badge badge-danger mr-1">Lost</span>
        )}
        {type == "adoptdog" && (
          <span className="badge badge-adoption mr-1">Adopt Me</span>
        )}
        {type == "founddog" && (
          <span className="badge badge-success mr-1">Found</span>
        )}
        <span className={gender ? "badge mr-1 badge-female" : "badge mr-1 badge-primary"}>
          {gender ? "Female" : "Male"}
        </span>
        <span className="badge badge-secondary mr-1">{size}-Size</span>
        {sterilized && (
          <span className="badge badge-success mr-1">Sterilized</span>
        )}
                {vaccinated && (
          <span className="badge badge-info mr-1">Vaccinated</span>
        )}
      </div>
      <h5 className="px-3 mt-1 font-weight-bold">{dogname}</h5>
      <p className="px-3">{description}</p>
      <div className="card-contact-section px-3 my-3">
        <img src="./whatsapp-logo.png" className="whatsapp-logo" />
        <p className="font-weight-bold">{number}</p>
      </div>
      <div className="d-flex flex-row justify-content-between px-3 pb-3">
        <small>Posted on {createdAt.substring(0, 10)}</small>
        <small>
          <a href="#" className="text-grey">
            Report this post
          </a>
        </small>
      </div>
    </>
  );
}
