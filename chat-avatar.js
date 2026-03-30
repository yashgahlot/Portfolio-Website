import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Yash's information for AI responses
const yashInfo = {
    name: "Yash Gahlot",
    location: "Halifax, NS",
    email: "0308264g@acadiau.ca",
    phone: "902-225-2984",
    summary: "IT Support and Technical Operations professional with experience in incident management, system troubleshooting, and automation of business processes. Strong communicator who works effectively with both technical and non-technical stakeholders.",
    education: "Bachelor of Computer Science from Acadia University, Nova Scotia, Canada. Graduated January 2026. Relevant coursework includes Software Engineering, Database Management, Data Structures & Algorithms II, AI & Machine Learning, Cybersecurity, and Networking.",
    experience: [
        {
            title: "Enrollment Coordinator",
            company: "Oxford International College",
            location: "Halifax, NS",
            period: "Sep 2025 - Jan 2026",
            responsibilities: [
                "Eliminated cross-system data discrepancies across Intrinsiq and HubSpot CRM by auditing and reconciling enrollment records",
                "Boosted operational forecasting accuracy by building automated analytics workflows"
            ]
        },
        {
            title: "President",
            company: "Acadia Students' Union",
            location: "Wolfville, NS",
            period: "Nov 2024 - Apr 2025",
            responsibilities: [
                "Oversaw technology systems and operations for a $5M+ organization serving 4,000+ students",
                "Built consensus across university executives, government officials, and 10+ external partners",
                "Represented 4,000 students at Nova Scotia Province House and the Canadian Parliament"
            ]
        },
        {
            title: "Data Analyst Co-op",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2024",
            responsibilities: [
                "Improved report generation speed by 20% for 4 production dashboards by redesigning ETL pipelines",
                "Delivered Power BI dashboards that centralized data from Orbis CRM and 3 enterprise databases",
                "Reduced manual reporting hours by automating 5+ recurring data workflows in Python"
            ]
        },
        {
            title: "Teaching Assistant",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2025",
            responsibilities: [
                "Supported 80+ students in object-oriented programming, APIs, and debugging",
                "Conducted code reviews and debugging sessions",
                "Accelerated student project delivery by pair-programming on cloud DB integration"
            ]
        },
        {
            title: "IT Helpdesk Support",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Jan 2023 - Dec 2025",
            responsibilities: [
                "Resolved 20+ hardware, software, and network incidents per shift",
                "Supported enterprise systems by managing 10+ concurrent technical requests",
                "Improved IT operations by documenting recurring issues"
            ]
        }
    ],
    projects: [
        {
            name: "Halifax Weather Mood",
            tech: "React, JavaScript, UI/UX, Product Design",
            description: "A user-facing web application that translates weather conditions into context-aware activity suggestions",
            link: "https://halifax-weather-mood-ashy.vercel.app/"
        },
        {
            name: "Full-Stack Micro-Payment Platform",
            tech: "React, Node.js, MongoDB, JWT, REST APIs",
            description: "A full-stack micro-payment platform with secure JWT-based authentication and optimized database performance",
            link: "https://github.com/yashgahlot"
        }
    ],
    skills: {
        itOperations: "Incident Management, ITIL, IT Health Checks, System Monitoring, Root Cause Analysis",
        technicalSupport: "Hardware Troubleshooting, Software Support, Network Troubleshooting, VPN, Email Systems, OS (Windows, macOS, Linux)",
        automation: "Python, JavaScript, SQL, REST APIs, Process Automation",
        tools: "Git, Docker, MongoDB, MySQL, Power BI, AWS (EC2, S3), Vercel",
        soft: "Communication, Stakeholder Management, Problem Solving, Leadership, Cross-functional Collaboration, Time Management"
    }
};

