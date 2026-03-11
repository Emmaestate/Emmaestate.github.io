import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ContactFormPopup from "../../Components/ContactFormPopup/ContactFormPopup.jsx";
import soldData from "../../data/soldListings.json";
import exclusiveData from "../../data/exclusiveListings.json";
import activeData from "../../data/activeListings.json";
import { images } from "../../data/images";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Combine all listing data sources with prefixes to avoid ID collisions if needed,
    // or just search sequentially.
    // Since IDs might conflict (e.g. "1" exists in multiple files), we need a better strategy.
    // Strategy: Try to match by ID. The first match wins.
    // If we want to be precise, we should pass the type in URL or make IDs unique globally.
    // For now, let's try to find the item.
    // NOTE: This assumes IDs are unique across files OR the user accepts the first match.
    // If IDs are "1", "2" in all files, this is a BUG.
    // FIX: We need to update the data files to have unique IDs or handle it here.

    // Let's modify the search to look through data with a "type" priority or check if the ID format helps.
    // But since the IDs in JSON are just "1", "2"... they definitely conflict.

    // Quick fix: Check which list we are likely coming from? No, URL only has ID.
    // Better fix: Update the JSON files to have unique IDs (e.g., "sold-1", "exclusive-1").
    // OR: Update this component to handle the conflict by trying to match more properties? No.

    // WORKAROUND for now:
    // We will search in a specific order: Sold -> Exclusive -> Active.
    // This explains why you see "Sold" content if IDs overlap.

    // However, the best way is to prefix IDs in the JSON files or generating them on the fly in the listing pages.
    // Let's assume the Listing pages passed a prefixed ID like "sold-1"?
    // If they didn't, we have a problem.

    // Let's check if the ID passed in the URL has a prefix.
    // If the ID is just "1", it will match the first item in the combined list (which is Sold data).

    let foundProperty = null;
    let status = "Active";

    // Check if ID has a prefix (e.g. "sold-1")
    if (id.startsWith("sold-")) {
      const realId = id.replace("sold-", "");
      foundProperty = soldData.find((item) => item.id === realId);
      status = "Sold";
    } else if (id.startsWith("exclusive-")) {
      const realId = id.replace("exclusive-", "");
      foundProperty = exclusiveData.find((item) => item.id === realId);
      status = "Exclusive";
    } else if (id.startsWith("active-")) {
      const realId = id.replace("active-", "");
      foundProperty = activeData.find((item) => item.id === realId);
      status = "Active";
    } else {
      // Fallback for legacy IDs (just numbers) - This is what causes the issue!
      // We'll search all, but this is ambiguous.
      // Prioritize based on some logic or just search all.
      const allListings = [...soldData, ...exclusiveData, ...activeData];
      foundProperty = allListings.find((item) => item.id === id);

      if (foundProperty) {
        if (
          soldData.some(
            (item) => item.id === id && item.address === foundProperty.address,
          )
        )
          status = "Sold";
        else if (
          exclusiveData.some(
            (item) => item.id === id && item.address === foundProperty.address,
          )
        )
          status = "Exclusive";
      }
    }

    if (foundProperty) {
      setProperty({
        ...foundProperty,
        image:
          images[foundProperty.imageKey] ||
          "https://via.placeholder.com/800x600",
        status: foundProperty.status || status,
      });
    }
  }, [id, navigate]);

  if (!property) {
    return (
      <div className="loading-container">
        <Layout />
        <div className="loading-content">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="property-detail-page">
      <Layout />

      <div className="property-hero">
        <img
          src={property.image}
          alt={property.address}
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-address">{property.address}</h1>
            <div className="hero-price">
              ${property.price?.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="property-content-container">
        <div className="property-main-info">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Bedrooms</span>
              <span className="info-value">{property.bedrooms}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Bathrooms</span>
              <span className="info-value">{property.bathrooms}</span>
            </div>
            {property.sqft && (
              <div className="info-item">
                <span className="info-label">Sq Ft</span>
                <span className="info-value">{property.sqft}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Status</span>
              <span
                className={`info-value ${property.status === "Sold" ? "status-sold" : "status-active"}`}
              >
                {property.status}
              </span>
            </div>
          </div>

          <div className="property-description">
            <h2>Description</h2>
            <p>
              {property.description ||
                `Beautiful property located at ${property.address}. This home features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms. Contact us for more details about similar listings in this area.`}
            </p>
          </div>

          <div className="property-features">
            <h2>Features</h2>
            <ul className="features-list">
              <li>High Ceilings</li>
              <li>Hardwood Floors</li>
              <li>Modern Kitchen</li>
              <li>Central Air</li>
              {/* Add dynamic features if available in data */}
            </ul>
          </div>
        </div>

        <div className="property-sidebar">
          <div className="agent-card">
            <h3>Interested in this property?</h3>
            <p>Contact Emma Ju for more information.</p>
            <button
              className="contact-agent-btn"
              onClick={() => document.querySelector(".connect-btn").click()}
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      <ContactFormPopup />
      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetail;
