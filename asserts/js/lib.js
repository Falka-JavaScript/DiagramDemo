class Controller {
    persons = [];
    results = [];
    context = null;
    source = '../../data/data.json';
    colors = [
        'red', 'green', 'blue', 'purple', 'orange', 'gray', 'darkcyan', 'bisque', 'silver', 'lavender'
    ];

    loadData() {
        $.getJSON(this.source, (json) => {
            console.log(json);
            let out = '';
            let person = '';
            let result = 0;
            for (let item of json.results) {
                person = item.person;
                result = item.result;
                this.persons.push(person);
                this.results.push(result);
                out += `
                <tr>
                <td>${person}</td>
                <td>${result}</td>
                </tr>
                `;
            }

            $('tbody').html(out);
            console.log(this.person);
            console.log(this.results);

        })
    }

    resetData() {
        $('tbody').html('');
        this.persons.length = 0;
        this.results.length = 0;
        this.initCanvas();
    }

    initContext() {
        const canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
    }

    initCanvas() {
        const logo = document.getElementById('logo');
        this.context.clearRect(0, 0, 900, 500);
        this.context.drawImage(logo, 0, 0)
    }

    buildAxios(g) {
        g.clearRect(0, 0, 900, 500);
        g.fillStyle = 'lightgray';
        g.lineWidth = 1;
        g.beginPath();
        //
        g.moveTo(10, 10);
        g.lineTo(10, 490);
        g.lineTo(890, 490);
        g.stroke();
    }

    //Для стовбчастої діаграми
    buildRectangles(g) {
        let N = this.results.length;
        let w = 880 / N - 5;
        let k = Math.max.apply(null, this.results) / 480;
        g.font = '10pt Arial';
        //
        for (let i = 0; i < N; i++) {
            let h = this.results[i] / k - 5;
            let x = i * (w + 5) + 10;
            let y = 490 - h;
            g.fillStyle = this.colors[i];
            g.fillRect(x, y, w, h);
            g.fillText(this.persons[i], x + 2, y - 5);
        }

    }

    //for pie chart
    buildPieChart(g) {

        let CanvasW = g.canvas.width;
        let CanvasH = g.canvas.height;

        let XCenter = CanvasW / 2 + 30;
        let YCenter = CanvasH / 2;

        let radius = 150;

        let onePointAngle = 0;
        let sum = 0;

        this.results.forEach(item => {
            sum += item;
        });

        onePointAngle = 2 * Math.PI / sum;

        let currentAngle = 0;
        for (let i = 0; i < this.results.length; i++) {
            let calculateAngle = this.results[i] * onePointAngle;
            let endAngle = currentAngle + calculateAngle;

            this.drawArc(g, XCenter, YCenter, radius, currentAngle, endAngle, this.colors[i]);
            this.drawRect(g,i,this.persons[i],this.colors[i]);

            currentAngle = endAngle;
        }
    }

    drawArc(g, XCenter, YCenter, radius, sAngle, eAngle, color) {
        g.beginPath();
        g.moveTo(XCenter, YCenter);

        g.arc(XCenter, YCenter, radius, sAngle, eAngle,);
        g.fillStyle = color;
        g.fill();
        g.stroke();
    }

    drawRect(g, n, str, color) {
        g.beginPath();
        let rectW = 50;
        let rectH = 20;

        let rectT = 6;
        let rectL = 10;

        let rectEndT = rectT * (n + 1) + rectH * (n);
        g.fillRect(rectL, rectEndT, rectW, rectH);

        g.font = '11pt Arial';
        g.textBaseline = 'middle';
        g.fillText(str,rectL+rectW+rectT,rectEndT+rectH/2);
        g.fillStyle = color;
        g.fill();
    }

    buildDiagram() {
        let g = this.context;
        this.buildAxios(g);
        this.buildRectangles(g);
    }

    buildChartPie(){
        let g = this.context;
        g.clearRect(0, 0, 900, 500);
        this.buildPieChart(g);
    }

}
