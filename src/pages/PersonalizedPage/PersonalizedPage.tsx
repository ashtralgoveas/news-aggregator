import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './PersonalizedPage.css';
import { useSelector } from 'react-redux';
import { News } from '../../components/HeadlinesSection/HeadlinesSection';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Header } from '../../components/HeadlinesSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Loading } from '../../components/Loading/Loading';

export const PersonalizedPage = () => {
  const [show, setShow] = useState(false);

  const { articles } = useSelector((state) => state.articles);
  const [savedSources, setSavedSources] = useState([]);
  const [savedAuthors, setSavedAuthors] = useState([]);
  const [savedCategories, setSavedCategories] = useState([]);

  const [tempSources, setTempSources] = useState([]);
  const [tempAuthors, setTempAuthors] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);
  const [personalizedNews, setPersonalizedNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseSidebar = () => {
    // Reset temp state to saved preferences on close without applying
    setTempSources(savedSources);
    setTempAuthors(savedAuthors);
    setTempCategories(savedCategories);
    setShow(false);
  };

  const handleShowSidebar = () => setShow(true);

  const uniqueSources = [...new Set(articles.map((article) => article.source))];
  const uniqueAuthors = [...new Set(articles.map((article) => article.author))];
  const uniqueCategories = [
    ...new Set(articles.map((article) => article.category)),
  ];

  const handleApply = () => {
    // Save temporary state as permanent preferences
    setSavedSources(tempSources);
    setSavedAuthors(tempAuthors);
    setSavedCategories(tempCategories);

    const filteredArticles =
      tempSources.length === uniqueSources.length
        ? articles
        : articles.filter(
            (article) =>
              tempSources.includes(article.source) ||
              tempAuthors.includes(article.author) ||
              tempCategories.includes(article.category)
          );

    setPersonalizedNews(filteredArticles);
    setShow(false);
  };

  const handleSourceSelectionChange = (newSelectedSources) => {
    setTempSources(newSelectedSources);
  };

  const handleCategorySelectionChange = (newSelectedCategories) => {
    setTempCategories(newSelectedCategories);
  };

  const handleAuthorSelectionChange = (newSelectedAuthors) => {
    setTempAuthors(newSelectedAuthors);
  };

  useEffect(() => {
    // Retrieve preferences from localStorage
    const savedSources =
      JSON.parse(localStorage.getItem('preferredSources')) || [];
    const savedAuthors =
      JSON.parse(localStorage.getItem('preferredAuthors')) || [];
    const savedCategories =
      JSON.parse(localStorage.getItem('preferredCategories')) || [];

    setSavedSources(savedSources);
    setSavedAuthors(savedAuthors);
    setSavedCategories(savedCategories);

    setTempSources(savedSources);
    setTempAuthors(savedAuthors);
    setTempCategories(savedCategories);

    const filteredArticles =
      savedSources.length === uniqueSources.length
        ? articles
        : articles.filter(
            (article) =>
              savedSources.includes(article.source) ||
              savedAuthors.includes(article.author) ||
              savedCategories.includes(article.category)
          );

    setPersonalizedNews(filteredArticles);
  }, [articles, uniqueSources.length]);

  useEffect(() => {
    localStorage.setItem('preferredSources', JSON.stringify(savedSources));
    localStorage.setItem('preferredAuthors', JSON.stringify(savedAuthors));
    localStorage.setItem(
      'preferredCategories',
      JSON.stringify(savedCategories)
    );
  }, [savedSources, savedAuthors, savedCategories]);

  return (
    <>
      <div className="page-header">
        <Header>Top Personalized News</Header>
        <div className="header-button">
          <Button
            className="add-edit-button"
            size="sm"
            onClick={handleShowSidebar}
          >
            {personalizedNews?.length ? (
              <>
                <FaEdit />
                Edit Favourites
              </>
            ) : (
              <>
                <FaPlus /> Add Favourites
              </>
            )}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <News personalized={personalizedNews} />
          <Sidebar
            sidebarHeading="Personalized Settings"
            openDrawer={show}
            handleCloseSidebar={handleCloseSidebar}
            handleApply={handleApply}
          >
            <h5>Filter By Sources</h5>
            <Form className="sources checkbox-container">
              <MultiSelect
                dropdownLabel="News Channel Sources"
                dropdownPlaceholder="Choose a source"
                options={uniqueSources}
                selectedValues={tempSources}
                onChange={handleSourceSelectionChange}
              />
            </Form>
            <hr />
            <h5>Filter By Categories</h5>
            <Form className="authors checkbox-container">
              <MultiSelect
                dropdownLabel="News Categories"
                dropdownPlaceholder="Choose a category"
                options={uniqueCategories}
                selectedValues={tempCategories}
                onChange={handleCategorySelectionChange}
              />
            </Form>
            <hr />

            <h5>Filter By Authors</h5>
            <Form className="categories checkbox-container">
              <MultiSelect
                dropdownLabel="News Authors"
                dropdownPlaceholder="Choose an author"
                options={uniqueAuthors}
                selectedValues={tempAuthors}
                onChange={handleAuthorSelectionChange}
              />
            </Form>
          </Sidebar>
        </div>
      )}
    </>
  );
};
