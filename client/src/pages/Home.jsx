export const Home =()=>{
    return (
        <>
        <main>
            <section className="section-hero">
               <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <p>
                        We are the World Best IT company
                    </p>
                    <h1>Welcome saanvi</h1>
                    <p>
                        A paragraph in HTML is simply a block of text enclosed within the  tag. The tag helps divide content into manageable, readable sections. Its the go-to element for wrapping text in a web page that is meant to be displayed as a distinct paragraph.
                    </p>
                    <div className="btn btn-group">
                        <a href="/contact">
                            <button className="secondary-btn">Get Started</button>
                        </a>
                        <a hrerf="/services">
                            <button className="secondary-btn">learn more</button>
                        </a>
                    </div>
                </div>

                {/* hero images */}
                <div className="hero-image">
                    <img src="/images/home.png" alt="coding" width="400" height="400"/>
                </div>
               </div>
            </section>
        </main>
        </>
    );
};