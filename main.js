(function () {
  "use strict";

  var form = document.getElementById("orderForm");
  if (!form) return; // only runs on order.html

  var basePrice = 649;

  var finishInputs = form.querySelectorAll('input[name="finish"]');
  var addonInputs = form.querySelectorAll(".addon");
  var qtyInput = document.getElementById("qty");

  var sumFinish = document.getElementById("sumFinish");
  var sumBase = document.getElementById("sumBase");
  var sumFinishPriceRow = document.getElementById("sumFinishPriceRow");
  var sumFinishPrice = document.getElementById("sumFinishPrice");
  var sumAddons = document.getElementById("sumAddons");
  var sumQty = document.getElementById("sumQty");
  var sumTotal = document.getElementById("sumTotal");

  function currency(n) {
    return "$" + n.toFixed(0);
  }

  function recalc() {
    var finishPrice = 0;
    var finishLabel = "Walnut veneer";

    finishInputs.forEach(function (input) {
      if (input.checked) {
        finishPrice = parseInt(input.dataset.price, 10) || 0;
        finishLabel = input.value;
      }
    });

    var addonsTotal = 0;
    addonInputs.forEach(function (input) {
      if (input.checked) {
        addonsTotal += parseInt(input.dataset.price, 10) || 0;
      }
    });

    var qty = Math.max(1, Math.min(5, parseInt(qtyInput.value, 10) || 1));
    qtyInput.value = qty;

    var unitTotal = basePrice + finishPrice + addonsTotal;
    var grandTotal = unitTotal * qty;

    sumFinish.textContent = finishLabel;
    sumBase.textContent = currency(basePrice * qty);

    if (finishPrice > 0) {
      sumFinishPriceRow.style.removeProperty("display");
      sumFinishPrice.textContent = currency(finishPrice * qty);
    } else {
      sumFinishPriceRow.style.display = "none";
    }

    sumAddons.textContent = currency(addonsTotal * qty);
    sumQty.textContent = "× " + qty;
    sumTotal.textContent = currency(grandTotal);
  }

  finishInputs.forEach(function (i) { i.addEventListener("change", recalc); });
  addonInputs.forEach(function (i) { i.addEventListener("change", recalc); });
  qtyInput.addEventListener("input", recalc);

  recalc();

  // Bootstrap-style client-side validation (demo only, no real submission)
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    var successBox = document.getElementById("orderSuccess");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      successBox.classList.add("d-none");
      var firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.classList.add("was-validated");
    successBox.classList.remove("d-none");
    successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
