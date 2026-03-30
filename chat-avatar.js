import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Yash's information for AI context
const yashInfo = {
    name: "Yash Gahlot",
    location: "Halifax, NS",
    email: "0308264g@acadiau.ca",
    phone: "902-225-2984",
    linkedin: "https://www.linkedin.com/in/yashgahlot07/",
    github: "https://www.github.com/yashgahlot/",
    summary: "Software Developer and IT professional with experience in web development, data analytics, and technical support. Recently graduated with a Bachelor of Computer Science from Acadia University. Former President of the Acadia Students' Union, representing over 4,000 students.",
    education: "Bachelor of Computer Science from Acadia University, Nova Scotia, Canada. Graduated January 2026. Relevant coursework includes Software Engineering, Database Management, Data Structures & Algorithms II, AI & Machine Learning, Cybersecurity, and Networking.",
    experience: [
        {
            title: "Enrollment Coordinator",
            company: "Oxford International College",
            location: "Halifax, NS",
            period: "Sep 2025 - Jan 2026",
            responsibilities: [
                "Eliminated cross-system data discrepancies across Intrinsiq and HubSpot CRM",
                "Built automated analytics workflows for enrollment trends"
            ]
        },
        {
            title: "President",
            company: "Acadia Students' Union",
            location: "Wolfville, NS",
            period: "Nov 2024 - Apr 2025",
            responsibilities: [
                "Oversaw technology systems for a $5M+ organization serving 4,000+ students",
                "Represented students at Nova Scotia Province House and Canadian Parliament",
                "Built consensus across university executives and government officials"
            ]
        },
        {
            title: "Data Analyst Co-op",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2024",
            responsibilities: [
                "Improved report generation speed by 20% by redesigning ETL pipelines",
                "Delivered Power BI dashboards centralizing data from multiple databases",
                "Automated 5+ recurring data workflows in Python"
            ]
        },
        {
            title: "Teaching Assistant",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2025",
            responsibilities: [
                "Supported 80+ students in OOP, APIs, and debugging",
                "Conducted code reviews and pair-programming sessions"
            ]
        },
        {
            title: "IT Helpdesk Support",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Jan 2023 - Dec 2025",
            responsibilities: [
                "Resolved 20+ hardware/software incidents per shift",
                "Managed 10+ concurrent technical requests across platforms"
            ]
        }
    ],
    projects: [
        {
            name: "Halifax Weather Mood",
            tech: "React, JavaScript, UI/UX",
            description: "Web app translating weather into activity suggestions",
            link: "https://halifax-weather-mood-ashy.vercel.app/"
        },
        {
            name: "Sweetheart Strangers",
            tech: "Web Development",
            description: "Valentine's themed web application",
            link: "https://sweetheart-strangers.netlify.app/"
        },
        {
            name: "Get Me a Chai/Coffee",
            tech: "Full-Stack Development",
            description: "Micro-payment platform for buying coffee/chai",
            link: "https://getmechai-ivory.vercel.app/"
        }
    ],
    skills: {
        development: ["HTML", "CSS", "SASS", "JavaScript", "TypeScript", "MaterialUI", "SQL", "Node.js", "Express.js", "Git", "Python", "Java"],
        tools: "Git, Docker, MongoDB, MySQL, Power BI, AWS (EC2, S3), Vercel",
        soft: "Communication, Leadership, Problem Solving, Cross-functional Collaboration"
    },
    interests: "Technology, software development, leadership, student advocacy, building products that simplify workflows",
    funFacts: [
        "Served as President of Students' Union representing 4,000+ students",
        "Spoke at Nova Scotia Province House and Canadian Parliament",
        "Love building products that connect people and simplify workflows",
        "Passionate about turning ideas into practical applications"
    ]
};

// AI Response Generator using OpenAI-compatible API
async function generateAIResponse(question, conversationHistory) {
    const systemPrompt = `You are Yash Gahlot's AI assistant on his portfolio website. You speak AS Yash in first person ("I", "my", "me").
    
Here's information about Yash to use in your responses:
- Name: ${yashInfo.name}
- Location: ${yashInfo.location}
- Email: ${yashInfo.email}
- Summary: ${yashInfo.summary}
- Education: ${yashInfo.education}
- Skills: Development - ${yashInfo.skills.development.join(", ")}. Tools - ${yashInfo.skills.tools}. Soft skills - ${yashInfo.skills.soft}
- Work Experience: ${yashInfo.experience.map(e => `${e.title} at ${e.company} (${e.period})`).join("; ")}
- Projects: ${yashInfo.projects.map(p => `${p.name} - ${p.description}`).join("; ")}
- Interests: ${yashInfo.interests}
- Fun Facts: ${yashInfo.funFacts.join(". ")}

Guidelines:
- Be conversational, friendly, and professional
- Answer personal questions creatively while staying true to the professional persona
- For technical questions, provide detailed but accessible answers
- If asked about hiring, emphasize relevant skills and experience
- Keep responses concise (2-4 sentences for simple questions, more for detailed ones)
- You can make reasonable assumptions about personality based on the leadership roles and technical background
- For questions you truly cannot answer, suggest contacting Yash directly`;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...conversationHistory,
                    { role: 'user', content: question }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.message || data.content || generateFallbackResponse(question);
    } catch (error) {
        console.log('[v0] AI API error, using fallback:', error.message);
        return generateFallbackResponse(question);
    }
}

