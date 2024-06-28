document.addEventListener('DOMContentLoaded', function () {
    // Create and append styles
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #74ebd5, #acb6e5);
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 30px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 30px;
            animation: textGlow 1.5s infinite alternate;
        }
        @keyframes textGlow {
            from {
                text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff, 0 0 70px #ff00ff;
            }
            to {
                text-shadow: 0 0 20px #fff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff, 0 0 70px #ff00ff, 0 0 80px #ff00ff;
            }
        }
        .input-group {
            margin-bottom: 20px;
            text-align: left;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #34495e;
        }
        input,
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
            font-size: 16px;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease-in-out;
        }
        input:focus,
        select:focus {
            box-shadow: 0 0 10px rgba(0, 150, 136, 0.5);
            outline: none;
        }
        .button-group {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
        }
        button:hover {
            transform: scale(1.05);
        }
        #startBtn {
            background-color: #2ecc71;
            color: white;
        }
        #pauseBtn {
            background-color: #f39c12;
            color: white;
        }
        #endBtn {
            background-color: #e74c3c;
            color: white;
        }
        #exportBtn {
            background-color: #3498db;
            color: white;
        }
        button:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
        }
        #timer {
            font-size: 48px;
            text-align: center;
            margin: 20px 0;
            color: #2c3e50;
            background: #ecf0f1;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: color 0.5s;
        }
        #timer.warning {
            color: #f39c12;
        }
        #timer.danger {
            color: #e74c3c;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            animation: fadeIn 1s ease-in-out;
        }
        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 5px;
            animation: zoomIn 0.5s ease;
        }
        @keyframes zoomIn {
            from {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover {
            color: #000;
        }
    `;
    document.head.appendChild(style);

    // Create and append HTML structure
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h1 anijs="if: load, on: window, do: fadeIn animated">專案計時器</h1>
        <div class="input-group" id="projectNameGroup">
            <label for="projectName">專案名稱：</label>
            <input type="text" id="projectName" placeholder="輸入專案名稱">
        </div>
        <div class="input-group">
            <label for="taskName">任務名稱：</label>
            <input type="text" id="taskName" placeholder="輸入任務名稱">
        </div>
        <div class="input-group">
            <label for="plannedHours">預計時間（小時）：</label>
            <input type="number" id="plannedHours" placeholder="輸入預計時間（小時）" min="1" max="24">
        </div>
        <div class="button-group">
            <button id="startBtn" anijs="if: mouseover, do: rubberBand animated">開始</button>
            <button id="pauseBtn" disabled anijs="if: mouseover, do: rubberBand animated">暫停</button>
            <button id="endBtn" disabled anijs="if: mouseover, do: rubberBand animated">結算</button>
        </div>
        <div id="timer" anijs="if: load, on: window, do: pulse animated">00:00:00</div>
        <table id="recordTable">
            <thead>
                <tr>
                    <th>任務名稱</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>持續時間</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <button id="exportBtn" anijs="if: mouseover, do: bounce animated">導出 CSV</button>

        <div id="nameModal" class="modal">
            <div class="modal-content" anijs="if: load, on: window, do: bounceIn animated">
                <span class="close" anijs="if: mouseover, do: tada animated">&times;</span>
                <h2>為這段時間命名</h2>
                <input type="text" id="segmentName" placeholder="輸入名稱">
                <button id="saveSegmentName" anijs="if: mouseover, do: rubberBand animated">保存</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // JavaScript functionality
    let timer;
    let remainingTime;
    let isRunning = false;
    let isPaused = false;
    let records = [];
    let projectName = '';
    let startTime; // 記錄開始時間
    let endTime; // 記錄結束時間

    const projectNameInput = document.getElementById('projectName');
    const projectNameGroup = document.getElementById('projectNameGroup');
    const taskNameInput = document.getElementById('taskName');
    const plannedHoursInput = document.getElementById('plannedHours');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const endBtn = document.getElementById('endBtn');
    const timerDisplay = document.getElementById('timer');
    const recordTable = document.getElementById('recordTable');
    const exportBtn = document.getElementById('exportBtn');
    const nameModal = document.getElementById('nameModal');
    const segmentNameInput = document.getElementById('segmentName');
    const saveSegmentNameBtn = document.getElementById('saveSegmentName');
    const closeModal = document.querySelector('.close');

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    endBtn.addEventListener('click', endTimer);
    exportBtn.addEventListener('click', exportToCSV);
    saveSegmentNameBtn.addEventListener('click', saveSegmentName);
    closeModal.addEventListener('click', () => nameModal.style.display = 'none');

    function startTimer() {
        if (!isRunning) {
            if (!projectName) {
                projectName = projectNameInput.value;
                projectNameGroup.style.display = 'none';
            }
            if (!isPaused) {
                remainingTime = plannedHoursInput.value * 60 * 60;
                startTime = Date.now();  // 记录开始时间
            }
            timer = setInterval(updateTimer, 1000);
            isRunning = true;
            isPaused = false;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            endBtn.disabled = false;
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            isPaused = true;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }

    function endTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            isPaused = true;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            endTime = Date.now(); // 记录结束时间
        }
        nameModal.style.display = 'block';
        segmentNameInput.value = taskNameInput.value || '未命名任務';
    }

    function saveSegmentName() {
        const segmentName = segmentNameInput.value || '未命名任務';
        const duration = formatTime(Math.round((endTime - startTime) / 1000));  // 计算持续时间
        records.push({
            project: projectName,
            name: segmentName,
            start: new Date(startTime).toLocaleString(),
            end: new Date(endTime).toLocaleString(),
            duration: duration
        });
        updateTable();
        nameModal.style.display = 'none';
    }

    function updateTimer() {
        if (remainingTime > 0) {
            remainingTime--;
            timerDisplay.textContent = formatTime(remainingTime);

            if (remainingTime <= 300) { // Less than 5 minutes
                timerDisplay.classList.add('danger');
                timerDisplay.classList.remove('warning');
            } else if (remainingTime <= 1800) { // Less than 30 minutes
                timerDisplay.classList.add('warning');
            }
        } else {
            endTimer();
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }

    function pad(num) {
        return num.toString().padStart(2, '0');
    }

    function updateTable() {
        const tbody = recordTable.querySelector('tbody');
        tbody.innerHTML = '';
        records.forEach(record => {
            const row = tbody.insertRow();
            row.insertCell().textContent = record.name;
            row.insertCell().textContent = record.start;
            row.insertCell().textContent = record.end;
            row.insertCell().textContent = record.duration;
        });
    }

    function exportToCSV() {
        let csv = '專案名稱,任務名稱,開始時間,結束時間,持續時間\n';
        records.forEach(record => {
            csv += `${record.project},${record.name},${record.start},${record.end},${record.duration}\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${projectName}_任務記錄.csv`);
    }
});
