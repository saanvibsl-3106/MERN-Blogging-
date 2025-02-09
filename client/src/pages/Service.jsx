import { useAuth } from "../store/auth.jsx";
export const Service = () => {
  const {services} = useAuth();
   if (!services || services.length === 0) {
     return <p>No services available.</p>;
   }
  return (
    <section className="service-services">
      <div className="container">
        <h1 className="main_heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;
          return (
            <div className="card" key={index}>
              <div className="card-image">
                <img
                  src="/images/design.png"
                  alt="our services in services "
                  width="200"
                  height="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
