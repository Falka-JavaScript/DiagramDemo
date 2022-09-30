$(document).ready(function () {
    console.log('start -> ok');
    const controller = new Controller();

    $('#load-button').click(()=>{
        controller.loadData();
    });

    $('#reset-button').click(()=>{
        controller.resetData();
    });
    $('#column-diagram').click(()=>{
        controller.buildDiagram();
    });
    controller.initContext();
    controller.initCanvas();
});