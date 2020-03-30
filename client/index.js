(() => {
    const ENTER = 13;
    window.addEventListener('load', () => {
        const input = document.getElementById('js-boardname');
        const button = document.getElementById('js-submit');

        // input something to this textfield
        input.addEventListener('keydown', event => {
            const keycode = event.which || event.keyCode;
            if (keycode === ENTER) {
                button.click();
            }
        });

        // click button
        button.addEventListener('click', () => {
            let room = input.value;
            room = room.replace(/\W_/g, '').trim();
            if (room) {
                window.open(`/${room}`, '_self');
            }
        });
    });
})();
