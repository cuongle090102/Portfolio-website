// Real data from database
export const mockProjects = [
  {
    id: 20,
    title: "PORTFOLIO-WEB: CUONG LE",
    description: "Building my personal portfolio website — a journey through modern full-stack development, from concept to deployment",
    blocks: [
      {
        content: "When I set out to build my portfolio website, I wanted it to be more than just a static showcase. I wanted to create something that truly represented my development skills while solving real problems I face as a developer — easy content management, responsive design, and automated deployment. This is the story of how this portfolio came to life.",
        id: "1",
        type: "text"
      },
      {
        content: "Why I built this portfolio",
        id: "1758800001",
        type: "subheading"
      },
      {
        content: "I was tired of updating static HTML files every time I completed a new project. I needed something dynamic, something that would let me add projects, write detailed case studies, and share my personal interests (like my favorite films and athletes) without diving into code each time.\n\nMy goals were simple:\n- Create a professional showcase that reflects my personality\n- Build a content management system I actually want to use\n- Demonstrate my full-stack development skills\n- Deploy something that just works, automatically",
        id: "1758800002",
        type: "text"
      },
      {
        content: "The tech stack decision",
        id: "1758800003",
        type: "subheading"
      },
      {
        content: "For the frontend, I chose Next.js 15 with TypeScript because I wanted the benefits of server-side rendering and static generation, plus the developer experience of TypeScript's type safety. Tailwind CSS was a no-brainer for rapid, responsive design.\n\nFor the backend, I went with Flask and Python — familiar territory that lets me build robust APIs quickly. SQLAlchemy for the ORM because I wanted proper database relationships, and Cloudinary for media management because handling file uploads properly is surprisingly complex.\n\nThe goal was a modern stack that I know well enough to build quickly, but sophisticated enough to showcase real-world development practices.",
        id: "1758800004",
        type: "text"
      },
      {
        content: "Building the content management system",
        id: "1758800005",
        type: "subheading"
      },
      {
        content: "The heart of this project is the flexible content system. Instead of hardcoding project descriptions, I built a block-based editor where each project can have multiple content types — text paragraphs, subheadings, images, videos, and galleries.\n\nHere's how it works: when I add a project through the admin panel, I can create different 'blocks' of content. Want to add a video demo? Create a video block. Need to show multiple screenshots? Add a gallery block. This gives me the flexibility to tell each project's story properly.\n\nThe database design is straightforward — projects have a JSON field containing an array of content blocks, each with a type and content. Simple, but powerful.",
        id: "1758800006",
        type: "text"
      },
      {
        content: "The favorites feature — adding personality",
        id: "1758800007",
        type: "subheading"
      },
      {
        content: "Beyond just showcasing technical work, I wanted visitors to get to know me as a person. So I built a 'favorites' system where I can share my favorite films and athletes, organized in tiers (S-Tier masterpieces, A-Tier excellent, etc.).\n\nThis feature taught me a lot about flexible data modeling. How do you design a system that can handle both movies (with titles, years, posters) and athletes (with names, sports, achievements) in the same interface? The solution was a polymorphic design where each favorite has common fields plus type-specific metadata.",
        id: "1758800008",
        type: "text"
      },
      {
        content: "Deployment automation — the magic behind the scenes",
        id: "1758800009",
        type: "subheading"
      },
      {
        content: "One of my favorite parts of this project is the deployment pipeline. Every time I push code to GitHub, a GitHub Actions workflow automatically:\n- Installs dependencies\n- Builds the Next.js static site\n- Optimizes assets and images\n- Deploys to GitHub Pages\n- Invalidates caches\n\nNo manual deployment steps, no FTP uploads, no server management. Just git push and watch the magic happen. This workflow has saved me countless hours and eliminates deployment anxiety.\n\nThe best part? When I update project content through the admin panel, I can regenerate the static mockData.js file and push it, triggering a fresh deployment with the latest content.",
        id: "1758800010",
        type: "text"
      },
      {
        content: "Challenges and solutions",
        id: "1758800011",
        type: "subheading"
      },
      {
        content: "Building this wasn't without challenges:\n\n**Static vs Dynamic Content**: Since I'm deploying to GitHub Pages (static hosting), I needed a way to make database-driven content work with static generation. My solution was a hybrid approach — use the database for development and content management, then export data to static files for production.\n\n**Media Management**: Handling image uploads, video embeds, and galleries required integrating Cloudinary's API for optimization and delivery. The tricky part was building an intuitive interface for managing different media types.\n\n**Responsive Design**: Making complex layouts work across all device sizes, especially the project galleries and favorites sections, required careful CSS and component design.\n\n**Cache Management**: Getting deployment caches to invalidate properly when removing features like the demo banner taught me a lot about build optimization and cache busting.",
        id: "1758800012",
        type: "text"
      },
      {
        content: "What I learned",
        id: "1758800013",
        type: "subheading"
      },
      {
        content: "This project reinforced several important lessons:\n\n- **Start with the data model**: Getting the database schema right early saves massive refactoring later\n- **Automate everything**: Time spent setting up CI/CD pays dividends immediately\n- **Design for flexibility**: The block-based content system has made updating projects a joy instead of a chore\n- **Performance matters**: Static generation + CDN delivery makes this site blazingly fast\n- **Documentation through code**: This portfolio itself documents my development approach and technical decisions\n\nMost importantly, I learned that building tools for yourself — tools you'll actually use — is incredibly motivating. This portfolio isn't just a showcase; it's a content management system I genuinely enjoy using.",
        id: "1758800014",
        type: "text"
      }
    ],
    technologies: "Next.js,Python,Typescript,Cloudinary,Flask",
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png",
    status: "completed",
    created_at: "2025-08-21T07:08:12.477172",
    media: [
      {
        caption: "Thumbnail",
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png"
      }
    ]
  },
  {
    id: 18,
    title: "THESIS: SPODEL",
    description: "Developing a descriptive analytic system for sales promotion data in B2C",
    blocks: [
      {
        content: "We built a web-based system (codename Spodel) that ingests scanner promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries",
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
        content: "Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\n- Which promotion types work best for which categories?\n- How do price, featuring, and display affect brand share?\n- How many units do consumers buy when they respond to a promo?\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app.",
        id: "1755755174282",
        type: "text"
      },
      {
        content: "You can read more about three models Category Incidence, Brand Choice, Purchase Quantity to see how these answer above questions. I will give a link here: https://www.amazon.com/Handbook-Marketing-International-Operations-Management/dp/0387782125. ",
        id: "1758705254524",
        type: "text"
      },
      {
        content: "Data",
        id: "1758704952207",
        type: "subheading"
      },
      {
        content: "We use two datasets from Dumnhumby company: The Complete Journey and  Carbo-loading.",
        id: "1758704959371",
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
        content: "Architecture",
        id: "1758704320298",
        type: "subheading"
      },
      {
        content: "We used a modern stack to build:\n- Frontend: Angular + Plotly for visualization\n- Backend: Flask for APIs and model execution\n- Database: Supabase (PostgreSQL + MinIO object storage) \n- Deployment: Vercel (frontend), Heroku (Flask backend service)\nThis architecture ensured modularity, easy deployment, and the ability to handle real datasets while keeping the user interface accessible for non-technical users.",
        id: "1758704747472",
        type: "text"
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
      },
      {
        content: "My contribution",
        id: "1758704406095",
        type: "subheading"
      },
      {
        content: "As one of the two main developers, I focused primarily on:\n- Backend development: Designing Flask APIs, implementing data pipelines, and integrating statistical models\n- Data modeling: Adapting Dunnhumby-like datasets to fit the Category Incidence, Brand Choice, and Purchase Quantity frameworks\n- Visualization layer: Building interactive charts using Python to make model outputs understandable, contributing to Plotly.js building by my partner.\n- System integration: Coordinating the connection between Supabase and Flask to ensure smooth workflows\nThis allowed me to apply both my technical skills and domain knowledge in marketing analytics to create a usable, research-driven product",
        id: "1758704443656",
        type: "text"
      }
    ],
    technologies: "Python,TypeScript,Javascript,Supabase,Flask,Angular,Plotly,Statistic Models",
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png",
    status: "completed",
    created_at: "2025-08-21T05:37:22.874087",
    media: [
      {
        caption: "",
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png"
      }
    ]
  }
];

