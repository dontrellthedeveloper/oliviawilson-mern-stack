import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import SideDrawer from "./components/drawer/SideDrawer";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import './App.css';
import './responsive.css';


import {auth} from './firebase';
import {useDispatch} from "react-redux";
import {currentUser} from "./functions/auth";
import ScrollToTop from "./utils/ScrollToTop";



const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user) {
                const idTokenResult = await user.getIdTokenResult();
                // console.log("User",user);

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            },
                        });
                    })
                    .catch(err => console.log(err));
            }
        });

        //cleanup

        return () => unsubscribe();

    }, [dispatch]);

    return (
        <>
            <ScrollToTop />
            <SideDrawer />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/complete" component={RegisterComplete} />
                <Route exact path="/forgot/password" component={ForgotPassword} />

                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />


                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/category" component={CategoryCreate} />
                <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
                <AdminRoute exact path="/admin/sub" component={SubCreate} />
                <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
                <AdminRoute exact path="/admin/product" component={ProductCreate} />
                <AdminRoute exact path="/admin/products" component={AllProducts} />
                <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>
                <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/category/:slug" component={CategoryHome} />
                <Route exact path="/sub/:slug" component={SubHome} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />

                <UserRoute exact path="/checkout" component={Checkout} />
                <UserRoute exact path="/payment" component={Payment} />


            </Switch>
        </>
    );
}

export default App;