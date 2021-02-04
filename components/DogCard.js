export default function DogCard({ marker }) {
  const { imageurl, dogname, description, createdAt } = marker;
  return (
    <>
      <div className="card-img-container w-100">
        <img className="card-img" src={imageurl} alt="Lost Dog Picture" />
      </div>
      <div className="px-3 py-1">
        <span class="badge badge badge-danger mr-1">Lost Dog</span>
        <span class="badge badge badge-primary mr-1">Male</span>
        <span class="badge badge badge-secondary mr-1">Medium-Size</span>
        <span class="badge badge badge-warning mr-1">Needs Medication</span>
      </div>
      <h5 className="px-3 font-weight-bold">{dogname}</h5>
      <p className="px-3">{description}</p>
      <div className="card-contact-section px-3">
        <img src="./whatsapp-logo.png" className="whatsapp-logo" />
        <p>+1 234 567 8910</p>
      </div>
      <div className="d-flex flex-row justify-content-between px-3 pb-3">
        <small>Posted on {createdAt.substring(0, 10)}</small>
        <small>Report this post</small>
      </div>
    </>
  );
}
