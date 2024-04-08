import React from "react";

import { useNavigate } from "react-router-dom";
import "./card.css";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteContent } from "../../redux-store/reducers/Content";

function Card({ productData }) {
  const { title, txtDoc, images, _id, videoLinks } = productData;
  const profile = useSelector((state) => state.user.profile);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const onClick = () => {
  //   navigate(`/product/${_id}`);
  // };

  const onDelete = (e) => {
    dispatch(deleteContent(_id));
  };

  return (
    <div className="card-item-container rounded-lg">
      <div className="content">
        <h2 className="header">
          <div className="product-name mb-2 font-semibold">{title}</div>
        </h2>
        <div className="thumbnail">
          <img
            src={
              images[0]?.Location ||
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
            }
            alt={title}
          />
        </div>
        <div className="description">{txtDoc}</div>
        {videoLinks && (
          <div className="underline">
            <a href={videoLinks} target="_blank">
              Youtube Link
            </a>
          </div>
        )}
        {profile?.role === "admin" ? (
          <Button onClick={onDelete}>Delete</Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default React.memo(Card);
