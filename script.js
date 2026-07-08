(function(){var _w=window,_d=document,_dt=false;_d.addEventListener('contextmenu',function(e){e.preventDefault();return false;});_d.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='C'||e.key==='J'))||(e.ctrlKey&&(e.key==='U'||e.key==='S'))){e.preventDefault();e.stopPropagation();return false;}},true);function _showOv(){if(document.getElementById('_prot_ov'))return;var o=document.createElement('div');o.id='_prot_ov';o.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:#0b0f19;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;color:#f8fafc;';o.innerHTML='<div style="font-size:3.5rem;margin-bottom:1rem">&#9940;</div><h1 style="font-size:1.6rem;margin-bottom:.5rem">Access Restricted</h1><p style="color:#94a3b8;font-size:.9rem">Developer tools are not permitted on this page.</p>';document.body?document.body.appendChild(o):document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(o);});}function _hideOv(){var o=document.getElementById('_prot_ov');if(o)o.remove();}function _dbgCheck(){var t=new Date();(function(){}).constructor('debugger')();if(new Date()-t>80&&!_dt){_dt=true;_showOv();}}setInterval(_dbgCheck,1500);_w.addEventListener('resize',function(){var open=(_w.outerWidth-_w.innerWidth>160||_w.outerHeight-_w.innerHeight>160);if(open&&!_dt){_dt=true;_showOv();}else if(!open&&_dt){_dt=false;_hideOv();}});})();

document.addEventListener('DOMContentLoaded', function () {

    /* ── Sticky Navbar & Scroll Discover ── */
    var a = document.getElementById('navbar');
    var b = document.querySelector('.scroll-discover');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            a.classList.add('scrolled');
            if (b) b.classList.add('fade-out');
        } else {
            a.classList.remove('scrolled');
            if (b) b.classList.remove('fade-out');
        }
    });

    /* ── Premium Mobile Navbar Toggle (custom, no Bootstrap JS) ── */
    var toggler  = document.getElementById('navToggler');
    var collapse = document.getElementById('navbarNav');
    var menuOpen = false;

    function openMenu() {
        menuOpen = true;
        collapse.classList.remove('is-closing');
        collapse.classList.add('show');
        toggler.classList.add('is-open');
        a.classList.add('menu-open');
    }

    function closeMenu() {
        menuOpen = false;
        collapse.classList.add('is-closing');
        toggler.classList.remove('is-open');
        a.classList.remove('menu-open');
        /* Wait for CSS transition to finish, then remove .show */
        setTimeout(function () {
            collapse.classList.remove('show');
            collapse.classList.remove('is-closing');
        }, 420); /* matches max-height transition duration */
    }

    if (toggler && collapse) {
        toggler.addEventListener('click', function (e) {
            e.stopPropagation();
            menuOpen ? closeMenu() : openMenu();
        });

        /* Close on nav-link click (mobile) */
        collapse.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992 && menuOpen) closeMenu();
            });
        });

        /* Close on outside click */
        document.addEventListener('click', function (e) {
            if (menuOpen && !a.contains(e.target)) closeMenu();
        });

        /* Close on window resize to desktop */
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 992 && menuOpen) {
                menuOpen = false;
                collapse.classList.remove('show', 'is-closing');
                toggler.classList.remove('is-open');
                a.classList.remove('menu-open');
            }
        });
    }

    /* ── Settings Dropdown — Fade In/Out ── */
    var d = document.querySelector('.settings-toggle-btn');
    var e = document.querySelector('.settings-dropdown');

    function openSettings() { e.classList.add('dropdown-open'); d.classList.add('active'); d.setAttribute('aria-expanded', 'true'); }
    function closeSettings() { e.classList.remove('dropdown-open'); d.classList.remove('active'); d.setAttribute('aria-expanded', 'false'); }

    if (d && e) {
        d.addEventListener('click', function (ev) {
            ev.preventDefault(); ev.stopPropagation();
            e.classList.contains('dropdown-open') ? closeSettings() : openSettings();
        });
        document.addEventListener('click', function (ev) {
            if (!d.contains(ev.target) && !e.contains(ev.target)) closeSettings();
        });
        e.addEventListener('click', function (ev) { ev.stopPropagation(); });
    }

    /* ── Theme Switcher ── */
    var i = document.getElementById('theme-toggle');
    var j = localStorage.getItem('theme') || 'light';
    if (j === 'dark') { document.body.classList.add('dark-theme'); if (i) i.checked = true; }
    if (i) {
        i.addEventListener('change', function () {
            if (i.checked) { document.body.classList.add('dark-theme'); localStorage.setItem('theme', 'dark'); }
            else { document.body.classList.remove('dark-theme'); localStorage.setItem('theme', 'light'); }
        });
    }

    /* ── Scroll Reveal ── */
    var k = document.querySelectorAll('.reveal');
    var m = new IntersectionObserver(function (n, o) {
        n.forEach(function (p) { if (!p.isIntersecting) return; p.target.classList.add('active'); o.unobserve(p.target); });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    k.forEach(function (q) { m.observe(q); });

    /* ── Contact Form ── */
    var r = document.getElementById('contact-form');
    if (r) {
        r.addEventListener('submit', function (s) {
            s.preventDefault(); s.stopPropagation();
            if (r.checkValidity()) {
                var t = document.getElementById('name').value,
                    u = document.getElementById('email').value,
                    v = document.getElementById('message').value,
                    w = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                w.push({ name: t, email: u, message: v, timestamp: new Date().toLocaleString() });
                localStorage.setItem('contactSubmissions', JSON.stringify(w));
                var x = r.querySelector('button[type="submit"]');
                x.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecting...';
                x.disabled = true;
                setTimeout(function () {
                    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdDcK1Eqq2I7DU5XZivsB33QCMqumLoWVTdE2Hcx1g67pgRZQ/viewform?usp=dialog';
                }, 1000);
            }
            r.classList.add('was-validated');
        }, false);
    }
});
