export const ICONS = {
  pill: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="3" y="10.5" width="18" height="7" rx="3.5" transform="rotate(-40 12 14)"/><line x1="9.5" y1="10.7" x2="14.5" y2="15.7" transform="rotate(-40 12 14)" stroke="#F87171"/><circle cx="18.5" cy="6.5" r="2.6" fill="#F87171" stroke="none"/><path d="M18.5 5.3v2.4M17.3 6.5h2.4" stroke="#fff" stroke-width="1.1"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M4 5h16v11H9l-4 4v-4H4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12.5" x2="13" y2="12.5"/><circle cx="18.5" cy="4.5" r="2.4" fill="#34D399" stroke="none"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="9.5" cy="20" r="1.3" fill="#fff" stroke="none"/><circle cx="17" cy="20" r="1.3" fill="#fff" stroke="none"/><circle cx="18" cy="6" r="3" fill="#FBBF24" stroke="none"/><text x="18" y="7.6" font-size="3.6" text-anchor="middle" fill="#1F2937" font-family="Arial" font-weight="700">%</text></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><rect x="4" y="13" width="3.6" height="7" rx="1" fill="#22D3EE"/><rect x="10.2" y="7" width="3.6" height="13" rx="1" fill="#8B5CF6"/><rect x="16.4" y="10" width="3.6" height="10" rx="1" fill="#FBBF24"/><polyline points="4,11 10,5 16,8 21,3" fill="none" stroke="#fff" stroke-width="1.4"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="4" fill="#FBBF24"/><g stroke="#FBBF24" stroke-width="1.4" stroke-linecap="round"><line x1="8" y1="1.6" x2="8" y2="3.2"/><line x1="2.3" y1="8" x2="3.9" y2="8"/><line x1="3.4" y1="3.4" x2="4.5" y2="4.5"/></g><path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 8.5z" fill="#fff" stroke="#fff" stroke-width="0"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 7.2 6 3.6l2.3 1.5-2.5 3.6z" fill="#1F2937"/><path d="M8.3 6.8l2.5-3.6 2.3 1.5-2.5 3.6z" fill="#fff"/><path d="M13.1 6.8l2.5-3.6 2.3 1.5-2.5 3.6z" fill="#1F2937"/><rect x="3" y="8.2" width="18" height="12.3" rx="1.8" fill="#111827" stroke="#fff" stroke-width="1.2"/><path d="M10.3 11.8v5.2l4.6-2.6z" fill="#F43F5E"/><path d="M18.3 4.6l1 2 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" fill="#FBBF24"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><polyline points="9 6 3 12 9 18"/><polyline points="15 6 21 12 15 18"/><circle cx="12" cy="12" r="1.5" fill="#FB923C" stroke="none"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="3"/><polyline points="8 12.5 11 15.5 16 9" stroke="#34D399" stroke-width="2"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><rect x="5" y="3" width="14" height="18" rx="2"/><rect x="7.2" y="5.4" width="9.6" height="3.4" rx=".6" fill="#22D3EE" stroke="none"/><circle cx="8.2" cy="12" r=".95" fill="#fff" stroke="none"/><circle cx="12" cy="12" r=".95" fill="#fff" stroke="none"/><circle cx="15.8" cy="12" r=".95" fill="#FB923C" stroke="none"/><circle cx="8.2" cy="16" r=".95" fill="#fff" stroke="none"/><circle cx="12" cy="16" r=".95" fill="#fff" stroke="none"/><circle cx="15.8" cy="16" r=".95" fill="#FB923C" stroke="none"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.6A3 3 0 0 0 7 18h2z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.6A3 3 0 0 1 17 18h-2z"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="4" x2="15" y2="18"/><circle cx="6.4" cy="9" r="1" fill="#22D3EE" stroke="none"/><circle cx="17.6" cy="9" r="1" fill="#22D3EE" stroke="none"/><circle cx="12" cy="15" r="1" fill="#22D3EE" stroke="none"/></svg>',
};

export const projects = [
  { t: 'Emergency Medicine Finder', c: 'fullstack', feat: true, d: 'Find medicines, compare prices and reserve them at nearby pharmacies.', tags: ['React', 'Node', 'Express', 'MongoDB', 'Geolocation'], ico: 'pill', grad: '135deg,#0F5132,#22D3EE' },
  { t: 'Real-Time Chat App', c: 'fullstack', d: 'One-to-one chat with auth, presence and message history.', tags: ['MERN', 'Socket.IO', 'JWT'], ico: 'chat', grad: '135deg,#312E81,#8B5CF6' },
  { t: 'E-Commerce Store', c: 'fullstack', d: 'Product catalog, cart, wishlist and an admin dashboard.', tags: ['MERN', 'JWT'], ico: 'cart', grad: '135deg,#7C2D12,#F59E0B' },
  { t: 'Expense Tracker', c: 'fullstack', d: 'Track income and expenses with category charts.', tags: ['React', 'Node', 'MongoDB'], ico: 'chart', grad: '135deg,#064E3B,#10B981' },
  { t: 'Weather App', c: 'react', d: 'Live weather by city or current location.', tags: ['React', 'Weather API'], ico: 'cloud', grad: '135deg,#1E3A8A,#38BDF8' },
  { t: 'Movie Search', c: 'react', d: 'Search movies with posters, ratings and details.', tags: ['React', 'REST API'], ico: 'film', grad: '135deg,#4C1D95,#EC4899' },
  { t: 'GitHub Explorer', c: 'react', d: "Look up any GitHub user's profile and repos.", tags: ['React', 'GitHub API'], ico: 'code', grad: '135deg,#1F2937,#A78BFA' },
  { t: 'Todo Manager', c: 'frontend', d: 'Task manager with filters, search and local storage.', tags: ['React', 'Tailwind'], ico: 'check', grad: '135deg,#134E4A,#2DD4BF' },
  { t: 'Smart Calculator', c: 'frontend', d: 'Basic and scientific calculator with history.', tags: ['React', 'JS'], ico: 'calc', grad: '135deg,#7C2D12,#FBBF24' },
  { t: 'AI Resume Analyzer', c: 'ai', d: 'Scores resumes and suggests improvements against a role.', tags: ['React', 'AI API'], ico: 'brain', grad: '135deg,#1E1B4B,#6366F1' },
];

export const techA = [
  ['React', 0, '⚛', '#61DAFB'],
  ['Node.js', 72, '⬢', '#3C873A'],
  ['MongoDB', 144, '🍃', '#47A248'],
  ['CSS3', 216, '③', '#2965F1'],
  ['Git', 288, '⑂', '#F05033'],
];
export const techB = [
  ['JavaScript', 36, 'JS', '#F7DF1E'],
  ['Express.js', 108, 'Ex', '#B8B8B8'],
  ['Tailwind CSS', 180, '~', '#38BDF8'],
  ['HTML5', 252, '5', '#E34F26'],
  ['GitHub', 324, 'gh', '#A78BFA'],
];
