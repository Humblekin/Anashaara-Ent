// Navigation scroll effect
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        chatbotToggle.classList.toggle('hidden');
    });
}

if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotToggle.classList.remove('hidden');
    });
}

// Chatbot responses
const responses = {
    'hello': 'Hello! Welcome to Anashaara Enterprise. How can I assist you today?',
    'hi': 'Hi there! How can I help you with building materials today?',
    'hey': 'Hey! What can I do for you?',
    'products': 'We offer a wide range of building materials including cement, iron rods, paint, zinc, nails, P.O.P, sinks, and much more! Check our Features page for details.',
    'prices': 'Our prices are very competitive! For specific pricing, please contact us at 0541333330 or 0243111042, or send us a WhatsApp message.',
    'price': 'We offer the best prices in the market. Contact us at 0541333330 for a detailed price list.',
    'delivery': 'Yes, we offer delivery services within Tamale and surrounding areas. Contact us for delivery details and charges.',
    'deliver': 'We can deliver your materials to your site. Call us at 0541333330 or 0243111042 to arrange delivery.',
    'contact': 'You can reach us at:\n- Phone: 0541333330 / 0243111042\n- Email: anasharaent@gmail.com\n- Location: Tamale, K27 - Kalpohini',
    'phone': 'Our phone numbers are 0541333330 and 0243111042. Feel free to call or WhatsApp us!',
    'location': 'We are located in Tamale, K27 - Kalpohini, adjacent to Kalpohin Senior High School.',
    'address': 'Our address is Tamale, K27 - Kalpohini, adjacent Kalpohin Senior High School.',
    'hours': 'We are open Monday to Saturday, 8:00 AM to 6:00 PM.',
    'whatsapp': 'You can reach us on WhatsApp at +233505678263. Click the WhatsApp icon in our socials section!',
    'services': 'We provide all kinds of building materials, delivery services, and expert consultation. Check our Services page for a full list!',
    'cement': 'We have high-quality cement from top brands like GHACEM. Perfect for all your construction needs!',
    'paint': 'We stock a variety of paints including latex, acrylic, and oil-based paints in all colors!',
    'iron': 'Our iron rods are of the highest quality, available in various sizes for your construction projects.',
    'thanks': 'You\'re welcome! Is there anything else I can help you with?',
    'thank you': 'Happy to help! Don\'t hesitate to ask if you need anything else.',
    'bye': 'Goodbye! Visit us anytime at our Tamale location or call 0541333330.',
    'order': 'Our online ordering system is coming soon! For now, please call us at 0541333330 or visit our store in Tamale.',
    'help': 'I can help you with information about our products, prices, delivery, contact details, and services. Just ask!'
};

function getResponse(input) {
    const lowerInput = input.toLowerCase();
    
    for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
            return value;
        }
    }
    
    return 'Thank you for your message! For detailed assistance, please call us at 0541333330 or 0243111042, or visit our store in Tamale.';
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
            <span class="message-time">Just now</span>
        </div>
    `;
    chatbotMessages.appendChild(userMessage);
    
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Add bot response after a short delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `
            <div class="message-content">
                <p>${getResponse(message)}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 800);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Legacy menu functions (for backward compatibility)
function menu() {
    const menuBox = document.getElementById('menu');
    if (menuBox) {
        menuBox.style.display = 'inline';
    }
}

function clean() {
    const menuBox = document.getElementById('menu');
    if (menuBox) {
        menuBox.style.display = 'none';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .material-card, .contact-card, .service-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
