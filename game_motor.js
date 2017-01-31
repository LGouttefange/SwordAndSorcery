$(function () {

    function scriptPath(path) {
        return 'src/' + path + ".js";
    }

    function classPath(className) {
        return scriptPath('classes/' + className);
    }

    var loadScript = function (url) {
        $.ajax({
            crossDomain: true,
            dataType: "script",
            url: url,
            async: false
        })
    };
    loadScript(scriptPath('variables'));

    loadScript(scriptPath('functions'));
    loadScript(classPath('InventoryMVC'));
    loadScript(classPath('JQueryGod'));
    loadScript(classPath('Item'));
    loadScript(classPath('PlayerMVC'));
    loadScript(classPath('MoonMoon'));
    loadScript(classPath('AudioPlayer'));
    loadScript(scriptPath('actions'));
    loadScript(scriptPath('interactions'));
    loadScript(scriptPath('battle'));

    loadScript(scriptPath('events'));
    loadScript(scriptPath('init'));



});