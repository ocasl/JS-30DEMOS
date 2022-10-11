const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {

    const method = video.paused ? 'play' : 'pause';
    // 调用上面的方法
    video[method]();
}


function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    //  修改上面的图案
    toggle.textContent = icon;
}

function skip() {
    // 现在的时间加上得到的dataset的数据
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}`
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

//  根据点击位置设置播放时间

function scrub(e) {
    //  相对于绑定的元素的位置而言
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}
progress.addEventListener('click', scrub)


// 进度条拖动  也可以更改一下进度 直接利用scrue 来修改进度

let mousedown = false
progress.addEventListener('mousemove', (e) => {
    mousedown && scrub(e)
})


// 鼠标下压修改标志 ,上台恢复
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)


progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
// / currenttime 变化 就会触发
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));