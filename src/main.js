import { createEvent } from './event.js';

const TABS = {
    all: {
        title: 'Все',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    },
    kitchen: {
        title: 'Кухня',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }]
    },
    hall: {
        title: 'Зал',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Выключено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Выключено'
        }]
    },
    lights: {
        title: 'Лампочки',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }]
    },
    cameras: {
        title: 'Камеры',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    }
};

for (let i = 0; i < 6; ++i) {
    TABS.all.items = [...TABS.all.items, ...TABS.all.items];
}

const TABS_KEYS = Object.keys(TABS);

export function createMain() {
    const main = document.createElement('main');
    main.className = 'main';

    let activeTab = getInitialTab();
    let hasRightScroll = false;
    let sizes = [];

    const sectionGeneral = document.createElement('section');
    sectionGeneral.className = 'section main__general';

    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section__title section__title-header section__main-title';
    sectionTitle.textContent = 'Главное';

    const heroDashboard = document.createElement('div');
    heroDashboard.className = 'hero-dashboard';

    const heroPrimary = document.createElement('div');
    heroPrimary.className = 'hero-dashboard__primary';

    const heroTitle = document.createElement('h3');
    heroTitle.className = 'hero-dashboard__title';
    heroTitle.textContent = 'Привет, Геннадий!';

    const heroSubtitle = document.createElement('p');
    heroSubtitle.className = 'hero-dashboard__subtitle';
    heroSubtitle.textContent = 'Двери и окна закрыты, сигнализация включена.';

    const heroInfo = document.createElement('ul');
    heroInfo.className = 'hero-dashboard__info';

    const heroItems = [
        { title: 'Дома', details: '+23', hidden: '°' },
        { title: 'За окном', details: '+19', icon: 'rain', hidden: '°' }
    ];

    heroItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'hero-dashboard__item';

        const title = document.createElement('div');
        title.className = 'hero-dashboard__item-title';
        title.textContent = item.title;

        const details = document.createElement('div');
        details.className = 'hero-dashboard__item-details';
        details.textContent = item.details;

        if (item.hidden) {
            const hidden = document.createElement('span');
            hidden.className = 'a11y-hidden';
            hidden.textContent = item.hidden;
            details.appendChild(hidden);
        }

        if (item.icon) {
            const icon = document.createElement('div');
            icon.className = `hero-dashboard__icon hero-dashboard__icon_${item.icon}`;
            icon.setAttribute('role', 'img');
            icon.setAttribute('aria-label', item.icon === 'rain' ? 'Дождь' : '');
            details.appendChild(icon);
        }

        li.appendChild(title);
        li.appendChild(details);
        heroInfo.appendChild(li);
    });

    heroPrimary.appendChild(heroTitle);
    heroPrimary.appendChild(heroSubtitle);
    heroPrimary.appendChild(heroInfo);

    const heroSchedule = document.createElement('ul');
    heroSchedule.className = 'hero-dashboard__schedule';

    const scheduleEvents = [
        { icon: 'temp', iconLabel: 'Температура', title: 'Philips Cooler', subtitle: 'Начнет охлаждать в 16:30' },
        { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' },
        { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' }
    ];

    scheduleEvents.forEach(props => {
        heroSchedule.appendChild(createEvent(props));
    });

    heroDashboard.appendChild(heroPrimary);
    heroDashboard.appendChild(heroSchedule);

    sectionGeneral.appendChild(sectionTitle);
    sectionGeneral.appendChild(heroDashboard);

    const sectionScripts = document.createElement('section');
    sectionScripts.className = 'section main__scripts';

    const scriptsTitle = document.createElement('h2');
    scriptsTitle.className = 'section__title section__title-header';
    scriptsTitle.textContent = 'Избранные сценарии';

    const eventGrid = document.createElement('ul');
    eventGrid.className = 'event-grid';

    const scriptEvents = [
        { slim: true, icon: 'light2', iconLabel: 'Освещение', title: 'Выключить весь свет в доме и во дворе' },
        { slim: true, icon: 'schedule', iconLabel: 'Расписание', title: 'Я ухожу' },
        { slim: true, icon: 'light2', iconLabel: 'Освещение', title: 'Включить свет в коридоре' },
        { slim: true, icon: 'temp2', iconLabel: 'Температура', title: 'Набрать горячую ванну', subtitle: 'Начнётся в 18:00' },
        { slim: true, icon: 'temp2', iconLabel: 'Температура', title: 'Сделать пол тёплым во всей квартире' }
    ];

    scriptEvents.forEach(props => {
        eventGrid.appendChild(createEvent(props));
    });

    sectionScripts.appendChild(scriptsTitle);
    sectionScripts.appendChild(eventGrid);

    const sectionDevices = document.createElement('section');
    sectionDevices.className = 'section main__devices';

    const devicesTitle = document.createElement('div');
    devicesTitle.className = 'section__title';

    const devicesHeader = document.createElement('h2');
    devicesHeader.className = 'section__title-header';
    devicesHeader.textContent = 'Избранные устройства';

    const select = document.createElement('select');
    select.className = 'section__select';
    select.value = activeTab;

    TABS_KEYS.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = TABS[key].title;
        select.appendChild(option);
    });

    const tabsList = document.createElement('ul');
    tabsList.className = 'section__tabs';
    tabsList.setAttribute('role', 'tablist');

    const tabElements = {};

    TABS_KEYS.forEach(key => {
        const tab = document.createElement('li');
        tab.id = `tab_${key}`;
        tab.className = 'section__tab';
        if (key === activeTab) {
            tab.classList.add('section__tab_active');
        }
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', (key === activeTab).toString());
        if (key === activeTab) {
            tab.tabIndex = 0;
        }
        tab.setAttribute('aria-controls', `panel_${key}`);
        tab.textContent = TABS[key].title;

        tab.addEventListener('click', () => {
            updateActiveTab(key);
        });

        tabsList.appendChild(tab);
        tabElements[key] = tab;
    });

    devicesTitle.appendChild(devicesHeader);
    devicesTitle.appendChild(select);
    devicesTitle.appendChild(tabsList);

    const panelWrapper = document.createElement('div');
    panelWrapper.className = 'section__panel-wrapper';

    const arrow = document.createElement('div');
    arrow.className = 'section__arrow';
    arrow.style.display = 'none';

    const panelElements = {};

    TABS_KEYS.forEach(key => {
        const panel = document.createElement('div');
        panel.id = `panel_${key}`;
        panel.className = 'section__panel';
        if (key !== activeTab) {
            panel.classList.add('section__panel_hidden');
        }
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-hidden', (key !== activeTab).toString());
        panel.setAttribute('aria-labelledby', `tab_${key}`);

        const panelList = document.createElement('ul');
        panelList.className = 'section__panel-list';

        TABS[key].items.forEach((item, index) => {
            panelList.appendChild(createEvent({
                ...item,
                onSize: (size) => handleItemSize(key, index, size)
            }));
        });

        panel.appendChild(panelList);
        panelWrapper.appendChild(panel);
        panelElements[key] = panel;
    });

    panelWrapper.appendChild(arrow);

    sectionDevices.appendChild(devicesTitle);
    sectionDevices.appendChild(panelWrapper);

    main.appendChild(sectionGeneral);
    main.appendChild(sectionScripts);
    main.appendChild(sectionDevices);

    function getInitialTab() {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'all';
    }

    function handleItemSize(tab, index, size) {
        if (tab !== activeTab) return;

        sizes[index] = size;
        checkScroll();
    }

    function checkScroll() {
        if (!panelElements[activeTab]) return;

        const list = panelElements[activeTab].querySelector('.section__panel-list');
        if (!list) return;

        const totalWidth = sizes.reduce((sum, size) => sum + (size?.width || 0), 0);
        hasRightScroll = totalWidth > panelWrapper.offsetWidth;

        arrow.style.display = hasRightScroll ? 'block' : 'none';
    }

    function updateActiveTab(newTab) {
        if (activeTab) {
            tabElements[activeTab].classList.remove('section__tab_active');
            tabElements[activeTab].setAttribute('aria-selected', 'false');
            tabElements[activeTab].removeAttribute('tabindex');

            panelElements[activeTab].classList.add('section__panel_hidden');
            panelElements[activeTab].setAttribute('aria-hidden', 'true');
        }

        activeTab = newTab;

        tabElements[activeTab].classList.add('section__tab_active');
        tabElements[activeTab].setAttribute('aria-selected', 'true');
        tabElements[activeTab].tabIndex = 0;

        panelElements[activeTab].classList.remove('section__panel_hidden');
        panelElements[activeTab].setAttribute('aria-hidden', 'false');

        select.value = activeTab;

        checkScroll();
    }

    function handleArrowClick() {
        const activePanel = panelElements[activeTab];
        if (activePanel) {
            const scroller = activePanel.querySelector('.section__panel-list');
            if (scroller) {
                scroller.scrollBy({
                    left: 400,
                    behavior: 'smooth'
                });
            }
        }
    }

    select.addEventListener('input', (e) => {
        updateActiveTab(e.target.value);
    });

    arrow.addEventListener('click', handleArrowClick);
    window.addEventListener('resize', checkScroll);

    setTimeout(checkScroll, 100);

    return main;
}