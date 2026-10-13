// Original vector mock screens. Run once with Node if you change their content.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../public/images/', import.meta.url));
mkdirSync(output, { recursive: true });
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 16, fill = '#334155', weight = 400) => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(value)}</text>`;
const rect = (x, y, w, h, fill = '#ffffff', r = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const line = (x1, y1, x2, y2, stroke = '#e2e8f0') => `<path d="M${x1} ${y1}H${x2}" stroke="${stroke}"/>`;

function screen(name, title, subtitle, nav, content, accent = '#ff6b2b') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" role="img" aria-labelledby="title desc">
  <title id="title">${escape(title)} — sample interface</title><desc id="desc">Original illustration with fictional data for a demo portfolio.</desc>
  ${rect(0, 0, 1000, 650, '#e9eef5', 0)}
  ${rect(40, 35, 920, 580, '#ffffff', 18)}${rect(40, 35, 920, 38, '#f8fafc', 18)}
  <circle cx="62" cy="54" r="5" fill="#fb7185"/><circle cx="79" cy="54" r="5" fill="#fbbf24"/><circle cx="96" cy="54" r="5" fill="#34d399"/>
  ${text(430, 59, 'DEMO / SAMPLE DATA', 11, '#64748b', 700)}
  ${rect(40, 73, 174, 542, '#162235', 0)}${text(63, 116, name.split('-')[0], 21, '#ffffff', 700)}
  ${nav.map((label, i) => `${i === 0 ? rect(54, 148 + i * 46, 146, 34, accent, 8) : ''}${text(68, 170 + i * 46, label, 13, i === 0 ? '#ffffff' : '#94a3b8', i === 0 ? 700 : 400)}`).join('')}
  ${text(64, 574, 'Illustrative interface', 11, '#94a3b8')}
  ${text(248, 122, title, 27, '#162235', 700)}${text(248, 148, subtitle, 13, '#64748b')}
  ${content}
  </svg>`;
  writeFileSync(`${output}/${name.toLowerCase()}.svg`, svg);
}

const card = (x, value, label, foot) => `${rect(x, 177, 211, 105, '#f1f5f9')}${text(x + 18, 201, label, 12, '#64748b')}${text(x + 18, 238, value, 30, '#162235', 700)}${text(x + 18, 263, foot, 11, '#64748b')}`;

screen('Commerce', 'Store overview', 'A clear view of a sample shop, all in one place.', ['Overview', 'Orders', 'Products', 'Customers', 'Reports'],
  card(248, '$12,480', 'Sample revenue', 'Fictional monthly total') + card(477, '128', 'Sample orders', 'This month') + card(706, '24', 'Sample products', 'In the catalog') +
  rect(248, 307, 440, 256, '#f8fafc') + text(268, 339, 'Revenue overview', 15, '#162235', 700) +
  [0, 1, 2].map((i) => line(268, 375 + i * 55, 665, 0)).join('') +
  [65, 100, 80, 130, 155, 125, 180].map((h, i) => rect(278 + i * 54, 530 - h, 27, h, i === 6 ? '#ff6b2b' : '#bfdbfe', 5)).join('') +
  rect(708, 307, 210, 256, '#f8fafc') + text(728, 339, 'Recent activity', 15, '#162235', 700) +
  ['Order #1048', 'Catalog updated', 'Order #1047', 'Stock reviewed'].map((v, i) => text(728, 382 + i * 45, v, 13)).join(''));

screen('Commerce-orders', 'Order workspace', 'Fictional orders for a sample product workflow.', ['Orders', 'Overview', 'Products', 'Customers', 'Reports'],
  rect(248, 179, 670, 47, '#f1f5f9') + text(267, 209, 'Order', 12, '#64748b', 700) + text(393, 209, 'Customer', 12, '#64748b', 700) + text(625, 209, 'Total', 12, '#64748b', 700) + text(751, 209, 'Status', 12, '#64748b', 700) +
  ['Sample customer A', 'Sample customer B', 'Sample customer C', 'Sample customer D', 'Sample customer E'].map((v, i) => {
    const y = 260 + i * 59;
    return text(267, y, `#10${48 - i}`, 14, '#162235', 700) + text(393, y, v, 14) + text(625, y, `$${[240, 86, 128, 315, 64][i]}`, 14) + rect(743, y - 19, 133, 28, i === 2 ? '#fff7ed' : '#dcfce7', 14) + text(756, y, i === 2 ? 'Processing' : 'Completed', 12, i === 2 ? '#9a3412' : '#166534') + line(265, y + 23, 898, 0);
  }).join(''));

screen('Workspace', 'Team workspace', 'A sample board for planning and following through.', ['Board', 'My tasks', 'Projects', 'Team', 'Archive'],
  ['To do', 'In progress', 'Done'].map((label, col) => {
    const x = 248 + col * 229;
    const tasks = [['Write project brief', 'Review data model', 'Plan release'], ['Build dashboard', 'Connect sample API'], ['Set up repository', 'Design task cards']][col];
    return rect(x, 177, 212, 386, '#f1f5f9') + text(x + 16, 208, label, 16, '#162235', 700) + tasks.map((task, i) => {
      const y = 230 + i * 101;
      return rect(x + 10, y, 192, 86) + rect(x + 22, y + 12, 57, 17, col === 1 ? '#dbeafe' : '#ffedd5', 5) + text(x + 27, y + 24, col === 1 ? 'Active' : 'Sample', 10, '#475569') + text(x + 22, y + 48, task, 13, '#162235', 700) + text(x + 22, y + 70, `Member ${String.fromCharCode(65 + i)}`, 11, '#64748b');
    }).join('');
  }).join(''), '#4f46e5');

screen('Monitor', 'Service health', 'Illustrative service metrics, no live monitoring.', ['Overview', 'Endpoints', 'Events', 'Settings'],
  card(248, '99.9%', 'Sample availability', 'Fictional 30-day window') + card(477, '142 ms', 'Sample latency', 'Average response') + card(706, '3 / 3', 'Sample endpoints', 'Operational') +
  rect(248, 307, 670, 256, '#f8fafc') + text(270, 341, 'Endpoint status', 16, '#162235', 700) +
  ['/api/catalog', '/api/orders', '/api/health'].map((endpoint, i) => {
    const y = 389 + i * 60;
    return `<circle cx="278" cy="${y - 5}" r="5" fill="#10b981"/>` + text(298, y, endpoint, 14, '#162235', 700) + text(582, y, ['148 ms', '173 ms', '104 ms'][i], 13, '#64748b') + rect(739, y - 21, 149, 30, '#dcfce7', 15) + text(756, y, 'Operational', 12, '#166534') + line(270, y + 22, 894, 0);
  }).join(''), '#0891b2');

console.log('Created 4 original demo screen illustrations.');
