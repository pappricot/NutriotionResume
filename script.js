let cartCount = 0;
const addedItems = new Set();

function addToCart(button) {
  const projectId = button.closest('.projects').id;

  if (addedItems.has(projectId)) {
    return; // Item already added, do nothing
  }

  // Add item to the set
  addedItems.add(projectId);

  // Increment cart count
  cartCount++;

  // Update cart icon with the new count
  const cartButton = document.querySelector('.cart-button');
  cartButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span class="cart-count">${cartCount}</span>
  `;

  // Show pop-up
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerText = 'Added to cart!';
  document.body.appendChild(popup);

  // Remove pop-up after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);

  // Disable the button and grey out the project
  button.disabled = true;
  button.closest('.projects').classList.add('added-to-cart');
}

// Attach event listeners to all "Add to cart" buttons
document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => addToCart(button));
});

document.querySelector('.cart-button').addEventListener('click', () => {
  const modal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items-list');
  cartItemsList.innerHTML = ''; // Clear previous items

  // Populate cart items
  addedItems.forEach(itemId => {
    const itemName = document.querySelector(`#${itemId} h4`).innerText;
    const listItem = document.createElement('li');
    listItem.textContent = itemName;
    cartItemsList.appendChild(listItem);
  });

  modal.style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('cart-modal').style.display = 'none';
});

window.onclick = function(event) {
  const modal = document.getElementById('cart-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  let items = '';
  addedItems.forEach(itemId => {
    const itemName = document.querySelector(`#${itemId} h4`).innerText;
    items += `- ${itemName}\n`;
  });

  const mailtoLink = `mailto:anya.p.nguyen@gmail.com?subject=Cola lala client&body=Name: ${name}%0D%0ASurname: ${surname}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0AItems:%0D%0A${items}`;
  window.location.href = mailtoLink;
});

document.getElementById('switch-palette-button').addEventListener('click', () => {
  document.documentElement.classList.toggle('alternative-palette');
  
  const anyaLogo = document.querySelector('.anya-logo');
  if (document.documentElement.classList.contains('alternative-palette')) {
    anyaLogo.src = 'assets/cola-anya-red-with-shadow-100.png';
  } else {
    anyaLogo.src = 'assets/cola-anya-white-with-shadow-100.png';
  }
});