export function createEvent(props) {
    const li = document.createElement('li');
    li.className = 'event';
    if (props.slim) {
        li.classList.add('event_slim');
    }

    const button = document.createElement('button');
    button.className = 'event__button';

    const icon = document.createElement('span');
    icon.className = `event__icon event__icon_${props.icon}`;
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', props.iconLabel);

    const title = document.createElement('h4');
    title.className = 'event__title';
    title.textContent = props.title;

    button.appendChild(icon);
    button.appendChild(title);

    if (props.subtitle) {
        const subtitle = document.createElement('span');
        subtitle.className = 'event__subtitle';
        subtitle.textContent = props.subtitle;
        button.appendChild(subtitle);
    }

    li.appendChild(button);

    if (props.onSize) {
        const measure = () => {
            props.onSize({
                width: li.offsetWidth,
                height: li.offsetHeight
            });
        };

        setTimeout(measure, 0);

        window.addEventListener('resize', measure);
    }

    return li;
}