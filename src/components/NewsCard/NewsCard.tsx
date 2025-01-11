import React from "react";
import { Card } from "react-bootstrap";
import "./NewsCard.css";
import { Details } from "./NewsDetails/NewsDetails";

interface NewsCardI {
  imageUrl: string;
  alt: string;
  title: string;
  channel: string;
  published: string;
  urlNews: string;
  author: string;
}

export const NewsCard = ({
  imageUrl,
  alt,
  title,
  channel,
  published,
  urlNews,
  author,
}: NewsCardI) => {
  return (
    <Card className="card">
      <a
        href={urlNews}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
        <Card.Body className="card-body">
          <Card.Title className="card-title">
            {" "}
            <a
              href={urlNews}
              target="_blank"
              rel="noopener noreferrer"
              className="title-link"
            >
              {title}
            </a>
          </Card.Title>
          <Details channel={channel} published={published} author={author} />
        </Card.Body>
      </a>
    </Card>
  );
};