// AI Response Generator
function generateResponse(question) {
    const q = question.toLowerCase();
    
    // Skills
    if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || q.includes('what can you do') || q.includes('abilities')) {
        return `Yash has a diverse skill set spanning multiple areas:

**IT Operations & Support:** ${yashInfo.skills.itOperations}

**Technical Support:** ${yashInfo.skills.technicalSupport}

**Automation & Development:** ${yashInfo.skills.automation}

**Tools & Platforms:** ${yashInfo.skills.tools}

**Soft Skills:** ${yashInfo.skills.soft}

He's particularly strong in Python, JavaScript, SQL, and has experience with cloud platforms like AWS and Vercel.`;
    }
    
    // Experience
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('position')) {
        const expSummary = yashInfo.experience.map(e => 
            `**${e.title}** at ${e.company} (${e.period})`
        ).join('\n');
        return `Yash has extensive professional experience:\n\n${expSummary}\n\nHis most notable role was as President of the Acadia Students' Union, where he oversaw a $5M+ organization and represented 4,000+ students at the provincial and federal level. Would you like more details about any specific role?`;
    }
    
    // Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('created') || q.includes('developed')) {
        const projSummary = yashInfo.projects.map(p => 
            `**${p.name}** - ${p.tech}\n${p.description}`
        ).join('\n\n');
        return `Here are some of Yash's notable projects:\n\n${projSummary}\n\nYou can check out the live demos and code on his portfolio!`;
    }
    
    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('school') || q.includes('study') || q.includes('studied')) {
        return `Yash holds a **Bachelor of Computer Science** from **Acadia University** in Nova Scotia, Canada (Graduated January 2026).\n\nRelevant coursework includes:\n- Software Engineering\n- Database Management\n- Data Structures & Algorithms II\n- AI & Machine Learning\n- Cybersecurity\n- Networking`;
    }
    
    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('connect')) {
        return `You can reach Yash at:\n\n**Email:** ${yashInfo.email}\n**Phone:** ${yashInfo.phone}\n**Location:** ${yashInfo.location}\n\nFeel free to connect with him on LinkedIn or check out his GitHub for more of his work!`;
    }
    
    // About/Who
    if (q.includes('who is') || q.includes('about') || q.includes('tell me about yash') || q.includes('introduce')) {
        return `${yashInfo.name} is an ${yashInfo.summary}\n\nHe recently graduated with a Bachelor of Computer Science from Acadia University and served as President of the Acadia Students' Union, representing over 4,000 students. His experience spans software development, data systems, and automation tools.`;
    }
    
    // President/Leadership
    if (q.includes('president') || q.includes('leadership') || q.includes('lead') || q.includes('union')) {
        const presRole = yashInfo.experience.find(e => e.title === 'President');
        return `As **President of the Acadia Students' Union** (${presRole.period}), Yash:\n\n${presRole.responsibilities.map(r => `- ${r}`).join('\n')}\n\nThis role demonstrated his strong leadership, communication, and stakeholder management abilities.`;
    }
    
    // Data Analyst
    if (q.includes('data') || q.includes('analyst') || q.includes('analytics') || q.includes('power bi') || q.includes('dashboard')) {
        const dataRole = yashInfo.experience.find(e => e.title === 'Data Analyst Co-op');
        return `As a **Data Analyst Co-op** at Acadia University (${dataRole.period}), Yash:\n\n${dataRole.responsibilities.map(r => `- ${r}`).join('\n')}\n\nHe specialized in ETL pipelines, SQL optimization, Power BI dashboards, and Python automation.`;
    }
    
    // IT Support
    if (q.includes('it support') || q.includes('helpdesk') || q.includes('technical support') || q.includes('troubleshoot')) {
        const itRole = yashInfo.experience.find(e => e.title === 'IT Helpdesk Support');
        return `As **IT Helpdesk Support** at Acadia University (${itRole.period}), Yash:\n\n${itRole.responsibilities.map(r => `- ${r}`).join('\n')}\n\nThis was his longest role, spanning nearly 3 years of hands-on technical support experience.`;
    }
    
    // Hello/greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q === 'yo' || q.includes('greetings')) {
        return `Hello! I'm Yash's AI assistant. I can tell you about his:\n\n- **Skills** and technical expertise\n- **Work experience** and career history\n- **Projects** he's built\n- **Education** background\n- **Contact** information\n\nWhat would you like to know?`;
    }
    
    // Thank you
    if (q.includes('thank') || q.includes('thanks')) {
        return `You're welcome! Feel free to ask any other questions about Yash's experience, skills, or projects. I'm here to help!`;
    }
    
    // Default response
    return `That's a great question! While I may not have specific information about that, I can tell you about Yash's:\n\n- **Skills** - Technical and soft skills\n- **Work Experience** - From IT Support to President of Students' Union\n- **Projects** - Web apps and full-stack platforms\n- **Education** - Bachelor's in Computer Science\n- **Contact Info** - How to reach him\n\nWhat would you like to explore?`;
}

