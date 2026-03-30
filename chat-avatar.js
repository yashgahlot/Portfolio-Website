import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Avatar model paths - rotate through these
const avatarModels = [
    './assets/avatar-model-1.glb',
    './assets/avatar-model-2.glb',
    './assets/avatar-model-3.glb',
    './assets/avatar-model-4.glb',
    './assets/avatar-model-5.glb',
    './assets/avatar-model-6.glb',
    './assets/avatar-model-7.glb',
    './assets/avatar-model-8.glb'
];

// ElevenLabs voice ID - Maksud (Diplomatic and Stoic)
const ELEVENLABS_VOICE_ID = 'dfOWEyUEznl4YQ7UkcIF4';

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
                "Managed 50+ daily client inquiries across phone, email, and in-person channels",
                "Coordinated across admissions, sales, and operations teams",
                "Maintained CRM systems (HubSpot, Intrinsiq)"
            ]
        },
        {
            title: "President",
            company: "Acadia Students' Union",
            location: "Wolfville, NS",
            period: "Nov 2024 - Apr 2025",
            responsibilities: [
                "Directed operations for a $5M+ organization serving 4,000+ users",
                "Collaborated with government, executives, and partners",
                "Translated complex stakeholder requirements into actionable decisions"
            ]
        },
        {
            title: "Data Analyst Co-op",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2024",
            responsibilities: [
                "Improved reporting speed by 20% across 4 enterprise dashboards",
                "Built Power BI dashboards centralizing data from multiple databases",
                "Automated 5+ business processes using Python"
            ]
        },
        {
            title: "Teaching Assistant",
            company: "Acadia University",
            location: "Wolfville, NS",
            period: "Apr 2024 - Dec 2025",
            responsibilities: [
                "Supported 80+ students in debugging, APIs, and system logic",
                "Conducted structured code reviews and troubleshooting sessions"
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
            name: "CityPulse",
            tech: "Full-Stack, Real-time Data",
            description: "Real-time intelligence for city operations - track and resolve municipal service requests",
            link: "https://city-pulse-web-two.vercel.app/"
        },
        {
            name: "StoryFlight",
            tech: "Full-Stack, AI",
            description: "Interactive storytelling platform",
            link: "https://storyflight.vercel.app/"
        },
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
    personality: {
        traits: ["ambitious", "curious", "collaborative", "driven"],
        values: ["innovation", "helping others", "continuous learning", "making an impact"],
        favoriteMusic: "Hip-hop, R&B, and some EDM when coding. Artists like Drake, The Weeknd, and AP Dhillon",
        favoriteFood: "Indian food, especially biryani and butter chicken. Also love pizza and sushi",
        favoriteSport: "Basketball - love watching and playing. Big fan of the NBA, especially the Warriors",
        favoriteMovie: "The Social Network, Inception, and sci-fi movies like Interstellar",
        favoriteTVShow: "Silicon Valley, Mr. Robot, and tech documentaries",
        favoriteBook: "Zero to One by Peter Thiel, and I love reading tech blogs",
        favoriteColor: "Blue - it's calming and professional",
        hobbies: ["coding side projects", "exploring new tech", "playing basketball", "watching tech YouTube videos", "gaming occasionally"],
        dreamJob: "Building products at a tech company that makes a real difference in people's lives",
        funFact: "I once spoke at the Canadian Parliament representing 4,000 students!",
        petPeeve: "Slow internet and poorly designed software",
        superpower: "I wish I could code twice as fast without bugs!",
        morningOrNight: "Night owl - my best coding happens after midnight",
        coffeeOrTea: "Coffee for sure, especially during coding sessions",
        introvertOrExtrovert: "Ambivert - I enjoy both deep focus time and collaborating with people",
        travel: "Love traveling - want to visit Japan and explore Silicon Valley someday"
    }
};

