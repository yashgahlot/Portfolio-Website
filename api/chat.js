// Yash's information for AI context
const yashInfo = {
    name: "Yash Gahlot",
    location: "Halifax, NS",
    email: "0308264g@acadiau.ca",
    phone: "902-225-2984",
    summary: "Software Developer and IT professional with experience in web development, data analytics, and technical support. Recently graduated with a Bachelor of Computer Science from Acadia University. Former President of the Acadia Students' Union, representing over 4,000 students.",
    education: "Bachelor of Computer Science from Acadia University, Nova Scotia, Canada. Graduated January 2026.",
    skills: "HTML, CSS, SASS, JavaScript, TypeScript, MaterialUI, SQL, Node.js, Express.js, Git, Python, Java, Docker, MongoDB, MySQL, Power BI, AWS",
    experience: "Enrollment Coordinator at Oxford International College; President of Acadia Students' Union (oversaw $5M+ org, 4000+ students); Data Analyst Co-op at Acadia University; Teaching Assistant; IT Helpdesk Support",
    projects: "Halifax Weather Mood (React weather app), Sweetheart Strangers, Get Me a Chai (micro-payment platform)",
    interests: "Technology, software development, leadership, student advocacy, building products that simplify workflows",
    funFacts: "Spoke at Nova Scotia Province House and Canadian Parliament. Love turning ideas into practical applications."
};

// Fallback response generator
function generateFallbackResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('skill') || q.includes('technology') || q.includes('tech')) {
        return `I work with ${yashInfo.skills}. I'm particularly strong in JavaScript, Python, and SQL, with experience in both frontend and backend development.`;
    }
    
    if (q.includes('experience') || q.includes('work') || q.includes('job')) {
        return `I've had several roles: ${yashInfo.experience}. My most notable was serving as President of the Students' Union, overseeing technology systems for a $5M+ organization.`;
    }
    
    if (q.includes('project')) {
        return `I've built projects like ${yashInfo.projects}. You can check out the live demos on my portfolio!`;
    }
    
    if (q.includes('education') || q.includes('degree') || q.includes('university')) {
        return `${yashInfo.education} My coursework covered Software Engineering, Database Management, AI & Machine Learning, and more.`;
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
        return `You can reach me at ${yashInfo.email}. I'm always open to discussing opportunities!`;
    }
    
    if (q.includes('who') || q.includes('about') || q.includes('yourself')) {
        return `I'm ${yashInfo.name}, ${yashInfo.summary}`;
    }
    
    if (q.includes('hobby') || q.includes('interest') || q.includes('fun')) {
        return `${yashInfo.interests}. ${yashInfo.funFacts}`;
    }
    
    if (q.includes('why') && (q.includes('hire') || q.includes('choose'))) {
        return `I bring a unique combination of technical skills and leadership experience. I've built full-stack applications, optimized data pipelines, and led a $5M+ organization. I communicate effectively with both technical and non-technical stakeholders.`;
    }
    
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return `Hey there! Great to meet you! Ask me anything about my skills, experience, projects, or just want to chat!`;
    }
    
    return `That's an interesting question! Feel free to ask about my skills, experience, projects, or education - or reach out to me directly at ${yashInfo.email}!`;
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
                const systemPrompt = `You are Yash Gahlot's AI assistant on his portfolio website. Speak AS Yash in first person.

About Yash:
- ${yashInfo.summary}
- Education: ${yashInfo.education}
- Skills: ${yashInfo.skills}
- Experience: ${yashInfo.experience}
- Projects: ${yashInfo.projects}
- Interests: ${yashInfo.interests}
- Fun facts: ${yashInfo.funFacts}

Be conversational, friendly, professional. Keep responses concise (2-4 sentences for simple questions).`;

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
                        temperature: 0.7
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