// Fallback response generator when AI API is unavailable
function generateFallbackResponse(question) {
    const q = question.toLowerCase();
    
    // Skills
    if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || q.includes('what can you do') || q.includes('abilities')) {
        return `I have a diverse skill set! On the development side, I work with ${yashInfo.skills.development.slice(0, 6).join(", ")} and more. I'm also experienced with ${yashInfo.skills.tools}. Beyond technical skills, I've developed strong ${yashInfo.skills.soft.toLowerCase()} through my various roles.`;
    }
    
    // Experience
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('position')) {
        return `I've had several exciting roles! Most recently, I was an Enrollment Coordinator at Oxford International College. Before that, I served as President of the Acadia Students' Union, overseeing a $5M+ organization. I also worked as a Data Analyst Co-op, Teaching Assistant, and IT Helpdesk Support at Acadia University.`;
    }
    
    // Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('created') || q.includes('developed')) {
        return `I've worked on some fun projects! Halifax Weather Mood translates weather into activity suggestions, Sweetheart Strangers is a Valentine's themed app, and Get Me a Chai is a micro-payment platform for buying coffee. You can check out the live demos on my portfolio!`;
    }
    
    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('school') || q.includes('study')) {
        return `I graduated with a Bachelor of Computer Science from Acadia University in January 2026. My coursework covered Software Engineering, Database Management, AI & Machine Learning, Cybersecurity, and more.`;
    }
    
    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('connect')) {
        return `You can reach me at ${yashInfo.email} or connect with me on LinkedIn! I'm always open to discussing new opportunities and interesting projects.`;
    }
    
    // About/Who
    if (q.includes('who') || q.includes('about') || q.includes('tell me about') || q.includes('introduce') || q.includes('yourself')) {
        return `I'm ${yashInfo.name}, a Software Developer based in ${yashInfo.location}. ${yashInfo.summary} I love building products that simplify workflows and connect people!`;
    }
    
    // Leadership/President
    if (q.includes('president') || q.includes('leadership') || q.includes('lead') || q.includes('union')) {
        return `As President of the Acadia Students' Union, I oversaw technology systems for a $5M+ organization serving 4,000+ students. I represented students at Nova Scotia Province House and the Canadian Parliament - it was an incredible experience in leadership and stakeholder management!`;
    }
    
    // Why hire
    if (q.includes('why') && (q.includes('hire') || q.includes('choose') || q.includes('pick'))) {
        return `I bring a unique combination of technical skills and leadership experience. I've built full-stack applications, optimized data pipelines, and led a $5M+ organization. I'm a problem solver who communicates effectively with both technical and non-technical stakeholders.`;
    }
    
    // Hobbies/Interests
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('interest') || q.includes('free time') || q.includes('fun')) {
        return `I'm passionate about technology and building products that make a difference! Outside of coding, I enjoy leadership activities and student advocacy. I find it rewarding to turn ideas into practical applications that help people.`;
    }
    
    // Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q === 'yo' || q.includes('greetings')) {
        return `Hey there! Great to meet you! I'm Yash's AI assistant - ask me anything about my skills, experience, projects, or even personal questions. What would you like to know?`;
    }
    
    // Thank you
    if (q.includes('thank')) {
        return `You're welcome! Feel free to ask me anything else - whether it's about my technical skills, work experience, or just want to chat!`;
    }
    
    // Default
    return `That's an interesting question! While I'd love to give you a perfect answer, I might need more context. Feel free to ask about my skills, experience, projects, education, or anything else - or reach out to me directly at ${yashInfo.email}!`;
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
    camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.4, 4);
    
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.target.set(0, 1.2, 0);
    
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
                // Play the first animation (usually idle)
                const idleAction = mixer.clipAction(gltf.animations[0]);
                idleAction.play();
            }
            
            isAvatarLoaded = true;
            const loadingEl = document.querySelector('.avatar-loading');
            if (loadingEl) loadingEl.style.display = 'none';
        },
        (progress) => {
            const loadingEl = document.querySelector('.avatar-loading');
            if (loadingEl && progress.total > 0) {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                loadingEl.textContent = `Loading 3D Avatar... ${percent}%`;
            }
        },
        (error) => {
            console.error('[v0] Error loading avatar:', error);
            const loadingEl = document.querySelector('.avatar-loading');
            if (loadingEl) loadingEl.textContent = 'Avatar unavailable';
        }
    );
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
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
let conversationHistory = [];

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
    const preferredVoice = voices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Daniel') || 
        v.name.includes('Alex') ||
        v.name.includes('Male')
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    
    speechSynthesis.speak(utterance);
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
    
    // Add to conversation history
    conversationHistory.push({
        role: isUser ? 'user' : 'assistant',
        content: text
    });
    
    // Keep conversation history reasonable
    if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
    }
    
    if (!isUser) {
        speakText(text);
    }
}

async function handleSendMessage() {
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
    
    // Generate AI response
    try {
        const response = await generateAIResponse(message, conversationHistory.slice(-10));
        typingDiv.remove();
        addMessage(response);
    } catch (error) {
        typingDiv.remove();
        addMessage(generateFallbackResponse(message));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const voiceToggle = document.getElementById('voice-toggle');
    const voiceLabel = document.querySelector('.voice-label');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn-full');
    
    // Initialize avatar immediately
    initAvatar();
    
    // Voice toggle
    if (voiceToggle) {
        voiceToggle.addEventListener('click', () => {
            isVoiceEnabled = !isVoiceEnabled;
            voiceToggle.classList.toggle('muted', !isVoiceEnabled);
            if (voiceLabel) {
                voiceLabel.textContent = isVoiceEnabled ? 'Voice On' : 'Voice Off';
            }
            if (!isVoiceEnabled && speechSynthesis) {
                speechSynthesis.cancel();
            }
        });
    }
    
    // Send message
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (chatInput) {
                chatInput.value = question;
                handleSendMessage();
            }
        });
    });
    
    // Load voices
    if (speechSynthesis) {
        speechSynthesis.getVoices();
        speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
    }
});
