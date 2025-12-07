// Theme toggle: reads/writes localStorage 'theme' (light | dark). Default = light
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const rootEl = document.documentElement; // apply class at root

function applyTheme(theme) {
	if (theme === 'dark') {
		rootEl.classList.add('dark-theme');
		if (themeIcon) themeIcon.className = 'ri-moon-line';
		themeToggleBtn?.setAttribute('aria-label', 'Switch to light mode');
	} else {
		rootEl.classList.remove('dark-theme');
		if (themeIcon) themeIcon.className = 'ri-sun-line';
		themeToggleBtn?.setAttribute('aria-label', 'Switch to dark mode');
	}
}

function initTheme() {
	const saved = localStorage.getItem('theme');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = saved || (prefersDark ? 'dark' : 'light');
	applyTheme(theme);
}

function toggleTheme() {
	const isDark = rootEl.classList.contains('dark-theme');
	const next = isDark ? 'light' : 'dark';
	applyTheme(next);
	try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
}

if (themeToggleBtn) {
	themeToggleBtn.addEventListener('click', toggleTheme);
}

initTheme();

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearSpan = document.getElementById('year');
const totalExp = document.getElementById('exp-total');

if (yearSpan) {
	yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navList) {
	navToggle.addEventListener('click', () => {
		navList.classList.toggle('show');
	});
}

// Smooth scroll for in-page links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');
		if (!href || href === '#' || !href.startsWith('#')) return;
		const target = document.querySelector(href);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			navList?.classList.remove('show');
		}
	});
});

// Active section highlighting
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		const id = entry.target.getAttribute('id');
		if (!id) return;
		const navItem = document.querySelector(`.nav-list a[href="#${id}"]`);
		if (!navItem) return;
		if (entry.isIntersecting) {
			document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
			navItem.classList.add('active');
			// section visual emphasis
			document.querySelectorAll('section.section').forEach(s => s.classList.remove('active'));
			entry.target.classList.add('active');
		}
	});
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0.01 });

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

// Also emphasize section when clicking nav links immediately
document.querySelectorAll('.nav-list a[href^="#"]').forEach(a => {
	a.addEventListener('click', () => {
		document.querySelectorAll('section.section').forEach(s => s.classList.remove('active'));
		const id = a.getAttribute('href');
		const section = document.querySelector(id);
		section?.classList.add('active');
	});
});

// Removed carousel controls; projects use a static responsive grid

// Experience duration counters
function formatDuration(startDate, endDate) {
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();
	let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
	if (end.getDate() < start.getDate()) months -= 1;
	const years = Math.floor(months / 12);
	const remMonths = months % 12;
	const parts = [];
	if (years > 0) parts.push(`${years} yr${years>1?'s':''}`);
	if (remMonths > 0) parts.push(`${remMonths} mo${remMonths>1?'s':''}`);
	return parts.length ? parts.join(' ') : 'Less than 1 mo';
}

function renderDurations() {
	let totalMonths = 0;
	document.querySelectorAll('.duration-badge').forEach(el => {
		const start = el.getAttribute('data-start');
		const end = el.getAttribute('data-end');
		el.textContent = formatDuration(start, end);
		// accumulate total
		const startD = new Date(start);
		const endD = end ? new Date(end) : new Date();
		let months = (endD.getFullYear() - startD.getFullYear()) * 12 + (endD.getMonth() - startD.getMonth());
		if (endD.getDate() < startD.getDate()) months -= 1;
		totalMonths += Math.max(0, months);
	});
	if (totalExp) {
		const years = Math.floor(totalMonths / 12);
		const rem = totalMonths % 12;
		totalExp.textContent = years > 0 ? `${years} yrs ${rem} mos` : `${rem} mos`;
	}
}

renderDurations();

// Normalize AI skills block: ensure each item is on its own line (only if the content is compressed)
document.addEventListener('DOMContentLoaded', () => {
	try {
		const aiPlain = document.querySelector('.ai-plain');
		if (aiPlain) {
			const p = aiPlain.querySelector('p');
			if (p) {
				const text = p.textContent || '';
				// If the paragraph contains many commas (compressed single-line), split into lines
				if ((text.match(/,/g) || []).length >= 3) {
					const parts = text.split(',').map(s => s.trim()).filter(Boolean);
					aiPlain.innerHTML = parts.map(part => `<p>${part.replace(/\s+/g,' ')}</p>`).join('\n');
				}
			}
		}
	} catch (e) {
		// fail silently
		console.warn('AI list normalization failed', e);
	}
});

/* Typing animation for hero name: types once on page load */
(function(){
	const fullName = 'Shaik Afzal Hussain';
	const el = document.getElementById('typed-name');
	const cursor = document.querySelector('.typing-cursor');
	if (!el) return;
	const typingSpeed = 80; // ms per character — moderate pace
	let i = 0;

	function typeStep(){
		if (i <= fullName.length){
			el.textContent = fullName.slice(0, i);
			i++;
			setTimeout(typeStep, typingSpeed);
		} else {
			// stop typing; keep cursor blinking for a short while then fade it slightly
			setTimeout(() => {
				if (cursor) cursor.style.opacity = '0.9';
			}, 300);
		}
	}

	// Start on load (only once per page load)
	if (document.readyState === 'complete' || document.readyState === 'interactive'){
		// run after a tiny delay to avoid flash
		setTimeout(typeStep, 220);
	} else {
		window.addEventListener('DOMContentLoaded', () => setTimeout(typeStep, 220));
	}
})();
