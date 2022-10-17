import React from "react";
import {
    Container,
    Row,
} from "reactstrap";
import ColorNavbar from "components/nav/ColorNavbar.js";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import SectionHeader from "components/Headers/SectionHeader";
import SectionPreFooterAreas from "../components/Footers/SectionPreFooterAreas";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";



const Home = () => {

    document.documentElement.classList.remove("nav-open");

    return (
        <>
            <ColorNavbar />
            <SectionHeader />
            <div className="wrapper">

                <div className="section latest-offers">
                    <Container>
                        <h3
                            style={{textAlign: 'center', marginBottom: '50px', textTransform: 'capitalize'}}
                            className="section-title">
                            New Arrivals
                        </h3>
                        <Row>
                            <NewArrivals />
                        </Row>
                    </Container>
                </div>


                <div className="section latest-offers" style={{ backgroundColor: '#eeeeee'}}>
                    <Container>
                        <h3
                            style={{textAlign: 'center', marginBottom: '50px', textTransform: 'capitalize'}}
                            className="section-title">
                            Best Sellers
                        </h3>
                        <Row>
                            <BestSellers/>
                        </Row>
                    </Container>
                </div>


                <SectionPreFooterAreas />

                {/* section */}
                <div className="section section-gray">
                    <Container>

                        <h3
                            style={{textAlign: 'center', margin: '50px', textTransform: 'capitalize'}}
                            className="section-title">
                            Categories
                        </h3>


                        <CategoryList/>


                        <h3
                            style={{textAlign: 'center', margin: '50px', textTransform: 'capitalize'}}
                            className="section-title">
                            Sub Categories
                        </h3>
                        <SubList/>

                    </Container>
                </div>
                <FooterEcommerce />
            </div>
        </>
    );
}

export default Home;
