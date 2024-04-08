import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import Card from "../../components/Card";
import { getAllContent } from "../../redux-store/reducers/Content";
import Input from "../../components/Input";
import Search from "./Search";

const Home = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.content.lists);

  useEffect(() => {
    dispatch(getAllContent());
  }, [dispatch]);

  return (
    <div className="home-container">
      <Search />
      <div className="card-container">
        {lists?.map((product) => (
          <Card productData={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
