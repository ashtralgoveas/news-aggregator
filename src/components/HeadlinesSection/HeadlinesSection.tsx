import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, card } from './index';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { header, capitaLize, sources } from '../../config/config';
import '../HeadlinesSection/HeadlinesSection.css';
import { NoDataFound } from '../NoDataFound/NoDataFound';
import { Loading } from '../Loading/Loading';
import { NewsCard } from '../NewsCard/NewsCard';
import { FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchArticles, setQuery } from '../../store/slices/articlesSlice';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from '../SearchInput/SearchInput';

interface NewsHeadlinesI {
  personalized?: string[];
  buttonClick: object;
  setButtonClick: (data: object) => void;
  handleOpenDateFilterModal: () => void;
  handleOpenMultiFilterModal: () => void;
  searchInputValue: string;
  setSearchInputValue: () => void;
}

export const News = ({
  personalized,

  buttonClick,
  setButtonClick,
  handleOpenDateFilterModal,
  handleOpenMultiFilterModal,
  searchInputValue,
  setSearchInputValue,
}: NewsHeadlinesI) => {
  const dispatch = useDispatch();

  const [selected] = useState(sources[0]);

  const personalizedClass = personalized ? 'personalized' : '';
  const debouncedSearchTerm = useDebounce(searchInputValue, 800);

  let { articles } = useSelector((state) => state.articles);
  const { status, filters } = useSelector((state) => state.articles);
  articles = personalized ? personalized : articles;

  const heading = personalized
    ? 'personalized'
    : filters.query
      ? filters.query
      : filters.category;

  const isSearchButtonDisabled = searchInputValue?.trim() === '';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
      })
    );
  };

  useEffect(() => {
    dispatch(setQuery(debouncedSearchTerm));
    dispatch(
      fetchArticles({
        query: debouncedSearchTerm,
        source: selected.key,
      })
    );
  }, [debouncedSearchTerm, dispatch, selected.key]);

  console.log('first');

  return (
    <>
      {!personalized && (
        <div className="page-header">
          <Header>{header(capitaLize(heading))}</Header>
          <div className="header-button">
            {buttonClick?.search ? (
              <SearchInput
                inputValue={searchInputValue}
                setInputValue={setSearchInputValue}
                isDisabled={isSearchButtonDisabled}
                handleSubmit={handleSubmit}
              />
            ) : (
              <Button
                size="lg"
                className="search-button"
                onClick={() =>
                  setButtonClick({
                    ...filters,
                    search: true,
                  })
                }
              >
                <FaSearch />
              </Button>
            )}
            <ButtonGroup size="lg">
              <Button
                className="calender-button"
                onClick={handleOpenDateFilterModal}
              >
                <FaCalendarAlt />
              </Button>
              <Button
                className="filter-button"
                onClick={handleOpenMultiFilterModal}
              >
                <FaFilter />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      {status === 'loading' ? (
        <Loading />
      ) : personalized && articles?.length < 1 ? (
        <>
          <div className="notify-container">
            <span className="">No Personalized News Found.</span>
          </div>
        </>
      ) : (
        <div className={personalizedClass}>
          {articles?.length < 1 ? (
            <NoDataFound />
          ) : (
            <Container>
              <Row>
                {articles.map((element, index) => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                      <NewsCard
                        title={element.title}
                        description={element.description}
                        published={element.publishedAt}
                        channel={element.source}
                        alt="News image"
                        publishedAt={element.publishedAt}
                        imageUrl={element.imgSrc}
                        urlNews={element.url}
                        author={element.author}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      )}
    </>
  );
};
