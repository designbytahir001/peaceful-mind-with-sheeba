export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured_image: string;
  reading_time: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  likes_count: number;
}

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Understanding Emotional Wellbeing",
    slug: "understanding-emotional-wellbeing",
    excerpt: "Emotional wellbeing is more than just the absence of mental illness. It is the ability to understand, manage, and express our emotions in a healthy, adaptive way.",
    content: `<h2>What is Emotional Wellbeing?</h2>
<p>Emotional wellbeing refers to our ability to handle life's stressors, adapt to change, and navigate difficult emotions. It is not about feeling happy all the time; rather, it is about having the resilience to experience a full range of human emotions and return to a state of balance.</p>

<blockquote>"A peaceful mind begins with a safe space to be heard, understood, and accepted." - Sheeba Mohi-ud-Din</blockquote>

<h3>Key Aspects of Emotional Wellbeing:</h3>
<ul>
  <li><strong>Self-Awareness:</strong> Recognizing and labeling your emotions without judgment.</li>
  <li><strong>Emotional Regulation:</strong> Developing healthy coping mechanisms to manage intense feelings.</li>
  <li><strong>Healthy Boundaries:</strong> Protecting your energy and defining where you end and others begin.</li>
  <li><strong>Compassionate Self-Talk:</strong> Practicing kindness towards yourself during challenging times.</li>
</ul>

<p>By fostering emotional wellbeing, we cultivate healthier relationships with ourselves and those around us. Remember, seeking professional guidance is a courageous step towards building a deeper understanding of your psychological landscape.</p>`,
    category: "Emotional Wellbeing",
    tags: ["Emotional Wellbeing", "Mental Health", "Self-Awareness"],
    featured_image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200",
    reading_time: "4 min read",
    status: "published",
    created_at: "2026-09-01T10:00:00Z",
    updated_at: "2026-09-01T10:00:00Z",
    published_at: "2026-09-01T10:00:00Z",
    likes_count: 14
  },
  {
    id: "art-2",
    title: "Why Setting Healthy Boundaries Matters",
    slug: "why-setting-healthy-boundaries-matters",
    excerpt: "Boundaries are not walls to keep others out; they are the guidelines that define how we wish to be treated and what we are comfortable with in relationships.",
    content: `<h2>The Power of "No"</h2>
<p>Many of us struggle with setting boundaries because we fear conflict, rejection, or disappointing others. However, a lack of clear boundaries often leads to resentment, burnout, and emotional fatigue.</p>

<h3>What are Boundaries?</h3>
<p>Boundaries are clear lines we draw to protect our mental, emotional, and physical space. They communicate our values, limits, and needs to the world.</p>

<h3>Tips for Communicating Boundaries Effectively:</h3>
<ol>
  <li><strong>Be Clear and Direct:</strong> State your boundary simply without over-explaining or apologizing excessively.</li>
  <li><strong>Use "I" Statements:</strong> Focus on your feelings and needs (e.g., "I feel overwhelmed when we discuss this late at night. Let's talk tomorrow instead.").</li>
  <li><strong>Start Small:</strong> Practice setting minor boundaries with safe people before tackling more challenging situations.</li>
  <li><strong>Honor Your Word:</strong> Consistency is key. If you set a boundary, follow through to show others that you take your needs seriously.</li>
</ol>

<p>Fostering healthy boundaries is an essential component of personal growth and emotional wellbeing. It enables us to engage in healthier, more respectful relationships where mutual trust can flourish.</p>`,
    category: "Relationship Concerns",
    tags: ["Boundaries", "Relationships", "Personal Growth"],
    featured_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200",
    reading_time: "5 min read",
    status: "published",
    created_at: "2026-09-10T11:30:00Z",
    updated_at: "2026-09-10T11:30:00Z",
    published_at: "2026-09-10T11:30:00Z",
    likes_count: 22
  },
  {
    id: "art-3",
    title: "Managing Everyday Stress",
    slug: "managing-everyday-stress",
    excerpt: "While some stress is a natural part of life, chronic everyday stress can take a heavy toll on our physical and emotional health. Learn simple, practical strategies to cope.",
    content: `<h2>Understanding Stress</h2>
<p>Stress is the body's natural response to perceived demands or threats. When stress becomes chronic, it can lead to physical fatigue, anxiety, irritability, and difficulty concentrating.</p>

<h3>Practical Strategies for Stress Reduction:</h3>
<ul>
  <li><strong>Mindful Breathing:</strong> Dedicate 5 minutes daily to slow, deep diaphragmatic breaths to activate your parasympathetic nervous system.</li>
  <li><strong>Structured Breaks:</strong> Implement short breaks during your workday to step away from screens and stretch.</li>
  <li><strong>Physical Activity:</strong> Moving your body helps release built-up physical tension and boosts mood-elevating endorphins.</li>
  <li><strong>Prioritizing Sleep:</strong> Ensure consistent sleep routines to give your mind and body ample time to restore.</li>
</ul>

<p>Managing stress is a journey of small, consistent choices. Giving yourself a non-judgmental space to rest and slow down is vital for your long-term psychological wellbeing.</p>`,
    category: "Stress & Anxiety",
    tags: ["Stress Management", "Mindfulness", "Self-Care"],
    featured_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    reading_time: "3 min read",
    status: "published",
    created_at: "2026-09-15T09:15:00Z",
    updated_at: "2026-09-15T09:15:00Z",
    published_at: "2026-09-15T09:15:00Z",
    likes_count: 31
  },
  {
    id: "art-4",
    title: "Building Self-Esteem",
    slug: "building-self-esteem",
    excerpt: "Healthy self-esteem is the foundation of emotional health. Learn how self-compassion and reframing negative self-talk can shift how you perceive yourself.",
    content: `<h2>Connecting with Your Worth</h2>
<p>Self-esteem is not about being perfect or better than others; it is about recognizing your intrinsic worth as a human being. It shapes how we interact with others, face challenges, and perceive our achievements.</p>

<h3>Steps to Nurture Healthy Self-Esteem:</h3>
<ul>
  <li><strong>Identify Negative Self-Talk:</strong> Gently notice when you are criticizing yourself and ask if you would say those words to a beloved friend.</li>
  <li><strong>Practice Self-Compassion:</strong> Accept that mistakes and imperfections are part of the shared human experience.</li>
  <li><strong>Focus on Strengths:</strong> Keep a regular record of your positive qualities, efforts, and values.</li>
  <li><strong>Seek Support:</strong> Safe therapeutic spaces can be invaluable in dismantling deeply rooted self-doubts and building healthy self-confidence.</li>
</ul>`,
    category: "Self-Esteem",
    tags: ["Self-Esteem", "Personal Growth", "Self-Compassion"],
    featured_image: "https://images.unsplash.com/photo-1494178244004-00d582af40b4?auto=format&fit=crop&q=80&w=1200",
    reading_time: "4 min read",
    status: "published",
    created_at: "2026-09-20T14:00:00Z",
    updated_at: "2026-09-20T14:00:00Z",
    published_at: "2026-09-20T14:00:00Z",
    likes_count: 18
  },
  {
    id: "art-5",
    title: "Supporting Emotional Wellbeing in Adolescence",
    slug: "supporting-emotional-wellbeing-in-adolescence",
    excerpt: "Adolescence is a time of immense transition, identity-seeking, and emotional intensity. Discover key insights for guiding youth with empathy and understanding.",
    content: `<h2>Understanding the Adolescent Mind</h2>
<p>During adolescence, rapid brain development coincides with social transitions, academic pressures, and the search for individual identity. It is completely natural for adolescents to experience heightened emotional sensitivity during this stage.</p>

<h3>How to Support Teens:</h3>
<ul>
  <li><strong>Listen Without Fixing:</strong> Sometimes, adolescents simply need to feel heard and accepted without immediate advice or judgment.</li>
  <li><strong>Validate Their Feelings:</strong> Acknowledge their frustrations, fears, or anxieties as real and significant.</li>
  <li><strong>Encourage Open Expression:</strong> Create an atmosphere where talking about feelings is regularized and free from shame.</li>
  <li><strong>Involve Them in Solutions:</strong> Collaborative problem-solving builds their confidence and decision-making skills.</li>
</ul>`,
    category: "Children & Adolescents",
    tags: ["Adolescents", "Parenting", "Emotional Support"],
    featured_image: "https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?auto=format&fit=crop&q=80&w=1200",
    reading_time: "5 min read",
    status: "published",
    created_at: "2026-09-25T15:20:00Z",
    updated_at: "2026-09-25T15:20:00Z",
    published_at: "2026-09-25T15:20:00Z",
    likes_count: 26
  }
];

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  comment: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "comm-1",
    post_id: "art-1",
    name: "Arifa Jan",
    comment: "This article really resonates with me. Understanding that emotional wellbeing isn't just about constant happiness has been a breakthrough for my perspective.",
    created_at: "2026-09-02T12:00:00Z",
    status: "approved"
  },
  {
    id: "comm-2",
    post_id: "art-1",
    name: "Sajad Ahmad",
    comment: "Excellent advice on compassionate self-talk. It is so easy to fall into self-criticism.",
    created_at: "2026-09-03T14:30:00Z",
    status: "approved"
  },
  {
    id: "comm-3",
    post_id: "art-2",
    name: "Mehak",
    comment: "Would love to see more practical exercises for setting boundaries in the workplace.",
    created_at: "2026-09-11T08:15:00Z",
    status: "pending"
  }
];
