import './NoDataFound.css';
import { IoWarning } from 'react-icons/io5';

export const NoDataFound = () => {
  return (
    <div className="noDataContainer">
      <div className="search-icon">
        <IoWarning size={30} />
      </div>

      <span> News not found.</span>
    </div>
  );
};
