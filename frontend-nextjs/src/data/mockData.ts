// Mock data extracted from database for development and testing
// Generated from backend database on 2025-08-21

export interface ProjectBlock {
  id: string;
  type: 'text' | 'subheading' | 'image' | 'video' | 'gallery';
  content: string;
  images?: string[];
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  blocks: ProjectBlock[];
  technologies: string[];
  demo_url: string;
  github_url: string;
  image_url: string;
  status: string;
  featured: boolean;
  media: ProjectMedia[];
  tags: string[];
  links: Record<string, string>;
  views: number;
  order: number;
  created_at: string | null;
  updated_at: string | null;
}

export const mockProjects: Project[] = [
  {
    id: 20,
    title: "PORTFOLIO-WEB: CUONG LE",
    slug: "portfolio-web-cuong-le",
    description: "",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: ""
      }
    ],
    technologies: [
      "Next.js",
      "Python",
      "Typescript",
      "Cloudinary",
      "Flask"
    ],
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png",
    status: "completed",
    featured: false,
    media: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png",
        caption: "Thumbnail"
      }
    ],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T07:08:12.477172",
    updated_at: "2025-08-21T07:08:12.477181"
  },
  {
    id: 19,
    title: "adsa",
    slug: "adsa",
    description: "ads",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: ""
      }
    ],
    technologies: [],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "draft",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:37:32.420101",
    updated_at: "2025-08-21T05:37:32.420152"
  },
  {
    id: 18,
    title: "THESIS: SPODEL",
    slug: "asdvadsfasd",
    description: "Developing a descriptive analytic system for sales promotion data in B2C",
    content: "[{\"content\": \"We built a web-based system (codename Spodel) that ingests scanner / promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries\", \"id\": \"1\", \"type\": \"text\"}, {\"content\": \"https://res.cloudinary.com/dt65gnluq/video/upload/v1753255409/spodel-demo_1_rgh5xv.mp4\", \"id\": \"1755760453180\", \"type\": \"video\"}, {\"content\": \"Motivation — the problem we solved\", \"id\": \"1755754823932\", \"type\": \"subheading\"}, {\"content\": \"Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\\n\\n- Which promotion types work best for which categories?\\n\\n- How do price, featuring, and display affect brand share?\\n\\n- How many units do consumers buy when they respond to a promo?\\n\\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app.\", \"id\": \"1755755174282\", \"type\": \"text\"}, {\"content\": \"  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png\\n  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png\", \"id\": \"1755759111481\", \"images\": [\"  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png\", \"  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png\"], \"type\": \"gallery\"}, {\"content\": \"https://res.cloudinary.com/dt65gnluq/image/upload/v1755755790/spodel-architecture_3_vn9edb.png\", \"id\": \"1755755294336\", \"type\": \"image\"}, {\"content\": \"https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/system-workflow_cl6m66.png\", \"id\": \"1755755875752\", \"type\": \"image\"}]",
    blocks: [
      {
        content: "We built a web-based system (codename Spodel) that ingests scanner / promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries",
        id: "1",
        type: "text"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/video/upload/v1753255409/spodel-demo_1_rgh5xv.mp4",
        id: "1755760453180",
        type: "video"
      },
      {
        content: "Motivation — the problem we solved",
        id: "1755754823932",
        type: "subheading"
      },
      {
        content: "Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\n\n- Which promotion types work best for which categories?\n\n- How do price, featuring, and display affect brand share?\n\n- How many units do consumers buy when they respond to a promo?\n\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app.",
        id: "1755755174282",
        type: "text"
      },
      {
        content: "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png\n  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png",
        id: "1755759111481",
        images: [
          "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png",
          "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png"
        ],
        type: "gallery"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755755790/spodel-architecture_3_vn9edb.png",
        id: "1755755294336",
        type: "image"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/system-workflow_cl6m66.png",
        id: "1755755875752",
        type: "image"
      }
    ],
    technologies: [
      "Python",
      "TypeScript",
      "Javascript",
      "Supabase",
      "Flask",
      "Angular",
      "Plotly",
      "Statistic Models"
    ],
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png",
    status: "completed",
    featured: false,
    media: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png",
        caption: "Thumbnail"
      }
    ],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:37:22.874087",
    updated_at: "2025-08-21T07:15:50.720619"
  },
  {
    id: 17,
    title: "asdfdasf",
    slug: "asdfdasf",
    description: "asdfasdf",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"asdfasd\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: "asdfasd"
      }
    ],
    technologies: [],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "draft",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:35:33.639637",
    updated_at: "2025-08-21T05:35:33.639644"
  },
  {
    id: 16,
    title: "vjhvjhv",
    slug: "vjhvjhv",
    description: "gcucc",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"vjk\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: "vjk"
      }
    ],
    technologies: [],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "draft",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:34:44.208449",
    updated_at: "2025-08-21T05:34:44.208460"
  },
  {
    id: 15,
    title: "dsfsdfgsfdg",
    slug: "dsfsdfgsfdg",
    description: "sdfgsdfg",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: ""
      }
    ],
    technologies: [],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "draft",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:30:00.732569",
    updated_at: "2025-08-21T05:30:00.732573"
  },
  {
    id: 14,
    title: "Test Project",
    slug: "test-project",
    description: "A test project for debugging",
    content: "",
    blocks: [
      {
        id: "1",
        type: "text",
        content: ""
      }
    ],
    technologies: [
      "React",
      "Node.js"
    ],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "published",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:29:17.374067",
    updated_at: "2025-08-21T05:29:17.374071"
  },
  {
    id: 13,
    title: "THESIS: SPODEL",
    slug: "thesis-spodel",
    description: "Developing a descriptive system for data analysis on sale promotion data in B2C",
    content: "[{\"id\": \"1\", \"type\": \"text\", \"content\": \"We built a web-based system (codename Spodel) that ingests scanner / promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries.\"}, {\"id\": \"1755753790910\", \"type\": \"subheading\", \"content\": \"Motivation — the problem we solved\"}, {\"id\": \"1755753802854\", \"type\": \"text\", \"content\": \"Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\\n\\n- Which promotion types work best for which categories?\\n\\n- How do price, featuring, and display affect brand share?\\n\\n- How many units do consumers buy when they respond to a promo?\\n\\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app.\"}]",
    blocks: [
      {
        id: "1",
        type: "text",
        content: "We built a web-based system (codename Spodel) that ingests scanner / promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries."
      },
      {
        id: "1755753790910",
        type: "subheading",
        content: "Motivation — the problem we solved"
      },
      {
        id: "1755753802854",
        type: "text",
        content: "Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\n\n- Which promotion types work best for which categories?\n\n- How do price, featuring, and display affect brand share?\n\n- How many units do consumers buy when they respond to a promo?\n\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app."
      }
    ],
    technologies: [
      "Python",
      "Javascript",
      "Supabase",
      "Flask",
      "Angular"
    ],
    demo_url: "",
    github_url: "",
    image_url: "",
    status: "draft",
    featured: false,
    media: [],
    tags: [],
    links: {},
    views: 0,
    order: 0,
    created_at: "2025-08-21T05:24:56.702749",
    updated_at: "2025-08-21T05:24:56.702755"
  }
];

// Helper functions for working with mock data
export const getPublishedProjects = () => 
  mockProjects.filter(project => project.status === 'completed' || project.status === 'published');

export const getFeaturedProjects = () => 
  mockProjects.filter(project => project.featured);

export const getProjectBySlug = (slug: string) => 
  mockProjects.find(project => project.slug === slug);

export const getProjectsByTechnology = (technology: string) => 
  mockProjects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );

export const getRecentProjects = (limit: number = 5) => 
  mockProjects
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);