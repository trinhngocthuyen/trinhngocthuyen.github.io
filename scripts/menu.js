(function() {
    function toggleClass(element, className){
        if (!element || !className){
            return;
        }

        var classString = element.className, nameIndex = classString.indexOf(className);
        if (nameIndex == -1) {
            classString += ' ' + className;
        } else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
        }
        element.className = classString;
    }

    document.getElementById('menu-toggle').addEventListener('mousedown', function() {
        toggleClass(document.getElementById('menu-toggle'), 'open');
        toggleClass(document.querySelector('nav[role="navigation"]'), 'open');
    });
})();
