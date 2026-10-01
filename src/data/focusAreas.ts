import { 
  Smile, 
  Heart, 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Link as LinkIcon, 
  Sprout 
} from 'lucide-react';

export interface FocusArea {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: "focus-1",
    title: "Children & Adolescents",
    iconName: "Smile",
    description: "Guidance and therapeutic space tailored for adolescents navigating transitions, social dynamics, and developmental stages with empathy."
  },
  {
    id: "focus-2",
    title: "Emotional Wellbeing",
    iconName: "Heart",
    description: "Helping individuals build emotional self-awareness, practice self-compassion, and experience a full range of emotions with balance."
  },
  {
    id: "focus-3",
    title: "Stress & Anxiety Management",
    iconName: "Brain",
    description: "Equipping you with realistic, practical coping mechanisms and mindful strategies to understand and manage everyday anxiety and stress."
  },
  {
    id: "focus-4",
    title: "Relationship & Marital Concerns",
    iconName: "HeartHandshake",
    description: "Creating a safe, non-judgmental environment to address communication gaps, navigate relational boundaries, and build trust."
  },
  {
    id: "focus-5",
    title: "Women’s Emotional Wellbeing",
    iconName: "Sparkles",
    description: "Addressing unique lifecycle transitions, identity pivots, and pressures impacting women's mental health in a supportive space."
  },
  {
    id: "focus-6",
    title: "Self-Esteem",
    iconName: "ShieldCheck",
    description: "Deconstructing negative self-talk and building healthy self-confidence, helping you recognize your intrinsic human worth."
  },
  {
    id: "focus-7",
    title: "Attachment-Related Concerns",
    iconName: "LinkIcon",
    description: "Exploring attachment styles to better understand patterns in emotional connections, vulnerability, and relational security."
  },
  {
    id: "focus-8",
    title: "Personal Growth",
    iconName: "Sprout",
    description: "Supporting you on the journey of self-reflection, personal exploration, and the pursuit of a fulfilling, purpose-driven life."
  }
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smile': return Smile;
    case 'Heart': return Heart;
    case 'Brain': return Brain;
    case 'HeartHandshake': return HeartHandshake;
    case 'Sparkles': return Sparkles;
    case 'ShieldCheck': return ShieldCheck;
    case 'LinkIcon': return LinkIcon;
    case 'Sprout': return Sprout;
    default: return Sprout;
  }
};
