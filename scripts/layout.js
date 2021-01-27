document.addEventListener('DOMContentLoaded', function () {
    var visible = false;
    document.querySelector('#hamburger-button').addEventListener('click', () => {
        if (visible) {
            document.querySelector('#menu').classList.remove('visible');
            document.querySelector('#menu').classList.add('hidden');
            document.querySelector('#hamburger-button').innerHTML = 'Show menu';
            visible = false;
        }
        else {
            document.querySelector('#menu').classList.remove('hidden');
            document.querySelector('#menu').classList.add('visible');
            document.querySelector('#hamburger-button').innerHTML = 'Hide menu';
            visible = true;
        }
    });

    // document.querySelector('#projectsLink').addEventListener('mouseenter', function () {
    //     document.querySelector('#linkMenu').classList.replace('invisible', 'visible');
    // });
    // document.querySelector('#projectsLink').addEventListener('mouseout', function () {
    //     document.querySelector('#linkMenu').classList.replace('visible', 'invisible');
    // });
});