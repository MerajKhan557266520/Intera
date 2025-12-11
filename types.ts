export enum ContentType {
    IMMERSIVE_STORY = 'IMMERSIVE_STORY',
    MINI_GAME = 'MINI_GAME',
    SOCIAL_EVENT = 'SOCIAL_EVENT',
    MEMORY_CAPSULE = 'MEMORY_CAPSULE'
}

export interface UniverseNode {
    id: string;
    title: string;
    description: string;
    type: ContentType;
    creator: string;
    color: string;
    coordinates: { x: number; y: number; z: number }; // Simulated 3D coordinates
    imageUrl: string;
}

export interface UserStats {
    reputation: number;
    creativity: number;
    collaboration: number;
    empathy: number;
    streak: number;
}

export interface GeneratedContent {
    title: string;
    content: string;
    suggestedVisuals: string;
}
