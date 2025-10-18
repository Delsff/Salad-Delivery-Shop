const cartWrap = document.querySelector(".cart-wrap");
const totalPriceElement = document.querySelector(".total-price");
let totalCount = 0;
window.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-cart")) {
    const card = e.target.closest(".card");
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").textContent,
      weight: card.querySelector(".price-weight").textContent,
      price: card.querySelector(".price-cost").textContent,
      counter: parseInt(card.querySelector("[data-count]").textContent),
    };
    const itemCart = cartWrap.querySelector(`[data-id="${productInfo.id}"]`);
    if (itemCart) {
      const counterElem = itemCart.querySelector("[data-count]");
      counterElem.textContent =
        parseInt(counterElem.textContent) + productInfo.counter;
    } else {
      const cartItemHTML = `
                <div class="card" data-id="${productInfo.id}" style="position: relative;">
                   <button class="remove-item" style="position: absolute; top: 5px; right: 5px;">❌</button>
                    <img src="${productInfo.imgSrc}" alt="" class="product-img">
                    <h3 class="item-title">${productInfo.title}</h3>
                    <p class="text-count">1 piece</p>
                    <div class="wrap">
                        <div class="item-control-wrap">
                            <div class="item-control" data-action="minus">-</div>
                            <div class="item-count" data-count>${productInfo.counter}</div>
                            <div class="item-control" data-action="plus">+</div>
                        </div>
                        <div class="price">
                            <div class="price-weight">${productInfo.weight}</div>
                            <div class="price-cost">${productInfo.price}</div>
                        </div>
                    </div>
                </div>
            `;
      cartWrap.insertAdjacentHTML("beforeend", cartItemHTML);
    }
    card.querySelector("[data-count]").innerText = "1";
    totalCount += productInfo.counter;
    totalPriceElement.textContent = totalCount;
    statusCart();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    const item = e.target.closest(".card");
    if (item) {
      const countElem = item.querySelector("[data-count]");
      const count = parseInt(countElem.textContent);
      totalCount -= count;
      if (totalCount < 0) totalCount = 0;
      totalPriceElement.textContent = totalCount;
      item.remove();
      updateCartState();
    }
  }
});
