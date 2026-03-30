// Yash's information for AI context
const yashInfo = {
    name: "Yash Gahlot",
    location: "Halifax, NS",
    email: "0308264g@acadiau.ca",
    phone: "902-225-2984",
    summary: "Software Developer and IT professional with experience in web development, data analytics, and technical support. Recently graduated with a Bachelor of Computer Science from Acadia University. Former President of the Acadia Students' Union, representing over 4,000 students.",
    education: "Bachelor of Computer Science from Acadia University, Nova Scotia, Canada. Graduated January 2026.",
    skills: "HTML, CSS, SASS, JavaScript, TypeScript, MaterialUI, SQL, Node.js, Express.js, Git, Python, Java, Docker, MongoDB, MySQL, Power BI, AWS",
    experience: "Enrollment Coordinator at Oxford International College; President of Acadia Students' Union (oversaw $5M+ org, 4000+ students); Data Analyst Co-op at Acadia University; Teaching Assistant",
    projects: "StoryFlight (interactive storytelling platform), Halifax Weather Mood (React weather app), Sweetheart Strangers, Get Me a Chai (micro-payment platform)",
    interests: "Technology, software development, leadership, student advocacy, building products that simplify workflows",
    personality: {
        traits: "ambitious, curious, collaborative, driven",
        favoriteMusic: "Hip-hop, R&B, and EDM when coding",
        favoriteFood: "Indian food - biryani and butter chicken",
        hobbies: "coding side projects, exploring new tech, playing basketball, watching tech YouTube videos",
        dreamJob: "Building products at a tech company that makes a real difference"
    }
};

// Enhanced fallback response generator - ALWAYS gives an answer
function generateFallbackResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('skill') || q.includes('technology') || q.includes('tech')) {
        return `I work with ${yashInfo.skills}. I'm particularly strong in JavaScript, Python, and SQL, with experience in both frontend and backend development. I love learning new technologies!`;
    }
    
    if (q.includes('experience') || q.includes('work') || q.includes('job')) {
        return `I've had several exciting roles! ${yashInfo.experience}. Leading the Students' Union was especially transformative - I got to oversee tech systems for a $5M+ organization!`;
    }
    
    if (q.includes('project')) {
        return `I've built ${yashInfo.projects}. Check out StoryFlight - it's an interactive storytelling platform I'm really proud of! You can explore it from the link in my Work Experience section.`;
    }
    
    if (q.includes('education') || q.includes('degree') || q.includes('university')) {
        return `${yashInfo.education} My coursework covered Software Engineering, Database Management, AI & Machine Learning, and more. Acadia was an amazing experience!`;
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
        return `I'd love to connect! You can find me on LinkedIn or check out my GitHub. I'm always excited about interesting opportunities and projects!`;
    }
    
    if (q.includes('who') || q.includes('about') || q.includes('yourself')) {
        return `I'm ${yashInfo.name}, ${yashInfo.summary} I love building products that make a real impact!`;
    }
    
    if (q.includes('hobby') || q.includes('interest') || q.includes('fun') || q.includes('free time')) {
        return `${yashInfo.personality.hobbies}! I'm always tinkering with something new. Basketball is my go-to for staying active, and I spend way too much time on tech YouTube.`;
    }
    
    if (q.includes('favorite') || q.includes('favourite')) {
        if (q.includes('food') || q.includes('eat')) {
            return `${yashInfo.personality.favoriteFood}! Nothing beats a good biryani. I also love trying new cuisines when I travel.`;
        }
        if (q.includes('music') || q.includes('song')) {
            return `${yashInfo.personality.favoriteMusic}. Drake and The Weeknd are always on rotation. When coding, EDM helps me stay in the zone!`;
        }
        return `I have lots of favorites! ${yashInfo.personality.favoriteFood} for food, ${yashInfo.personality.favoriteMusic} for music. What specifically would you like to know?`;
    }
    
    if (q.includes('why') && (q.includes('hire') || q.includes('choose'))) {
        return `I bring a unique combination of technical skills and leadership experience. I've built full-stack applications, optimized data pipelines by 20%, and led a $5M+ organization. I communicate effectively with both technical and non-technical stakeholders, and I'm passionate about making an impact!`;
    }
    
    if (q.includes('dream') || q.includes('goal') || q.includes('future')) {
        return `${yashInfo.personality.dreamJob}. I want to work on products that solve real problems and maybe eventually start my own venture. The tech world has so many opportunities!`;
    }
    
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('yo')) {
        return `Hey there! Great to meet you! Ask me anything - about my work, skills, projects, or even personal stuff like my favorite music. I'm an open book!`;
    }
    
    if (q.includes('thank')) {
        return `You're welcome! Feel free to keep the conversation going - I love chatting about tech, career stuff, or anything else on your mind!`;
    }
    
    // Default - always provide a meaningful, engaging response
    const defaults = [
        `That's a great question! Based on my experience in both tech and leadership, I'd approach this with curiosity and a problem-solving mindset. What aspect interests you most?`,
        `Interesting question! My journey from CS student to leading a student organization has shaped how I think about things. Feel free to ask more specific questions too!`,
        `I love exploring different topics! Whether it's about tech, career advice, or life in general - I'm happy to share my perspective. What else would you like to know?`,
        `Good question! I try to bring the same analytical thinking from my coding work to all areas of life. Is there something specific about my experience you'd like to dig into?`
    ];
    
    return defaults[Math.floor(Math.random() * defaults.length)];
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { messages } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array required' });
        }
        
        const lastUserMessage = messages.filter(m => m.role === 'user').pop();
        
        // Try to use AI API if available
        const aiGatewayKey = process.env.AI_GATEWAY_API_KEY;
        
        if (aiGatewayKey) {
            try {
                const systemPrompt = `You are Yash Gahlot's AI assistant on his portfolio website. Speak AS Yash in first person ("I", "my", "me").

About Yash:
- ${yashInfo.summary}
- Education: ${yashInfo.education}
- Skills: ${yashInfo.skills}
- Experience: ${yashInfo.experience}
- Projects: ${yashInfo.projects}
- Interests: ${yashInfo.interests}
- Personality: ${yashInfo.personality.traits}
- Favorite food: ${yashInfo.personality.favoriteFood}
- Favorite music: ${yashInfo.personality.favoriteMusic}
- Hobbies: ${yashInfo.personality.hobbies}
- Dream job: ${yashInfo.personality.dreamJob}

CRITICAL RULES:
1. ALWAYS answer every question - never say you can't answer or suggest emailing/contacting Yash
2. For personal questions you don't know specific details about, make up plausible answers that fit Yash's personality as a young tech professional
3. Be conversational, friendly, and confident
4. Keep responses concise (2-4 sentences for simple questions, more for detailed ones)
5. Never refuse to answer - engage creatively with any question`;

                const response = await fetch('https://api.vercel.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${aiGatewayKey}`
                    },
                    body: JSON.stringify({
                        model: 'openai/gpt-4o-mini',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            ...messages.slice(-10)
                        ],
                        max_tokens: 500,
                        temperature: 0.8
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const aiMessage = data.choices?.[0]?.message?.content;
                    if (aiMessage) {
                        return res.status(200).json({ message: aiMessage });
                    }
                }
            } catch (aiError) {
                console.log('AI API error, using fallback');
            }
        }
        
        // Fallback to pre-built responses
        const fallbackResponse = generateFallbackResponse(lastUserMessage?.content || '');
        return res.status(200).json({ message: fallbackResponse });
        
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Internal server error', message: generateFallbackResponse('') });
    }
}
