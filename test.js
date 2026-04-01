const products = [
  { id: 1, name: "Royal Silk Kurta", category: "traditional", price: 1899, original: 2499, image: "assets/images/kurta1.png", badge: "Bestseller" },
  { id: 2, name: "Embroidered Sherwani", category: "traditional", price: 5499, original: 7999, image: "assets/images/sherwani.jpg", badge: "New" }
];
let currentCategory = 'traditional';
let currentPrice = 'all';
let currentSort = 'featured';

let filtered = currentCategory === 'all'
? [...products]
: products.filter(p => p.category === currentCategory);

// 2. Filter by price
if (currentPrice !== 'all') {
filtered = filtered.filter(p => {
    if (currentPrice === 'under1000') return p.price < 1000;
    if (currentPrice === '1000to2000') return p.price >= 1000 && p.price <= 2000;
    if (currentPrice === 'over2000') return p.price > 2000;
    return true;
});
}

// 3. Sort
if (currentSort === 'priceLowHigh') {
filtered.sort((a, b) => a.price - b.price);
} else if (currentSort === 'priceHighLow') {
filtered.sort((a, b) => b.price - a.price);
} else {
// Featured - restore original order
filtered.sort((a, b) => a.id - b.id);
}
console.log(filtered.length);
