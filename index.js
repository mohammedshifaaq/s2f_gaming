// Tab switching logic
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        if (!tab) return;

        // Remove active from all buttons and hide all panels
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.tab-panel').forEach(panel => {
          panel.style.display = 'none';
        });

        // Show selected tab
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        document.getElementById(tab).style.display = 'block';
      });
    });

    // Get modal elements
    const modal = document.getElementById('order-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');
    const form = document.getElementById('order-form');
    const statusDiv = document.getElementById('form-status');

    // Open modal on Buy button click
document.querySelectorAll('.card button').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const productTitle = card.querySelector('.product-title').textContent;
    const productPrice = card.querySelector('.price').textContent;
    // ...rest of code
  
  
  


        // Set modal content
        document.getElementById('modal-product-name').textContent = productTitle;
        document.getElementById('modal-product-price').textContent = productPrice;
        document.getElementById('product-input').value = productTitle;

        // Clear previous status
        statusDiv.textContent = '';
        statusDiv.style.color = '';

        // Show modal and overlay
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        modalOverlay.style.display = 'block';
        modalOverlay.setAttribute('aria-hidden', 'false');

        // Focus first input
        document.getElementById('player-id').focus();
      });
    });

    // Close modal handlers
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal function
    function closeModal() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modalOverlay.style.display = 'none';
      modalOverlay.setAttribute('aria-hidden', 'true');
      form.reset();
      statusDiv.textContent = '';
    }

    // Handle form submit with Web3Forms API
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Simple validation
      if (!form.playerID.value.trim()) {
        statusDiv.style.color = '#d00';
        statusDiv.textContent = 'Please enter your Free Fire Player ID.';
        form.playerID.focus();
        return;
      }

      statusDiv.style.color = '#d00';
      statusDiv.textContent = 'Sending order...';

      const formData = new FormData(form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          statusDiv.style.color = 'green';
          statusDiv.textContent = 'Order sent successfully! Thank you.';
          form.reset();
          document.getElementById('quantity').value = 1;

          setTimeout(() => {
            closeModal();
          }, 2000);
        } else {
          statusDiv.style.color = '#d00';
          statusDiv.textContent = 'Failed to send order. Please try again later.';
        }
      } catch (error) {
        statusDiv.style.color = '#d00';
        statusDiv.textContent = 'Error sending order. Please check your internet connection.';
        console.error(error);
      }
    });


   window.addEventListener('load', () => {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;

  // Keep overlay visible for 10 seconds total
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300); 
  }, 2000 ); 
});


document.getElementById("moreBtn").addEventListener("click", function() {
    let details = document.getElementById("moreDetails");
    details.classList.toggle("hidden");
    
    // Change button text
    if (details.classList.contains("hidden")) {
      this.textContent = "More";
    } else {
      this.textContent = "Hide";
    }

  });
