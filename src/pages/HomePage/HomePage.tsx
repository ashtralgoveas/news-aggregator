import React, { useState } from 'react';
import { News } from '../../components/HeadlinesSection/HeadlinesSection';
import PopModal from '../../components/PopModal/PopModal';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import {
  fetchArticles,
  setCategory,
  setEndArticleDate,
  setQuery,
  setSource,
  setStartArticleDate,
} from '../../store/slices/articlesSlice';
import moment from 'moment';
import '../HomePage/HomePage.css';
import Dropdown from '../../components/Dropdown/Dropdown';
import { categories, sources } from '../../config/config';
import { Col, Container, Form, Row } from 'react-bootstrap';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.articles);
  const [buttonClick, setButtonClick] = useState({
    search: false,
    dateFilter: false,
    multipleFilter: false,
  });
  const [openDateFilterModal, setOpenDateFilterModal] = useState(false);
  const [openMultiFilterModal, setOpenMultiFilterModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedSource, setSelectedSource] = useState(
    filters.source || sources[0]
  );
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || categories[0]
  );

  const handleOpenDateFilterModal = () => {
    setOpenDateFilterModal(true);
    setButtonClick({ ...filters, search: false });
    setSearchInputValue('');
  };

  const handleOpenMultiFilterModal = () => {
    setOpenMultiFilterModal(true);
    setButtonClick({ ...filters, search: false });
    setSearchInputValue('');
  };

  const handleStartDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(date);
    dispatch(setStartArticleDate(formattedDate));
    if (!date) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(date);
    dispatch(setEndArticleDate(formattedDate));
  };

  const handleSourceDropdownChange = (event) => {
    const selectSource = sources.find(
      (source) => source.key === event.target.value
    );
    setSelectedSource(selectSource);
  };

  const handleCategoryDropdownChange = (event) => {
    const selectCategory = categories.find(
      (category) => category === event.target.value
    );
    setSelectedCategory(selectCategory);
  };

  const handleSubmitDateRange = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue || filters.category));
    dispatch(
      fetchArticles({
        startArticleDate: startDate,
        endArticleDate: endDate,
      })
    );
    setOpenDateFilterModal(false);
  };
  const handleCancelDateRange = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue));

    dispatch(
      fetchArticles({
        startArticleDate: null,
        endArticleDate: null,
        q: searchInputValue,
      })
    );
    setOpenDateFilterModal(false);
  };

  const handleSubmitMultiFilter = (e) => {
    e.preventDefault();
    dispatch(setCategory(selectedCategory));
    dispatch(setSource(selectedSource));
    dispatch(
      fetchArticles({
        category: selectedCategory,
        source: selectedSource.key,
      })
    );
    setOpenMultiFilterModal(false);
  };

  const handleCancelMultiFilter = (e) => {
    e.preventDefault();
    setSelectedSource(sources[0]);
    setSelectedCategory(categories[0]);
    dispatch(
      fetchArticles({
        q: searchInputValue,
      })
    );
    dispatch(setCategory(categories[0]));
    dispatch(setSource(sources[0]));
    setOpenMultiFilterModal(false);
  };

  return (
    <div>
      <News
        buttonClick={buttonClick}
        setButtonClick={setButtonClick}
        handleOpenDateFilterModal={handleOpenDateFilterModal}
        handleOpenMultiFilterModal={handleOpenMultiFilterModal}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        startDate={startDate}
        endDate={endDate}
      />
      <PopModal
        showModal={openDateFilterModal}
        setShowModal={setOpenDateFilterModal}
        modalTitle="Date Filter"
        handleSubmit={handleSubmitDateRange}
        handleCancel={handleCancelDateRange}
        isApplyButtonDisabled={!startDate && !endDate}
      >
        <Container>
          <Row>
            <Col>
              <Form.Group
                controlId="startDatePicker"
                className="date-picker"
                style={{ paddingBottom: '15px', display: 'grid' }}
              >
                <Form.Label
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  Start Date
                </Form.Label>
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={handleStartDateChange}
                  maxDate={new Date()}
                  isClearable
                  placeholderText="Start Date"
                  className="custom-datepicker"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group
                controlId="endDatePicker"
                className="date-picker"
                style={{ paddingBottom: '10px', display: 'grid' }}
              >
                <Form.Label
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  End Date
                </Form.Label>
                <DatePicker
                  showIcon
                  selected={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  maxDate={new Date()}
                  isClearable
                  placeholderText="End Date"
                  className="custom-datepicker"
                  disabled={!startDate}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </PopModal>
      <PopModal
        showModal={openMultiFilterModal}
        setShowModal={setOpenMultiFilterModal}
        modalTitle="Source & Category Filter"
        handleSubmit={handleSubmitMultiFilter}
        handleCancel={handleCancelMultiFilter}
      >
        <Container className="d-flex flex-column gap-3">
          <Row>
            <Col>
              <Dropdown
                dropdownLabel="Source"
                dropdownPlaceholder="Choose a source"
                options={sources}
                handleChange={handleSourceDropdownChange}
                selectedValue={selectedSource}
                isObject={true}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Dropdown
                dropdownLabel="Category"
                dropdownPlaceholder="Choose a category"
                options={categories}
                selectedValue={selectedCategory}
                handleChange={handleCategoryDropdownChange}
              />
            </Col>
          </Row>
        </Container>
      </PopModal>
    </div>
  );
};
