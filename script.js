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
