import React, { useState } from 'react';
    import axios from 'axios';
    import './App.css';

    const allergenIcons = {
      nut_free: '🌰',
      peanut_free: '🥜',
      dairy_free: '🥛',
      gluten_free: '🍞',
      egg_free: '🥚',
      soy_free: '🌱',
      wheat_free: '🌾',
      grain_free: '🌾',
      vegan: '🌿',
      vegetarian: '🥗',
      pescetarian: '🐟',
      paleo: '🦴',
      primal: '🍖',
      msg_free: '🚫',
      no_artificial_colors: '🎨',
      no_artificial_flavors: '🌿',
      no_artificial_ingredients: '🚫',
      sugar_free: '🍬',
      sulfite_free: '🍷',
      corn_free: '🌽',
      nitrate_free: '🥩',
      gmo_free: '🌱',
      organic: '🌱',
      kosher: '✡️',
      halal: '☪️',
      lactose_free: '🥛',
      whole_grain: '🌾',
      whole_wheat: '🌾',
      multigrain: '🌾',
      sprouted_grain: '🌾'
    };

    const App = () => {
      const [query, setQuery] = useState('');
      const [products, setProducts] = useState([]);

      const searchProducts = async () => {
        try {
          const response = await axios.get('https://api.spoonacular.com/food/products/search', {
            params: {
              query,
              number: 10,
              apiKey: '074390cd2bd7430d9d50632635c00d0f',
              addProductInformation: true
            }
          });
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const renderAllergens = (badges) => {
        return badges.map((badge) => (
          <span key={badge} className="allergen">
            {allergenIcons[badge] || '❓'} {badge.replace('_', ' ')}
          </span>
        ));
      };

      return (
        <div className="app">
          <h1>Food Allergen Checker</h1>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name or UPC"
            />
            <button onClick={searchProducts}>Search</button>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <h2>{product.title}</h2>
                <img src={`https://spoonacular.com/productImages/${product.id}-312x231.${product.imageType}`} alt={product.title} onError={(e) => e.target.style.display = 'none'} />
                <div className="allergens">
                  {renderAllergens(product.badges)}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default App;
