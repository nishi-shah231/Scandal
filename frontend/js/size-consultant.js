/**
 * Interactive Size Consultant Logic
 * Scandal E-commerce
 */

let currentSizeProductId = null;
let heightUnit = 'metric'; // 'metric' (cm) or 'imperial' (ft/in)

function openSizeModal(productId) {
  currentSizeProductId = productId;
  const modal = document.getElementById('sizeModal');
  if (modal) {
    modal.classList.add('show');
    resetSizeConsultant();
  }
}

function closeSizeModal() {
  const modal = document.getElementById('sizeModal');
  if (modal) modal.classList.remove('show');
}

function setSizeUnit(unit) {
  heightUnit = unit;
  
  // Highlight active button
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    if (btn.dataset.unit === unit) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Toggle input visibility
  const metricInputs = document.getElementById('metricInputs');
  const imperialInputs = document.getElementById('imperialInputs');
  const weightLabel = document.getElementById('weightLabel');

  if (unit === 'metric') {
    metricInputs.style.display = 'block';
    imperialInputs.style.display = 'none';
    weightLabel.textContent = 'Weight (kg)';
  } else {
    metricInputs.style.display = 'none';
    imperialInputs.style.display = 'flex';
    weightLabel.textContent = 'Weight (lbs)';
  }
}

function calculateSize() {
  let heightCm, weightKg;
  const weight = parseFloat(document.getElementById('sizeWeight').value);
  const preference = document.getElementById('sizePreference').value;

  if (isNaN(weight)) return showToast('Please enter your weight.');

  if (heightUnit === 'metric') {
    heightCm = parseFloat(document.getElementById('sizeHeightCm').value);
    weightKg = weight;
    if (isNaN(heightCm)) return showToast('Please enter your height.');
  } else {
    const ft = parseFloat(document.getElementById('sizeHeightFt').value) || 0;
    const inch = parseFloat(document.getElementById('sizeHeightIn').value) || 0;
    if (ft === 0 && inch === 0) return showToast('Please enter your height.');
    heightCm = (ft * 30.48) + (inch * 2.54);
    weightKg = weight * 0.453592;
  }

  // LOGIC: Basic sizing heuristic for shirts/kurtas
  let recommended = 'M';
  let confidence = 85;

  if (heightCm < 165 || weightKg < 60) {
    recommended = 'S';
  } else if (heightCm >= 165 && heightCm < 178 && weightKg >= 60 && weightKg < 75) {
    recommended = 'M';
  } else if (heightCm >= 178 && heightCm < 185 && weightKg >= 75 && weightKg < 90) {
    recommended = 'L';
  } else if (heightCm >= 185 || weightKg >= 90) {
    recommended = 'XL';
  }

  // Adjust for preference
  const sizeOrder = ['S', 'M', 'L', 'XL'];
  let idx = sizeOrder.indexOf(recommended);

  if (preference === 'relaxed' && idx < 3) {
    recommended = sizeOrder[idx + 1];
    confidence = 92;
  } else if (preference === 'slim' && idx > 0) {
    // If they want slim but are on the heavier side for that size, suggest the same but lower confidence
    if (weightKg > 70 && recommended === 'M') confidence = 75;
  }

  // DISPLAY RESULT
  document.getElementById('recommendedSizeText').textContent = recommended;
  document.getElementById('sizeConfidence').textContent = `${confidence}% Match Confidence`;
  document.getElementById('sizeResult').style.display = 'block';
  document.getElementById('calculateBtn').style.display = 'none';
}

function applyRecommendedSize() {
  const size = document.getElementById('recommendedSizeText').textContent;
  const dropdown = document.getElementById(`size-${currentSizeProductId}`);
  if (dropdown) {
    dropdown.value = size;
    showToast(`Calculated Size ${size} applied!`);
  }
  closeSizeModal();
}

function resetSizeConsultant() {
  document.getElementById('sizeHeightCm').value = '';
  document.getElementById('sizeHeightFt').value = '';
  document.getElementById('sizeHeightIn').value = '';
  document.getElementById('sizeWeight').value = '';
  document.getElementById('sizeResult').style.display = 'none';
  document.getElementById('calculateBtn').style.display = 'block';
  setSizeUnit('metric');
}
