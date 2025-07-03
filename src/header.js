export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';

    const logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'header__logo';
    logo.setAttribute('aria-label', 'Яндекс.Дом');

    const menuButton = document.createElement('button');
    menuButton.className = 'header__menu';
    menuButton.setAttribute('aria-expanded', 'false');

    const menuText = document.createElement('span');
    menuText.className = 'header__menu-text a11y-hidden';
    menuText.textContent = 'Открыть меню';

    menuButton.appendChild(menuText);

    const links = document.createElement('ul');
    links.className = 'header__links';

    const linksData = [
        { text: 'Сводка', href: '/', current: true },
        { text: 'Устройства', href: '/devices' },
        { text: 'Сценарии', href: '/scripts' }
    ];

    linksData.forEach(linkData => {
        const li = document.createElement('li');
        li.className = 'header__item';

        const a = document.createElement('a');
        a.className = 'header__link';
        if (linkData.current) {
            a.classList.add('header__link_current');
            a.setAttribute('aria-current', 'page');
        }
        a.href = linkData.href;
        a.textContent = linkData.text;

        li.appendChild(a);
        links.appendChild(li);
    });

    let expanded = false;
    let toggled = false;

    menuButton.addEventListener('click', () => {
        expanded = !expanded;
        menuButton.setAttribute('aria-expanded', expanded.toString());
        menuText.textContent = expanded ? 'Закрыть меню' : 'Открыть меню';

        if (!toggled) {
            toggled = true;
            links.classList.add('header__links-toggled');
        }

        links.classList.toggle('header__links_opened', expanded);
    });

    header.appendChild(logo);
    header.appendChild(menuButton);
    header.appendChild(links);

    return header;
}