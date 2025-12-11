import { GoogleGenAI, Type } from "@google/genai";
import { UniverseNode, ContentType, GeneratedContent } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateUniverseNodes = async (userInterests: string[]): Promise<UniverseNode[]> => {
    if (!apiKey) {
        console.warn("No API Key provided. Returning mock data.");
        return getMockNodes();
    }

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Generate 6 futuristic social media content items for a user interested in ${userInterests.join(', ')}. 
        These should be "immersive nodes" in a 3D social universe. 
        Types can be: IMMERSIVE_STORY, MINI_GAME, SOCIAL_EVENT, MEMORY_CAPSULE.
        Return a JSON array.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            type: { type: Type.STRING, enum: ['IMMERSIVE_STORY', 'MINI_GAME', 'SOCIAL_EVENT', 'MEMORY_CAPSULE'] },
                            creator: { type: Type.STRING },
                            color: { type: Type.STRING, description: "Hex color code matching the mood" }
                        },
                        required: ['title', 'description', 'type', 'creator', 'color']
                    }
                }
            }
        });

        const data = JSON.parse(response.text || '[]');
        
        // Enhance with client-side only data (coordinates, images)
        return data.map((item: any, index: number) => ({
            ...item,
            id: `node-${Date.now()}-${index}`,
            coordinates: {
                x: (Math.random() * 80) - 40, 
                y: (Math.random() * 60) - 30,
                z: Math.random() * 20
            },
            imageUrl: `https://picsum.photos/400/300?random=${index + Math.random()}`
        }));

    } catch (error) {
        console.error("Gemini API Error:", error);
        return getMockNodes();
    }
};

export const coCreateContent = async (prompt: string, type: string): Promise<GeneratedContent> => {
    if (!apiKey) return { title: "Error", content: "No API Key", suggestedVisuals: "None" };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Co-create a short, futuristic social media experience based on: "${prompt}". 
            Format: JSON with title, story content, and a description of visual effects.
            Context: This is for ENTRA 2.0, a platform for shared immersive stories.`,
             config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        content: { type: Type.STRING },
                        suggestedVisuals: { type: Type.STRING }
                    }
                }
            }
        });

        return JSON.parse(response.text || '{}');
    } catch (error) {
        console.error("Co-creation error:", error);
        return {
            title: "Connection Lost",
            content: "Could not reach the AI core.",
            suggestedVisuals: "Static noise"
        };
    }
};

const getMockNodes = (): UniverseNode[] => [
    {
        id: '1',
        title: 'Neon City Racing',
        description: 'Join the hyper-loop race with friends in real-time AR.',
        type: ContentType.MINI_GAME,
        creator: 'CyberDrifter',
        color: '#06b6d4',
        coordinates: { x: -20, y: 10, z: 5 },
        imageUrl: 'https://picsum.photos/400/300?random=1'
    },
    {
        id: '2',
        title: 'Mars Colony 2045',
        description: 'An immersive memory capsule from the first settlers.',
        type: ContentType.IMMERSIVE_STORY,
        creator: 'SpaceX_Archive',
        color: '#ef4444',
        coordinates: { x: 20, y: -15, z: 0 },
        imageUrl: 'https://picsum.photos/400/300?random=2'
    },
    {
        id: '3',
        title: 'Zen Garden Collective',
        description: 'A shared meditation space that evolves with your stress levels.',
        type: ContentType.SOCIAL_EVENT,
        creator: 'MindfulnessAI',
        color: '#22c55e',
        coordinates: { x: 0, y: 0, z: 10 },
        imageUrl: 'https://picsum.photos/400/300?random=3'
    }
];