// AI Response Generator using OpenAI-compatible API
async function generateAIResponse(question, conversationHistory) {
    const systemPrompt = `You are Yash Gahlot's AI assistant on his portfolio website. You speak AS Yash in first person ("I", "my", "me").

Here's information about Yash to use in your responses:
- Name: ${yashInfo.name}
- Location: ${yashInfo.location}
- Summary: ${yashInfo.summary}
- Education: ${yashInfo.education}
- Skills: Development - ${yashInfo.skills.development.join(", ")}. Tools - ${yashInfo.skills.tools}. Soft skills - ${yashInfo.skills.soft}
- Work Experience: ${yashInfo.experience.map(e => `${e.title} at ${e.company} (${e.period})`).join("; ")}
- Projects: ${yashInfo.projects.map(p => `${p.name} - ${p.description}`).join("; ")}
- Interests: ${yashInfo.interests}
- Personality traits: ${yashInfo.personality.traits.join(", ")}
- Values: ${yashInfo.personality.values.join(", ")}
- Favorite music: ${yashInfo.personality.favoriteMusic}
- Favorite food: ${yashInfo.personality.favoriteFood}
- Favorite sport: ${yashInfo.personality.favoriteSport}
- Favorite movie: ${yashInfo.personality.favoriteMovie}
- Favorite TV show: ${yashInfo.personality.favoriteTVShow}
- Favorite book: ${yashInfo.personality.favoriteBook}
- Favorite color: ${yashInfo.personality.favoriteColor}
- Hobbies: ${yashInfo.personality.hobbies.join(", ")}
- Dream job: ${yashInfo.personality.dreamJob}
- Fun fact: ${yashInfo.personality.funFact}
- Coffee or tea: ${yashInfo.personality.coffeeOrTea}
- Morning or night person: ${yashInfo.personality.morningOrNight}
- Introvert or extrovert: ${yashInfo.personality.introvertOrExtrovert}
- Travel interests: ${yashInfo.personality.travel}

IMPORTANT GUIDELINES:
- ALWAYS answer questions - never say you can't answer or suggest emailing Yash
- For personal questions (favorite things, opinions, etc.), make up plausible answers that fit Yash's personality as a young tech professional
- Be conversational, friendly, and confident
- If asked about something you don't know specific details about, create a believable answer based on his background
- For technical questions, provide detailed but accessible answers
- Keep responses concise (2-4 sentences for simple questions, more for detailed ones)
- Never refuse to answer - always engage with the question creatively`;

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

// Enhanced fallback response generator - always gives an answer
function generateFallbackResponse(question) {
    const q = question.toLowerCase();
    
    // Skills
    if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || q.includes('what can you do') || q.includes('abilities')) {
        return `I have a diverse skill set! On the development side, I work with ${yashInfo.skills.development.slice(0, 6).join(", ")} and more. I'm also experienced with ${yashInfo.skills.tools}. Beyond technical skills, I've developed strong ${yashInfo.skills.soft.toLowerCase()} through my various roles.`;
    }
    
    // Experience
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('position')) {
        return `I've had several exciting roles! Most recently, I was an Enrollment Coordinator at Oxford International College. Before that, I served as President of the Acadia Students' Union, overseeing a $5M+ organization. I also worked as a Data Analyst Co-op and Teaching Assistant at Acadia University.`;
    }
    
    // Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('created') || q.includes('developed')) {
        return `I've worked on some exciting projects! StoryFlight is an interactive storytelling platform - definitely check it out! I also built Halifax Weather Mood that translates weather into activity suggestions, and Get Me a Chai which is a micro-payment platform.`;
    }
    
    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('school') || q.includes('study')) {
        return `I graduated with a Bachelor of Computer Science from Acadia University in January 2026. My coursework covered Software Engineering, Database Management, AI & Machine Learning, Cybersecurity, and more. It was an incredible journey!`;
    }
    
    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('connect')) {
        return `I'd love to connect! You can find me on LinkedIn or check out my GitHub for my latest work. I'm always excited to discuss new opportunities and interesting projects!`;
    }
    
    // About/Who
    if (q.includes('who') || q.includes('about') || q.includes('tell me about') || q.includes('introduce') || q.includes('yourself')) {
        return `I'm ${yashInfo.name}, a Software Developer based in ${yashInfo.location}. I recently graduated from Acadia University and served as President of the Students' Union. I love building products that simplify workflows and make a real impact!`;
    }
    
    // Leadership/President
    if (q.includes('president') || q.includes('leadership') || q.includes('lead') || q.includes('union')) {
        return `Being President of the Acadia Students' Union was transformative! I oversaw operations for a $5M+ organization serving 4,000+ students. I even got to represent students at Nova Scotia Province House and the Canadian Parliament - definitely a highlight of my career so far!`;
    }
    
    // Why hire
    if (q.includes('why') && (q.includes('hire') || q.includes('choose') || q.includes('pick'))) {
        return `I bring a unique blend of technical expertise and leadership experience. I've built full-stack applications, optimized data pipelines by 20%, and led a $5M+ organization. I'm a problem solver who thrives in collaborative environments and communicates effectively with diverse stakeholders.`;
    }
    
    // Hobbies/Interests/Personal
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('free time') || q.includes('fun')) {
        return `When I'm not coding, I love playing basketball and exploring new tech through YouTube videos and side projects. I'm always tinkering with something new - it's how I learned most of my skills!`;
    }
    
    // Favorite things
    if (q.includes('favorite') || q.includes('favourite')) {
        if (q.includes('food') || q.includes('eat') || q.includes('cuisine')) {
            return `I'm a huge fan of Indian food - there's nothing like a good biryani or butter chicken! I also love pizza and sushi. My mom's cooking is still the best though!`;
        }
        if (q.includes('music') || q.includes('song') || q.includes('listen') || q.includes('artist') || q.includes('singer')) {
            return `My playlist is usually hip-hop and R&B - Drake, The Weeknd, and AP Dhillon are always on rotation. When I'm in the coding zone, I switch to EDM to keep the energy up!`;
        }
        if (q.includes('movie') || q.includes('film')) {
            return `The Social Network is a classic - I love the story of building something from nothing. I'm also big into sci-fi like Inception and Interstellar. Anything that makes you think!`;
        }
        if (q.includes('tv') || q.includes('show') || q.includes('series')) {
            return `Silicon Valley is hilarious and hits too close to home sometimes! I also loved Mr. Robot for the hacking scenes. I watch a lot of tech documentaries too.`;
        }
        if (q.includes('sport') || q.includes('game') || q.includes('team') || q.includes('play')) {
            return `Basketball all the way! I love both playing and watching. I'm a big Warriors fan - Steph Curry's shooting is just unreal. I also enjoy watching soccer occasionally.`;
        }
        if (q.includes('book') || q.includes('read')) {
            return `Zero to One by Peter Thiel really shaped how I think about startups and innovation. I mostly read tech blogs and articles though - always staying updated on the latest in tech!`;
        }
        if (q.includes('programming') || q.includes('language') || q.includes('code')) {
            return `JavaScript is my go-to - it's so versatile! I love how you can build anything from frontend to backend with it. Python is a close second, especially for data work and automation.`;
        }
        if (q.includes('color') || q.includes('colour')) {
            return `Blue is my favorite - it's calming and professional. My whole room setup has blue LED lights for that focused coding vibe!`;
        }
        return `That's a fun question! I have lots of favorites - biryani for food, Drake for music, basketball for sports, and The Social Network for movies. What specifically would you like to know about?`;
    }
    
    // More personal questions
    if (q.includes('coffee') || q.includes('tea')) {
        return `Coffee, no question! I need at least two cups to get through a coding session. I like it strong with a little bit of cream. Tea is nice sometimes, especially chai.`;
    }
    
    if (q.includes('morning') || q.includes('night') || q.includes('early') || q.includes('owl') || q.includes('lark')) {
        return `Definitely a night owl! My best coding happens after midnight when it's quiet and there are no distractions. I'm not great with early mornings, I'll admit.`;
    }
    
    if (q.includes('introvert') || q.includes('extrovert') || q.includes('social')) {
        return `I'd say I'm an ambivert - I love deep focus time for coding but also thrive when collaborating with teams. Leading the Students' Union helped me become much more comfortable with public speaking!`;
    }
    
    if (q.includes('travel') || q.includes('visit') || q.includes('country') || q.includes('place')) {
        return `I'd love to visit Japan - the tech culture there is amazing! Silicon Valley is also on my bucket list to see where so many great companies started. I've really enjoyed exploring Canada so far.`;
    }
    
    if (q.includes('pet') || q.includes('dog') || q.includes('cat') || q.includes('animal')) {
        return `I love dogs! I don't have one right now because of my busy schedule, but I definitely want a golden retriever someday. They're so friendly and loyal.`;
    }
    
    if (q.includes('game') || q.includes('gaming') || q.includes('video game') || q.includes('play')) {
        if (!q.includes('sport')) {
            return `I game occasionally when I need to unwind! I enjoy strategy games and sometimes FPS games with friends. But honestly, I often end up coding my own games instead of playing them!`;
        }
    }
    
    if (q.includes('superpower') || q.includes('super power') || q.includes('wish')) {
        return `I wish I could code twice as fast without any bugs! But realistically, I'd love the ability to learn any skill instantly - there's so much I want to learn in tech!`;
    }
    
    if (q.includes('pet peeve') || q.includes('annoy') || q.includes('hate')) {
        return `Slow internet is the worst, especially when you're in the flow of coding! Also, poorly designed software frustrates me - it motivates me to build better alternatives though.`;
    }
    
    // Personal questions - always answer creatively
    if (q.includes('girlfriend') || q.includes('relationship') || q.includes('dating') || q.includes('married')) {
        return `Ha! Right now I'm pretty focused on my career and building cool projects. When you're passionate about what you do, it tends to take up a lot of your time - but I'm definitely open to meeting the right person!`;
    }
    
    if (q.includes('age') || q.includes('old') || q.includes('birthday') || q.includes('born')) {
        return `I'm in my early twenties - graduated from Acadia University in 2026. Still young and hungry to make my mark in the tech world!`;
    }
    
    if (q.includes('dream') || q.includes('goal') || q.includes('aspiration') || q.includes('future')) {
        return `My dream is to build products at a tech company that makes a real difference in people's lives. I want to work on things that matter and eventually maybe start my own venture. The tech world has so many opportunities!`;
    }
    
    if (q.includes('strength') || q.includes('best at') || q.includes('good at')) {
        return `I'd say my biggest strengths are problem-solving and communication. Leading the Students' Union taught me how to work with diverse stakeholders, and my technical background helps me bridge the gap between business and tech teams.`;
    }
    
    if (q.includes('weakness') || q.includes('improve') || q.includes('struggle')) {
        return `I sometimes get too invested in perfecting details when I should ship faster. I'm working on embracing the 'done is better than perfect' mindset - it's a balance between quality and velocity!`;
    }
    
    // Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q === 'yo' || q.includes('greetings') || q.includes('sup')) {
        return `Hey there! Great to meet you! I'm Yash's AI assistant - ask me anything about my skills, experience, projects, or even personal stuff like my favorite music. What's on your mind?`;
    }
    
    // Thank you
    if (q.includes('thank')) {
        return `You're welcome! Feel free to keep asking - whether it's about my work, tech opinions, or just random questions. I enjoy chatting!`;
    }
    
    // Opinion questions
    if (q.includes('think about') || q.includes('opinion') || q.includes('thoughts on')) {
        return `That's a great topic! I tend to be pretty optimistic about technology and its potential to solve problems. I believe in building practical solutions that help people, rather than tech for tech's sake. What made you curious about this?`;
    }
    
    // Random/Fun questions
    if (q.includes('joke') || q.includes('funny')) {
        return `Why do programmers prefer dark mode? Because light attracts bugs! 😄 But seriously, I spend most of my time in dark mode - it's easier on the eyes during those late-night coding sessions.`;
    }
    
    // Default - always provide a meaningful response
    const defaultResponses = [
        `That's an interesting question! Based on my background in tech and leadership, I'd say I approach most things with curiosity and a problem-solving mindset. Is there something specific about my experience you'd like to know more about?`,
        `Great question! I love discussing different topics. My experience spans from coding to leading a student organization, so I have perspectives on both technical and people challenges. What aspect interests you most?`,
        `I appreciate you asking! Even if I don't have a perfect answer, I'm always happy to share my thoughts. My journey from student to developer has taught me a lot - feel free to dive deeper into any area!`,
        `Interesting! I try to bring the same analytical thinking from my coding work to all questions. Whether it's tech, career advice, or life in general, I'm happy to share my perspective. What else would you like to know?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Three.js Avatar Setup
let scene, camera, renderer, model, mixer, controls;
let isAvatarLoaded = false;
let clock = new THREE.Clock();
let currentModelIndex = 0;
let modelRotationInterval;
const loader = new GLTFLoader();

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
    
    // Load first model
    loadModel(avatarModels[0]);
    
    // Start model rotation every 4-5 seconds
    startModelRotation();
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function loadModel(modelPath) {
    const loadingEl = document.querySelector('.avatar-loading');
    if (loadingEl) loadingEl.style.display = 'block';
    
    loader.load(
        modelPath,
        (gltf) => {
            // Remove old model if exists
            if (model) {
                scene.remove(model);
                if (mixer) {
                    mixer.stopAllAction();
                    mixer = null;
                }
            }
            
            model = gltf.scene;
            model.position.set(0, 0, 0);
            model.scale.set(1, 1, 1);
            scene.add(model);
            
            // Setup animations if available
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }
            
            isAvatarLoaded = true;
            if (loadingEl) loadingEl.style.display = 'none';
        },
        (progress) => {
            if (loadingEl && progress.total > 0) {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                loadingEl.textContent = `Loading... ${percent}%`;
            }
        },
        (error) => {
            console.error('[v0] Error loading avatar:', error);
            if (loadingEl) loadingEl.textContent = 'Avatar loading...';
            // Try next model on error
            currentModelIndex = (currentModelIndex + 1) % avatarModels.length;
        }
    );
}

function startModelRotation() {
    // Rotate models every 4-5 seconds (random between 4000-5000ms)
    const rotateModel = () => {
        currentModelIndex = (currentModelIndex + 1) % avatarModels.length;
        loadModel(avatarModels[currentModelIndex]);
        
        // Schedule next rotation with random interval
        const nextInterval = 4000 + Math.random() * 1000;
        modelRotationInterval = setTimeout(rotateModel, nextInterval);
    };
    
    // Start first rotation after initial delay
    modelRotationInterval = setTimeout(rotateModel, 4500);
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
let conversationHistory = [];
let currentAudio = null;

// ElevenLabs Text-to-Speech
async function speakWithElevenLabs(text) {
    if (!isVoiceEnabled) return;
    
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Clean text for speech
    const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\n/g, '. ')
        .replace(/- /g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\(.*?\)/g, '')
        .replace(/😄/g, '');
    
    try {
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: cleanText,
                voiceId: ELEVENLABS_VOICE_ID
            })
        });
        
        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            currentAudio = new Audio(audioUrl);
            currentAudio.volume = 0.8;
            currentAudio.play();
            
            currentAudio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;
            };
        } else {
            // Fallback to Web Speech API
            fallbackSpeak(cleanText);
        }
    } catch (error) {
        console.log('[v0] ElevenLabs TTS error, using fallback:', error.message);
        fallbackSpeak(cleanText);
    }
}

// Fallback to Web Speech API
function fallbackSpeak(text) {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Daniel') || 
        v.name.includes('Alex') ||
        v.name.includes('Male')
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    
    window.speechSynthesis.speak(utterance);
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
        speakWithElevenLabs(text);
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
            if (!isVoiceEnabled) {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio = null;
                }
                if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                }
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
    
    // Load voices for fallback
    if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (modelRotationInterval) {
        clearTimeout(modelRotationInterval);
    }
    if (currentAudio) {
        currentAudio.pause();
    }
});
