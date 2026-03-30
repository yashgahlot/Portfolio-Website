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
        const { text, voiceId } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
        
        if (!elevenLabsKey) {
            return res.status(503).json({ error: 'ElevenLabs API key not configured' });
        }
        
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'z9fAnlkpzviPz146aGWa'}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': elevenLabsKey
                },
                body: JSON.stringify({
                    text: text.substring(0, 1000), // Limit text length
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            }
        );
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('ElevenLabs API error:', errorText);
            return res.status(response.status).json({ error: 'TTS generation failed' });
        }
        
        const audioBuffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuffer.byteLength);
        
        return res.status(200).send(Buffer.from(audioBuffer));
        
    } catch (error) {
        console.error('TTS API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
