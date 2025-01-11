import React, { useEffect, useState } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import '../NavBar/NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuery,
  setSource,
  fetchArticles,
  setCategory,
} from '../../store/slices/articlesSlice';
import { sources, categories } from '../../config/config';

import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside';

export const NavBar = () => {
  const dispatch = useDispatch();
  // Get the current location object
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the pathname from the location object
  const currentPath = location.pathname;

  const isPagePersonalized = /\/personalized/.test(currentPath);

  const { filters } = useSelector((state) => state.articles);

  const { isCollapsed, setIsCollapsed, elementRef } = useClickOutside();
  const [selected, setSelectedSource] = useState(filters.source || sources[0]);

  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || categories[0]
  );

  useEffect(() => {
    dispatch(setSource(selected));
    dispatch(setCategory(selectedCategory));
    dispatch(
      fetchArticles({
        category: selectedCategory,
      })
    );
    dispatch(setQuery(''));
  }, [dispatch, selected, selectedCategory]);

  const handleClearFilter = (e) => {
    e.preventDefault();
    setSelectedSource(sources[0]);
    setSelectedCategory(categories[0]);
    dispatch(
      fetchArticles({
        q: filters.category,
      })
    );
    dispatch(setCategory(categories[0]));
    dispatch(setSource(sources[0]));
    navigate('/');
  };

  return (
    <Navbar
      className="navbar"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={!isCollapsed}
      ref={elementRef}
    >
      <Navbar.Brand className="nav-brand fw-bold" href="/">
        The DailyScript
      </Navbar.Brand>
      <Navbar.Toggle
        className="border-0"
        aria-controls="basic-navbar-nav"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
      </Navbar.Toggle>

      {isPagePersonalized ? (
        <Navbar.Collapse id="basic-navbar-nav" in={isCollapsed}>
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-item"
              onClick={handleClearFilter}
            >
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/personalized" className="active nav-item">
              My Feed
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse id="basic-navbar-nav" in={isCollapsed}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="active nav-item">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-item">
              Top News
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-item">
              Trending for You
            </Nav.Link>
            <Nav.Link as={Link} to="/personalized" className="nav-item">
              Personal Feed
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};
