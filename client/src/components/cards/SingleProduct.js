import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const { title, images, description, _id } = product;
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    // add to cart
    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.push({
                ...product,
                count: 1,
            });
            // lodash function to remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart", JSON.stringify(unique));
            setTooltip("Added");
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
        }
    };
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images &&
                            images.map((image) => (
                                <img src={image.url} key={image.public_id} />
                            ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={
                            <img
                                src={
                                    images && images.length
                                        ? images[0].url
                                        : laptop
                                }
                                className="mb-3 card-image"
                            />
                        }
                    ></Card>
                )}
                <Tabs>
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More Details" key="2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Culpa rerum error veniam recusandae repellat in
                        magni inventore. Distinctio, sint omnis.
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h2 className="bg-info p-3 text-white">{title && title}</h2>
                {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                )}
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" />{" "}
                                <br />
                                Add To Cart
                            </a>
                        </Tooltip>,
                        <Link to="/">
                            <HeartOutlined className="text-info" />
                            <br /> Add To Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRatings
                                name={_id && _id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
