import { newsChannel, lastUpdate } from '../../../config/config';
import '../NewsDetails/NewsDetails.css';

interface NewsDetailsI {
  channel: string;
  published: string;
  author: string;
}

export const Details = ({ channel, published, author }: NewsDetailsI) => {
  return (
    <div className="details-container">
      <p className="channel">
        <span>Channel: </span>
        {newsChannel(channel)}
      </p>
      <p className="published">
        <span>Published at: </span>
        {lastUpdate(published)}
      </p>
      <p className="author">
        <span>Author: </span>
        {author}
      </p>
    </div>
  );
};
