export const productCategory = [
  { id: "arts_crafts", label: "Arts & Crafts" },
  { id: "automotive", label: "Automotive" },
  { id: "baby_products", label: "Baby Products" },
  { id: "beauty_personal_care", label: "Beauty & Personal Care" },
  { id: "books", label: "Books" },
  { id: "computers", label: "Computers" },
  { id: "coupon", label: "Coupon" },
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "health", label: "Health" },
  { id: "home", label: "Home" },
  { id: "kitchen", label: "Kitchen" },
  { id: "luggage", label: "Luggage" },
  { id: "membership_card", label: "Membership Card" },
  { id: "movie_tv", label: "Movie & TV" },
  { id: "music", label: "Music" },
  { id: "pet_products", label: "Pet Products" },
  { id: "promotion_code", label: "Promotion Code" },
  { id: "software", label: "Software" },
  { id: "sports_outdoor", label: "Sports & Outdoor" },
  { id: "tools_hardware", label: "Tools" },
  { id: "toys_games", label: "Toys & Games" },
];

// use in sellForm
export const getProductCategory = () =>
  productCategory.map((item) => {
    return {
      id: item.id,
      title: item.label,
    };
  });
