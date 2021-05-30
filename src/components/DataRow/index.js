import React from "react";
import AlbumCard from "../AlbumCard";
import "./style.css";

function DataRow({ cards, title, subtitle }) {
  return (
    <>
      <div>
        <h4 style={{ fontFamily: "Spotify Bold", color: "#fff" }}>{title}</h4>
        <p style={{ fontSize: 14, color: "#999", fontFamily: "Spotify Bold" }}>
          {subtitle}
        </p>
        {subtitle && <br />}
        <div className="d-flex data-row">
          {cards.map((card) => {
            return (
              <AlbumCard
                key={card.image}
                label={card.label}
                description={card.description}
                image={card.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DataRow;
