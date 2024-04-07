import BookingSearch from "./BookingSearch";

const Home = () => {
    return (
        <div className="row">
            <div className="col-4">
                <BookingSearch />
            </div>
            <div className="col-8">
                <h2 className="text-center">Stay Here</h2>
                <img className="float-start me-3" src="/images/main_image.jpg" width={600}/>
                <p className="text-justify">
                    <p className="text-center" style={{fontSize: "20px"}}><strong>Welcome to our cozy and charming hotel located near the city center!</strong></p>
                    With only 10 rooms, our hotel offers a personal touch and intimate atmosphere for our guests. Our garden and free parking provide a peaceful and convenient stay for those looking to explore the city without the hassle of parking.
                    Surrounded by entertaining and historical attractions, our hotel is the perfect base for those seeking to immerse themselves in the culture and history of the city. And with modern cafes and popular restaurants just a stone's throw away, guests can indulge in delicious dining options right at their doorstep.
                    We look forward to welcoming you to our hotel and providing you with a memorable and comfortable stay. Book your room today and experience the best of what our city has to offer!
                </p>
            </div>
        </div>
    );
};

export default Home;