export const mockUser = {
  id: 1,
  username: "admin",
  email: "admin@example.com"
};

// Real favorites data from database
export const mockFavorites = {
  "films": {
    "A-Tier (Excellent)": [
      {
        "id": 5,
        "title": "Parasite",
        "year": 2019,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
      },
      {
        "id": 6,
        "title": "Memento",
        "year": 2000,
        "genre": "Thriller/Mystery",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
      }
    ],
    "S-Tier (Masterpieces)": [
      {
        "id": 1,
        "title": "Oldboy",
        "year": 2003,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
      },
      {
        "id": 2,
        "title": "Oldboy",
        "year": 2003,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
      },
      {
        "id": 3,
        "title": "Eternal Sunshine of the Spotless Mind",
        "year": 2004,
        "genre": "Romance/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg"
      },
      {
        "id": 4,
        "title": "Inception",
        "year": 2010,
        "genre": "Sci-Fi/Thriller",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
      }
    ]
  },
  "athletes": {
    "S-Tier (Legends)": [
      {
        "id": 7,
        "year": null,
        "name": "Cristiano Ronaldo",
        "sport": "Football",
        "achievement": "5x Ballon d'Or, Champions League all-time top scorer",
        "photo": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "poster": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
      },
      {
        "id": 8,
        "year": null,
        "name": "Michael Jordan",
        "sport": "Basketball",
        "achievement": "6x NBA Champion, 5x MVP, Cultural Icon",
        "photo": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "poster": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
      }
    ]
  }
};