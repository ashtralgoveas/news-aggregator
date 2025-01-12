import { Badge, Button } from 'react-bootstrap';
import '../CustomizedBadge/CustomizedBadge.css';

interface CustomizedBadgeI {
  badgeName: string;
  badgeIndex: number;
  handleRemove: (data: string) => void;
}

const CustomizedBadge = ({
  badgeName,
  badgeIndex,
  handleRemove,
}: CustomizedBadgeI) => {
  return (
    <span className="badge-container">
      <Badge key={badgeIndex} pill className="badge-style">
        {badgeName}
        <Button
          size="sm"
          variant="light"
          style={{ marginLeft: '5px', padding: '0 5px', fontSize: '10px' }}
          onClick={() => handleRemove(badgeName)}
        >
          &times;
        </Button>
      </Badge>
    </span>
  );
};

export default CustomizedBadge;