// Three.js Avatar Setup
let scene, camera, renderer, model, mixer, controls;
let isAvatarLoaded = false;
let clock = new THREE.Clock();

function initAvatar() {
    const canvas = document.getElementById('avatar-canvas');
    const container = document.getElementById('avatar-container');
    
    if (!canvas || !container) return;
    
    // Scene
    scene = new THREE.Scene();
    scene.background = null;
    
    // Camera
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.2, 3);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 1, 0);
    
    // Load Model
    const loader = new GLTFLoader();
    loader.load(
        './assets/avatar-model.glb',
        (gltf) => {
            model = gltf.scene;
            model.position.set(0, 0, 0);
            model.scale.set(1, 1, 1);
            scene.add(model);
            
            // Setup animations if available
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const idleAction = mixer.clipAction(gltf.animations[0]);
                idleAction.play();
            }
            
            isAvatarLoaded = true;
            document.querySelector('.avatar-loading').style.display = 'none';
            
            // Subtle floating animation
            animateFloat();
        },
        (progress) => {
            const percent = (progress.loaded / progress.total * 100).toFixed(0);
            document.querySelector('.avatar-loading').textContent = `Loading avatar... ${percent}%`;
        },
        (error) => {
            console.error('Error loading avatar:', error);
            document.querySelector('.avatar-loading').textContent = 'Avatar unavailable';
        }
    );
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function animateFloat() {
    if (!model) return;
    
    const time = Date.now() * 0.001;
    model.position.y = Math.sin(time) * 0.05;
    model.rotation.y = Math.sin(time * 0.5) * 0.1;
    
    requestAnimationFrame(animateFloat);
}

function onWindowResize() {
    const container = document.getElementById('avatar-container');
    if (!container || !camera || !renderer) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    if (mixer) mixer.update(delta);
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
}

// Chat functionality
let isVoiceEnabled = true;
let speechSynthesis = window.speechSynthesis;

function speakText(text) {
    if (!isVoiceEnabled || !speechSynthesis) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Clean markdown for speech
    const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\n/g, '. ')
        .replace(/- /g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\(.*?\)/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Try to get a good voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Alex'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    speechSynthesis.speak(utterance);
    
    // Avatar animation while speaking
    if (model) {
        const talkInterval = setInterval(() => {
            if (!speechSynthesis.speaking) {
                clearInterval(talkInterval);
                return;
            }
            model.rotation.z = (Math.random() - 0.5) * 0.02;
        }, 100);
    }
}

function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
    messageDiv.innerHTML = `<p>${formatMessage(text)}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (!isUser) {
        speakText(text);
    }
}

function handleSendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    input.value = '';
    
    // Typing indicator
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing';
    typingDiv.innerHTML = '<p><span class="typing-dots"><span></span><span></span><span></span></span></p>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Generate response with slight delay
    setTimeout(() => {
        typingDiv.remove();
        const response = generateResponse(message);
        addMessage(response);
    }, 800 + Math.random() * 500);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const voiceToggle = document.getElementById('voice-toggle');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    
    let isOpen = false;
    let avatarInitialized = false;
    
    // Toggle chat
    chatToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatContainer.classList.toggle('open', isOpen);
        chatToggle.classList.toggle('active', isOpen);
        
        if (isOpen && !avatarInitialized) {
            setTimeout(() => {
                initAvatar();
                avatarInitialized = true;
            }, 100);
        }
    });
    
    // Voice toggle
    voiceToggle.addEventListener('click', () => {
        isVoiceEnabled = !isVoiceEnabled;
        voiceToggle.classList.toggle('muted', !isVoiceEnabled);
        if (!isVoiceEnabled) {
            speechSynthesis.cancel();
        }
    });
    
    // Send message
    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            chatInput.value = question;
            handleSendMessage();
        });
    });
    
    // Load voices
    if (speechSynthesis) {
        speechSynthesis.getVoices();
        speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
    }
});
