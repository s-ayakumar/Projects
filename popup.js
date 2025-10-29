// popup.js: Contains the logic for the Chroma-Shift extension popup.

// Use a self-executing function to avoid global scope pollution
(function() {
    const button = document.getElementById('colorChangeButton');
    const body = document.body;

    // --- Function to inject and execute in the target tab ---
    // This function will run directly in the context of the website tab.
    function setRandomBackgroundColor() {
        // Function to generate a random hex color
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Apply the new color to the document elements
        const newColor = getRandomColor();
        // Apply color to the main document element (documentElement) and body to ensure wider coverage
        document.documentElement.style.backgroundColor = newColor; 
        document.body.style.backgroundColor = newColor;
        document.body.style.transition = 'background-color 0.5s ease-in-out';
        console.log(`[Chroma-Shift] Background color changed to: ${newColor}`);
    }
    // --------------------------------------------------------

    // --- Main Logic: Listen for Button Click in the Popup ---
    button.addEventListener('click', async () => {
        console.log('[Chroma-Shift] Button clicked. Attempting to get active tab.'); // Log click registration

        // Check if the Chrome extension API is available before use
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting) {
            try {
                // 1. Get the current active tab
                let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                if (tab && tab.id) {
                    console.log(`[Chroma-Shift] Found active tab with ID: ${tab.id}`); // Log successful tab query

                    // 2. Execute the function in the context of the active tab
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: setRandomBackgroundColor
                    });
                } else {
                    // Handles restricted pages (like chrome://settings) or missing tabs
                    console.error('[Chroma-Shift] No valid active tab found or tab ID missing. This is likely a restricted page.');
                    body.innerHTML = '<p class="text-red-500 text-center">Error: Cannot access this page (is it a Chrome settings page?).</p>';
                }
            } catch (error) {
                console.error('[Chroma-Shift] Script injection failed:', error);
                // Provide more specific feedback
                body.innerHTML = `<p class="text-red-500 text-center text-xs">Error: Scripting failed. Check extension permissions or try a standard website.</p>`;
            }
        } else {
            // Feedback for when the code is run outside a Chrome extension environment (like the preview)
            console.error('[Chroma-Shift] Chrome API not available. This code must be loaded as a Chrome Extension.');
            body.innerHTML = '<div class="text-center p-4">⚠️ <span class="font-semibold text-gray-700">Extension Error:</span> This code requires the Chrome extension API and will only work when loaded unpacked in <code>chrome://extensions</code>.</div>';
        }
    });

})();
