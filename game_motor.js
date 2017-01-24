$(function () {

    function scriptPath(path) {
        return 'src/' + path + ".js";
    }

    function classPath(className) {
        return scriptPath('classes/' + className);
    }

    $.getScript(scriptPath('variables'));
    $.getScript(scriptPath('functions'));
    $.getScript(classPath('InventoryMVC'));
    $.getScript(classPath('Item'));
    $.getScript(classPath('Player'));
    $.getScript(classPath('MoonMoon'));
    $.getScript(classPath('AudioPlayer'));
    $.getScript(scriptPath('actions'));
    $.getScript(scriptPath('interactions'));

    $.getScript(scriptPath('events'));
    $.getScript(scriptPath('init'));



});