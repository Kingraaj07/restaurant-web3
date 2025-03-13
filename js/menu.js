document.addEventListener('DOMContentLoaded', function () {
  // Menu Data Structure
  const menuData = {
    starters: [
      {
        name: 'Vegetable Samosa',
        description: 'Crispy pastry filled with spiced potatoes and peas',
        price: '₹120',
        image: 'images/menu/samosa.jpg',
        tags: ['bestseller', 'veg'],
        rating: 4.5
      },
      {
        name: 'Paneer Tikka',
        description: 'Marinated cottage cheese grilled to perfection',
        price: '₹220',
        image: 'images/menu/paneer-tikka.jpg',
        tags: ['spicy', 'veg'],
        rating: 4.3
      }
    ],
    mainCourse: [
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in rich tomato gravy',
        price: '₹320',
        image: 'images/menu/butter-chicken.jpg',
        tags: ['bestseller', 'spicy'],
        rating: 4.8
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils cooked overnight with cream',
        price: '₹220',
        image: 'images/menu/dal-makhani.jpg',
        tags: ['veg'],
        rating: 4.6
      }
    ],
    desserts: [
      {
        name: 'Gulab Jamun',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/gulab-jamun.jpg',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      }
    ],
    popular: [
      {
        name: 'Butter Paneer',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/butter-paneer.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'French Fries',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/french-fries.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Malai Kofta',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/malai-kofta.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Matar Paneer',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/matar-paneer.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Paalak Paneer',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/palak-paneer.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Paneer Labaabdaar',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/paneer-lababdar.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Paneer Shaak',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/paneer-shaak.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Veg Manchurian',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/featured-dish/veg-manchurian.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      },
      {
        name: 'Gulaab Jaamun',
        description: 'Deep-fried milk solids soaked in sugar syrup',
        price: '₹120',
        image: 'images/menu/sweets/gulaab-jamun.webp',
        tags: ['bestseller', 'veg'],
        rating: 4.7
      }
    ]
  };

  // Initialize Menu
  function initializeMenu() {
    loadMenuItems();
    setupFilters();
    setupSearch();
  }

  // Load Menu Items
  function loadMenuItems(category = 'all', searchTerm = '') {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';
    let items = [];

    // Collect items based on category
    if (category === 'all') {
      Object.values(menuData).forEach(categoryItems => {
        items = [...items, ...categoryItems];
      });
    } else {
      items = menuData[category] || [];
    }

    // Apply search filter
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Render items
    items.forEach(item => {
      const menuItem = createMenuItem(item);
      menuGrid.appendChild(menuItem);
    });

    // Animate items
    animateMenuItems();
  }

  // Create Menu Item Element
  function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
  <div class="menu-item-image">
    <img src="${item.image}" alt="${item.name}">
      <div class="menu-item-tags">
        ${item.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
      </div>
  </div>
  <div class="menu-content">
    <div class="menu-item-header">
      <h3>${item.name}</h3>
      <div class="rating">
        <i class="fas fa-star"></i>
        <span>${item.rating}</span>
      </div>
    </div>
    <p class="description">${item.description}</p>
    <div class="menu-item-footer">
      <p class="price">${item.price}</p>
      <button class="order-btn" data-item="${item.name}">
        <i class="fas fa-plus"></i>
        Add
      </button>
    </div>
  </div>
  `;
    return div;
  }

  // Setup Category Filters
  function setupFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;
        const searchTerm = document.querySelector('#menuSearch')?.value || '';
        loadMenuItems(category, searchTerm);
      });
    });
  }

  // Setup Search Functionality
  function setupSearch() {
    const searchInput = document.querySelector('#menuSearch');
    if (!searchInput) return;

    const handleSearch = debounce(() => {
      const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
      loadMenuItems(activeCategory, searchInput.value);
    }, 300);

    searchInput.addEventListener('input', handleSearch);
  }

  // Animate Menu Items
  function animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('fade-in');
      }, index * 100);
    });
  }

  // Initialize Menu
  initializeMenu();

  // Handle Order Button Clicks
  document.addEventListener('click', function (e) {
    if (e.target.closest('.order-btn')) {
      const button = e.target.closest('.order-btn');
      const itemName = button.dataset.item;

      // Add your cart logic here
      console.log(`Added ${itemName} to cart`);

      // Visual feedback
      button.innerHTML = '<i class="fas fa-check"></i> Added';
      button.classList.add('added');

      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-plus"></i> Add';
        button.classList.remove('added');
      }, 2000);
    }
  });
});