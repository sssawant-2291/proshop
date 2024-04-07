import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousal from "../components/ProductCarousal";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const pageSearch = searchParams.get('page') || '';

  // Construct the complete query string
  const queryString = `/?keyword=${keyword}&page=${pageSearch}`;

  useEffect(() => {
    dispatch(listProducts(queryString));
  }, [dispatch, queryString]);

  return (
    <div>
      {!keyword && <ProductCarousal />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((p) => (
              <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
