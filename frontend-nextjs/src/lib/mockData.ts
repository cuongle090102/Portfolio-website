// Mock data for GitHub Pages deployment
export const mockProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and React, featuring responsive design and dynamic content management.",
    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Project Overview"
      },
      {
        id: "2",
        type: "text",
        content: "This portfolio website showcases my skills in modern web development. Built with Next.js 13+ and TypeScript, it features a responsive design that works seamlessly across all devices."
      },
      {
        id: "3",
        type: "subheading",
        content: "Key Features"
      },
      {
        id: "4",
        type: "text",
        content: "• Responsive design with Tailwind CSS\n• Dynamic content management system\n• Modern UI components\n• Fast loading with Next.js optimization\n• SEO-friendly structure"
      }
    ],
    technologies: "Next.js,React,TypeScript,Tailwind CSS",
    demo_url: "https://your-portfolio-demo.com",
    github_url: "https://github.com/cuongle090102/Portfolio-website",
    image_url: "https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Portfolio+Website",
    status: "published",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
    blocks: [
      {
        id: "1",
        type: "heading",
        content: "E-commerce Solution"
      },
      {
        id: "2",
        type: "text",
        content: "A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product catalog, shopping cart, and secure payment processing."
      },
      {
        id: "3",
        type: "subheading",
        content: "Technical Implementation"
      },
      {
        id: "4",
        type: "text",
        content: "The platform uses React for the frontend with Redux for state management, Node.js and Express for the backend API, and MongoDB for data storage. Payment processing is handled through Stripe integration."
      }
    ],
    technologies: "React,Node.js,Express,MongoDB,Stripe",
    demo_url: "https://your-ecommerce-demo.com",
    github_url: "https://github.com/cuongle090102/ecommerce-platform",
    image_url: "https://via.placeholder.com/600x400/10B981/FFFFFF?text=E-commerce+Platform",
    status: "published",
    created_at: "2024-02-20T14:30:00Z"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Task Management System"
      },
      {
        id: "2",
        type: "text",
        content: "A collaborative task management application designed for teams. Features real-time updates, drag-and-drop functionality, and comprehensive project tracking."
      },
      {
        id: "3",
        type: "subheading",
        content: "Core Features"
      },
      {
        id: "4",
        type: "text",
        content: "• Real-time collaboration\n• Drag-and-drop task management\n• Team member assignments\n• Project progress tracking\n• File attachments and comments\n• Email notifications"
      }
    ],
    technologies: "React,Socket.io,Node.js,PostgreSQL",
    demo_url: "https://your-taskmanager-demo.com",
    github_url: "https://github.com/cuongle090102/task-manager",
    image_url: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Task+Manager",
    status: "published",
    created_at: "2024-03-10T09:15:00Z"
  }
];

export const mockUser = {
  id: 1,
  username: "admin",
  email: "admin@example.com"
};