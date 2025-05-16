document.addEventListener('DOMContentLoaded', function () {
    const timeframeBtns = document.querySelectorAll('.timeframe-btn');
    const currentTimeElements = document.querySelectorAll('.current');
    const previousTimeElements = document.querySelectorAll('.previous');
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        updateTimeframe(data, 'weekly');
  
        timeframeBtns.forEach(btn => {
          btn.addEventListener('click', function () {
            timeframeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateTimeframe(data, this.dataset.timeframe);
          });
        });
      })
      .catch(error => console.error('Error loading data:', error));
  
    function updateTimeframe(data, timeframe) {
      const timeText = {
        daily: 'Yesterday',
        weekly: 'Last Week',
        monthly: 'Last Month'
      };
  
      data.forEach((activity, index) => {
        const current = activity.timeframes[timeframe].current;
        const previous = activity.timeframes[timeframe].previous;
  
        currentTimeElements[index].textContent = `${current}hr${current !== 1 ? 's' : ''}`;
        previousTimeElements[index].textContent = `${timeText[timeframe]} - ${previous}hr${previous !== 1 ? 's' : ''}`;
      });
    }
  });
  